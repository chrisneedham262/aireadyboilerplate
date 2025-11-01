import axios from "axios";

/**
 * User Profile Service
 * Handles all API operations related to user profile management
 */
const userProfileService = {
  /**
   * Fetches the user's profile data including personal information and country choices
   * 
   * @param {string} accessToken - JWT access token for authentication
   * @returns {Promise<Object>} Profile data object containing user fields and country_choices
   * @throws {Error} Throws error if request fails
   */
  getProfile: async (accessToken) => {
    try {
      const response = await axios.get(`${process.env.API_URL}/api/user-profile/`, {
        headers: { 
          Authorization: `Bearer ${accessToken}` 
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Updates the user's profile with text data and optionally an avatar image
   * 
   * @param {string} accessToken - JWT access token for authentication
   * @param {Object} textData - Object containing profile fields (first_name, last_name, email, etc.)
   * @param {File|null} avatarFile - Optional File object for avatar upload
   * @returns {Promise<Object>} Updated profile data from server response
   * @throws {Error} Throws error if request fails with validation errors
   */
  updateProfile: async (accessToken, textData, avatarFile) => {
    try {
      const token = accessToken;
      if (!token) {
        throw new Error("No access token available");
      }

      // First, update text fields using the new text-only endpoint
      const textRes = await axios.put(
        `${process.env.API_URL}/api/user-profile/text/`, 
        textData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Then, if there's an avatar file, upload it to the avatar-only endpoint
      if (avatarFile && avatarFile instanceof File) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        const avatarRes = await axios.put(
          `${process.env.API_URL}/api/user-profile/avatar/`, 
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Use avatar response as it has the latest data (includes text + new avatar)
        if (avatarRes.data) {
          return avatarRes.data;
        }
      } else {
        // No avatar update, use text response
        if (textRes.data) {
          return textRes.data;
        }
      }

    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  },
};

export default userProfileService;

