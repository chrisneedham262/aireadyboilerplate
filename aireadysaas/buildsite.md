# Complete Cursor AI Prompts to Build AIReadySaaS Website
## 155 Step-by-Step Commands to Replicate This Full-Stack Application

### Overview
This guide provides 155 individual prompts you can copy and paste into Cursor AI to build a complete full-stack application with Django backend, Next.js frontend, JWT authentication, and AI integration.

---

## PHASE 1: PROJECT SETUP (Prompts 1-10)

**Prompt 1:** "Create a new directory called aireadysaas for my project"

**Prompt 2:** "Navigate into the aireadysaas directory"

**Prompt 3:** "Create a Backend folder inside aireadysaas"

**Prompt 4:** "Create a Frontend folder inside aireadysaas"

**Prompt 5:** "Navigate into the Backend folder"

**Prompt 6:** "Create a Python virtual environment called venv"

**Prompt 7:** "Activate the virtual environment"

**Prompt 8:** "Upgrade pip to the latest version"

**Prompt 9:** "Install Django version 5.1.5"

**Prompt 10:** "Install Django REST Framework version 3.15.2"

---

## PHASE 2: BACKEND DEPENDENCIES (Prompts 11-25)

**Prompt 11:** "Install djangorestframework-simplejwt version 5.4.0 for JWT authentication"

**Prompt 12:** "Install django-cors-headers version 4.6.0 for handling CORS"

**Prompt 13:** "Install python-dotenv version 1.0.1 for environment variables"

**Prompt 14:** "Install Pillow version 11.1.0 for image handling"

**Prompt 15:** "Install requests version 2.32.3 for HTTP requests"

**Prompt 16:** "Install rapidfuzz for fuzzy string matching"

**Prompt 17:** "Install openai package for AI integration"

**Prompt 18:** "Install ollama version 0.4.7 for local AI models"

**Prompt 19:** "Install dj-rest-auth version 7.0.1 for additional authentication"

**Prompt 20:** "Install django-allauth version 65.4.1 for social authentication"

**Prompt 21:** "Install django-extensions version 3.2.3 for Django utilities"

**Prompt 22:** "Install social-auth-app-django version 5.4.3 for social auth"

**Prompt 23:** "Install social-auth-core version 4.5.6 for social auth core"

**Prompt 24:** "Install faiss-cpu version 1.10.0 for vector similarity search"

**Prompt 25:** "Install langchain version 0.3.19 for AI chain operations"

---

## PHASE 3: DJANGO PROJECT CREATION (Prompts 26-35)

**Prompt 26:** "Create a new Django project called backend in the current directory"

**Prompt 27:** "Create a Django app called account for user management"

**Prompt 28:** "Create a Django app called support_agent for AI chatbot"

**Prompt 29:** "Create a Django app called custom_admin for admin customization"

**Prompt 30:** "Create a Django app called utils for utility functions"

**Prompt 31:** "Create a templates directory in the Backend folder"

**Prompt 32:** "Create an admin subdirectory inside templates"

**Prompt 33:** "Create an emails subdirectory inside templates"

**Prompt 34:** "Create a static directory in the Backend folder"

**Prompt 35:** "Create an admin subdirectory inside static"

---

## PHASE 4: MEDIA AND ASSETS (Prompts 36-40)

**Prompt 36:** "Create a media directory for file uploads"

**Prompt 37:** "Create a profile_imgs subdirectory inside media"

**Prompt 38:** "Create a requirements.txt file"

**Prompt 39:** "Create a .env file for environment variables"

**Prompt 40:** "Create a .gitignore file"

---

## PHASE 5: BACKEND CONFIGURATION (Prompts 41-50)

**Prompt 41:** "Configure Django settings.py with all the installed apps, middleware, database, CORS, JWT, and media settings"

**Prompt 42:** "Set up environment variables in .env file with OPENAI_API_KEY, USE_OLLAMA, SECRET_KEY, and DEBUG"

**Prompt 43:** "Create a comprehensive requirements.txt with all installed packages and their versions"

**Prompt 44:** "Configure the main urls.py to include admin, account, and support_agent URLs"

**Prompt 45:** "Set up custom exception handler in utils app"

**Prompt 46:** "Create error views for 404 and 500 errors"

**Prompt 47:** "Configure custom admin site with branding and styling"

**Prompt 48:** "Set up email templates for contact form"

**Prompt 49:** "Create custom admin CSS for styling"

**Prompt 50:** "Configure media file serving for development"

---

## PHASE 6: USER MODELS (Prompts 51-60)

**Prompt 51:** "Create a custom User model in account app that extends AbstractUser with is_customer and is_staff fields"

**Prompt 52:** "Create a UserProfile model with bio, avatar, about, phone_number, countries, created_at, and updated_at fields"

**Prompt 53:** "Create a DifferentCountries TextChoices class with all country codes and names"

**Prompt 54:** "Create a Contact model with name, email, message, and created_at fields"

**Prompt 55:** "Set up post_save signal to automatically create UserProfile when User is created"

**Prompt 56:** "Create FAQ model in support_agent app with question and answer fields"

**Prompt 57:** "Create ChatHistory model with user_id, question, response, and timestamp fields"

**Prompt 58:** "Configure the User model as AUTH_USER_MODEL in settings"

**Prompt 59:** "Set up model relationships and foreign keys properly"

**Prompt 60:** "Add string representations for all models"

---

## PHASE 7: SERIALIZERS (Prompts 61-70)

**Prompt 61:** "Create SignUpSerializer for user registration with validation"

**Prompt 62:** "Create UserListSerializer for listing users with read-only username"

**Prompt 63:** "Create UserSerializer for basic user data"

**Prompt 64:** "Create UserProfileSerializer with nested user fields and avatar URL handling"

**Prompt 65:** "Create CustomTokenObtainPairSerializer that accepts both username and email"

**Prompt 66:** "Create ContactSerializer for contact form submissions"

**Prompt 67:** "Create ChatHistorySerializer for chat data"

**Prompt 68:** "Add country choices method to UserProfileSerializer"

**Prompt 69:** "Set up proper field validation and error handling in serializers"

**Prompt 70:** "Configure serializer methods for avatar URL generation"

---

## PHASE 8: VIEWS AND API ENDPOINTS (Prompts 71-85)

**Prompt 71:** "Create googleLogin view for Google OAuth authentication"

**Prompt 72:** "Create customerRegister view for user registration with Google and regular signup"

**Prompt 73:** "Create updateUser view for updating user information"

**Prompt 74:** "Create CustomTokenObtainPairView and CustomTokenRefreshView for JWT"

**Prompt 75:** "Create UserList view for listing users"

**Prompt 76:** "Create UserProfileDetailView for getting and updating user profiles with file upload"

**Prompt 77:** "Create currentUser view for getting current user data"

**Prompt 78:** "Create ContactCreateView for contact form submissions"

**Prompt 79:** "Create customer_support_agent view for AI chatbot functionality"

**Prompt 80:** "Set up proper permissions and authentication for all views"

**Prompt 81:** "Add error handling and response formatting to all views"

**Prompt 82:** "Configure file upload handling for avatar images"

**Prompt 83:** "Set up proper HTTP status codes for all responses"

**Prompt 84:** "Add input validation and sanitization"

**Prompt 85:** "Configure view decorators and class-based view inheritance"

---

## PHASE 9: URL CONFIGURATION (Prompts 86-90)

**Prompt 86:** "Create URL patterns for account app with register, login, profile, and token endpoints"

**Prompt 87:** "Create URL patterns for support_agent app with ask endpoint"

**Prompt 88:** "Configure main project URLs to include all app URLs"

**Prompt 89:** "Set up static and media file serving URLs for development"

**Prompt 90:** "Configure custom error handlers in main URLs"

---

## PHASE 10: AI INTEGRATION (Prompts 91-95)

**Prompt 91:** "Create search_faq function that uses fuzzy matching to find relevant FAQ answers"

**Prompt 92:** "Create generate_response_with_llm function that uses OpenAI or Ollama for AI responses"

**Prompt 93:** "Set up FAQ search with similarity scoring and threshold matching"

**Prompt 94:** "Configure AI response generation with proper error handling"

**Prompt 95:** "Set up chat history saving for all AI interactions"

---

## PHASE 11: FRONTEND SETUP (Prompts 96-110)

**Prompt 96:** "Navigate to the Frontend directory"

**Prompt 97:** "Create a new Next.js app called frontend with TypeScript, Tailwind, and ESLint"

**Prompt 98:** "Install @headlessui/react and @heroicons/react for UI components"

**Prompt 99:** "Install axios and js-cookie for API calls and cookie management"

**Prompt 100:** "Install next-auth for authentication"

**Prompt 101:** "Install react-toastify for notifications"

**Prompt 102:** "Install FullCalendar packages for calendar functionality"

**Prompt 103:** "Install ApexCharts and react-apexcharts for data visualization"

**Prompt 104:** "Install cookie and nookies for cookie handling"

**Prompt 105:** "Install TypeScript types for js-cookie"

**Prompt 106:** "Configure Next.js with API URL and Google OAuth credentials"

**Prompt 107:** "Set up Tailwind CSS configuration"

**Prompt 108:** "Create environment variables for API URL and NextAuth"

**Prompt 109:** "Configure Next.js image domains for external images"

**Prompt 110:** "Set up Next.js rewrites for sitemap"

---

## PHASE 12: AUTHENTICATION CONTEXT (Prompts 111-120)

**Prompt 111:** "Create AuthContext with login, register, logout, and user state management"

**Prompt 112:** "Implement JWT token storage and refresh logic in AuthContext"

**Prompt 113:** "Add Google OAuth integration to AuthContext"

**Prompt 114:** "Set up automatic token refresh and user loading on app start"

**Prompt 115:** "Create error handling and loading states in AuthContext"

**Prompt 116:** "Implement logout functionality with token cleanup"

**Prompt 117:** "Add user profile fetching and management"

**Prompt 118:** "Set up cookie-based token persistence"

**Prompt 119:** "Configure AuthProvider to wrap the entire app"

**Prompt 120:** "Add authentication state management with useEffect hooks"

---

## PHASE 13: UI COMPONENTS (Prompts 121-140)

**Prompt 121:** "Create a responsive header component with navigation and user menu"

**Prompt 122:** "Create a one-page header component with smooth scrolling navigation"

**Prompt 123:** "Create a footer component with social links and navigation"

**Prompt 124:** "Create an app header component for authenticated users"

**Prompt 125:** "Create a profile banner component with dismissible functionality"

**Prompt 126:** "Create a loading button component with spinner animation"

**Prompt 127:** "Create a chatbot component with chat history and AI integration"

**Prompt 128:** "Create login form component with validation and error handling"

**Prompt 129:** "Create registration form component with form validation"

**Prompt 130:** "Create contact form component with form submission"

**Prompt 131:** "Create profile page component with image upload and form fields"

**Prompt 132:** "Create customer service page component with chatbot integration"

**Prompt 133:** "Create dashboard page component with user information"

**Prompt 134:** "Create home page component with hero section, features, pricing, and FAQ"

**Prompt 135:** "Create not authenticated page component for unauthorized access"

**Prompt 136:** "Set up proper TypeScript types for all components"

**Prompt 137:** "Add responsive design and mobile optimization"

**Prompt 138:** "Implement proper form validation and error states"

**Prompt 139:** "Add loading states and user feedback"

**Prompt 140:** "Configure component styling with Tailwind CSS"

---

## PHASE 14: PAGES AND ROUTING (Prompts 141-150)

**Prompt 141:** "Create index page that shows home or dashboard based on authentication"

**Prompt 142:** "Create login page with proper metadata and SEO"

**Prompt 143:** "Create register page with form validation"

**Prompt 144:** "Create contact page with contact form"

**Prompt 145:** "Create dashboard page with authentication protection"

**Prompt 146:** "Create profile page with user profile management"

**Prompt 147:** "Create customer service page with AI chatbot"

**Prompt 148:** "Set up NextAuth configuration for Google OAuth"

**Prompt 149:** "Configure page metadata and SEO optimization"

**Prompt 150:** "Set up proper page routing and navigation"

---

## PHASE 15: FINAL SETUP (Prompts 151-155)

**Prompt 151:** "Run Django migrations to create database tables"

**Prompt 152:** "Create a Django superuser for admin access"

**Prompt 153:** "Copy default profile image to media directory"

**Prompt 154:** "Start Django development server on port 8000"

**Prompt 155:** "Start Next.js development server on port 3000"

---

## Additional Setup Notes

### Environment Variables Needed:
- `OPENAI_API_KEY`: Your OpenAI API key for AI functionality
- `USE_OLLAMA`: Set to "true" if using local Ollama instead of OpenAI
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret

### Key Features Included:
- JWT Authentication with refresh tokens
- Google OAuth integration
- User profile management with image uploads
- AI-powered customer support chatbot
- FAQ system with fuzzy matching
- Contact form with email notifications
- Custom admin interface
- Responsive design with Tailwind CSS
- TypeScript support
- Next.js with App Router

### File Structure Created:
```
aireadysaas/
├── Backend/
│   ├── account/
│   ├── support_agent/
│   ├── custom_admin/
│   ├── utils/
│   ├── backend/
│   ├── templates/
│   ├── static/
│   ├── media/
│   └── requirements.txt
└── Frontend/
    └── frontend/
        ├── src/
        ├── public/
        └── package.json
```

This guide provides a complete roadmap to build the exact same application from scratch using Cursor AI assistance.
