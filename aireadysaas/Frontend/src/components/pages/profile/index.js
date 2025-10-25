"use client";

import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext"; // Import your AuthContext
import userProfileService from "../../../services/userProfileService"; // Import user profile service
import Link from "next/link";
import HeaderApp from "@/components/nav/app/header";

export default function ProfilePage() {
  const { accessToken, userProfile, setUserProfile } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [countryOptions, setCountryOptions] = useState([]); // Store country choices
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    avatar: null,
    about: "",
    email: "",
    countries: "",
    phone_number: "",
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (accessToken) {
      fetchProfile(); // Fetch user profile
    }
  }, [accessToken]);

  const fetchProfile = async () => {
    try {
      // Call userProfileService to get profile data
      const data = await userProfileService.getProfile(accessToken);

      setFormData({
        first_name: data.first_name,
        last_name: data.last_name,
        avatar: data.avatar, // Store image URL
        about: data.about,
        email: data.email,
        countries: data.countries, // Store country code
        phone_number: data.phone_number,
      });

      setPreviewImage(data.avatar); // Set preview image
      setCountryOptions(data.country_choices || []); // Store country choices
    } catch (error) {
      console.error("Error fetching profile:", error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCountryChange = (e) => {
    setFormData({ ...formData, countries: e.target.value }); // Store country code
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, avatar: file });

    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrors({});

    if (!accessToken) {
      console.error("No access token found.");
      return;
    }

    // Prepare text data (JSON)
    const textData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      about: formData.about || "",
      email: formData.email,
      countries: formData.countries || "",
      phone_number: formData.phone_number || "",
    };

    // Get avatar file if it's a new upload (File object, not string URL)
    const avatarFile = formData.avatar instanceof File ? formData.avatar : null;

    try {
      // Call userProfileService to update profile
      const data = await userProfileService.updateProfile(accessToken, textData, avatarFile);

      setSuccessMessage("Profile updated successfully!");
      setErrors({});
      
      // Update AuthContext userProfile to reflect changes in header
      setUserProfile(data);
      
      // Update preview image with new avatar URL from response
      if (data.avatar) {
        setPreviewImage(data.avatar);
        // Update formData avatar to be the URL string for future checks
        setFormData({ ...formData, avatar: data.avatar });
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrors(error.response?.data || {});
      console.error("Error updating profile:", error.response?.data || error.message);
    }
  };

  return (
    <>
    <HeaderApp/>
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 relative border border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">Profile Information</h1>
        <Link href="/app/dashboard" passHref>
          <button type="button" className="absolute top-6 right-6 btn-primary-small">
            Dashboard
          </button>
        </Link>

        {/* Profile Image Upload */}
        <div className="flex justify-center mb-4">
          <label className="cursor-pointer">
            <input type="file" className="hidden" onChange={handleImageChange} />
            {previewImage ? (
              <img src={previewImage} alt="Profile" className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-600 object-cover" />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full border-2 border-gray-300 dark:border-gray-600">
                Upload
              </div>
            )}
          </label>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 rounded-lg text-center">
            {successMessage}
          </div>
        )}

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors duration-200"
            />
          </div>

          {/* Country Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
            <select
              name="countries"
              value={formData.countries}
              onChange={handleCountryChange}
              className={`mt-1 p-2 w-full border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors duration-200 ${
                errors.countries ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <option value="">Select your country</option>
              {countryOptions.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.countries && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.countries[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors duration-200"
              rows="3"
            />
          </div>

          <button type="submit" className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200">
            Save Profile
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
