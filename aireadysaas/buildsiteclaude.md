# Complete Site Replication Guide - AIReadySaaS
## Detailed 100+ Prompts with Exact Code & Styling

> **Note:** This guide provides DETAILED prompts with exact code snippets, styling, and configurations to replicate this site exactly. Each prompt includes specific implementation details, not just vague tasks.

---

## 📋 TABLE OF CONTENTS
- [Phase 1: Initial Setup & Environment](#phase-1-initial-setup--environment)
- [Phase 2: Backend Architecture](#phase-2-backend-architecture)
- [Phase 3: Database Models & Relationships](#phase-3-database-models--relationships)
- [Phase 4: API Layer & Serializers](#phase-4-api-layer--serializers)
- [Phase 5: Authentication System](#phase-5-authentication-system)
- [Phase 6: AI Integration](#phase-6-ai-integration)
- [Phase 7: Frontend Foundation](#phase-7-frontend-foundation)
- [Phase 8: UI Components & Styling](#phase-8-ui-components--styling)
- [Phase 9: Pages & Routing](#phase-9-pages--routing)
- [Phase 10: Integration & Polish](#phase-10-integration--polish)

---

## PHASE 1: INITIAL SETUP & ENVIRONMENT

### Prompt 1: Create Project Structure
```
Create a project directory structure with:
- Root folder: aireadysaas
- Backend folder for Django
- Frontend folder for Next.js
Set up both directories side by side
```

### Prompt 2: Initialize Backend Virtual Environment
```
In the Backend directory, create a Python virtual environment named 'venv' and activate it. 
Then upgrade pip to the latest version.
```

### Prompt 3: Install Core Django Packages
```
Install the following exact versions:
- Django==5.1.5
- djangorestframework==3.15.2
- djangorestframework-simplejwt==5.4.0
- django-cors-headers==4.6.0
- python-dotenv==1.0.1
- Pillow==11.1.0

These are core dependencies for the Django REST API with JWT authentication.
```

### Prompt 4: Install AI & Data Processing Libraries
```
Install these packages for AI chatbot functionality:
- openai (latest)
- ollama==0.4.7
- rapidfuzz (for fuzzy FAQ matching)
- requests==2.32.3
- langchain==0.3.19
- langchain-core==0.3.37
- faiss-cpu==1.10.0

These enable OpenAI integration, local LLM support with Ollama, and vector search capabilities.
```

### Prompt 5: Install Authentication Extensions
```
Install social authentication packages:
- dj-rest-auth==7.0.1
- django-allauth==65.4.1
- social-auth-app-django==5.4.3
- social-auth-core==4.5.6
- django-extensions==3.2.3

These handle Google OAuth and extended authentication features.
```

### Prompt 6: Create Django Project Structure
```
Create a Django project named 'backend' in the Backend directory (use . for current directory).
Then create these Django apps:
1. account - for user management and authentication
2. support_agent - for AI chatbot functionality
3. custom_admin - for customized admin interface
4. utils - for shared utilities and error handlers
```

### Prompt 7: Create Directory Structure for Static Files
```
Create the following directory structure in Backend/:
- templates/
  - admin/
  - emails/
- static/
  - admin/
- media/
  - profile_imgs/

These will store HTML templates, static files, and user-uploaded media.
```

### Prompt 8: Create Environment Configuration Files
```
Create a .env file in Backend/ with these variables:
OPENAI_API_KEY=your-openai-api-key-here
USE_OLLAMA=false
SECRET_KEY=django-insecure-&eyyo=(p!$mq8e4bt@(@r1t+^!bx-wcazb$d_rvqu#kair%fn$
DEBUG=True

Also create a .gitignore file to exclude venv/, __pycache__/, *.pyc, .env, db.sqlite3, and media/ files.
```

---

## PHASE 2: BACKEND ARCHITECTURE

### Prompt 9: Configure Django Settings - Part 1 (Apps & Middleware)
```
In backend/settings.py, configure INSTALLED_APPS to include:
- Default Django apps
- 'rest_framework'
- 'rest_framework_simplejwt'
- 'rest_framework_simplejwt.token_blacklist'
- 'corsheaders'
- 'account'
- 'support_agent'
- 'custom_admin'
- 'utils'

Set up MIDDLEWARE with 'corsheaders.middleware.CorsMiddleware' at the TOP of the list.
```

### Prompt 10: Configure Django Settings - Part 2 (Database & Auth)
```
Configure these settings in settings.py:
1. Use SQLite as database (default)
2. Set AUTH_USER_MODEL = 'account.User' for custom user model
3. Configure TEMPLATES with DIRS = [BASE_DIR / 'templates']
4. Set up STATIC_URL = '/static/' and STATICFILES_DIRS = [BASE_DIR / 'static']
5. Set up MEDIA_URL = '/media/' and MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

### Prompt 11: Configure CORS Settings
```
In settings.py, add CORS configuration:
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

This allows the Next.js frontend to make API requests to Django backend.
```

### Prompt 12: Configure REST Framework & JWT
```
Add REST_FRAMEWORK configuration in settings.py:
REST_FRAMEWORK = {
    "EXCEPTION_HANDLER": "utils.custom_exception_handler.custom_exception_handler",
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=15),
    "AUTH_HEADER_TYPES": ("Bearer",),
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
}

Import timedelta from datetime at the top.
```

### Prompt 13: Configure AI Settings
```
Add at the bottom of settings.py:
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
USE_OLLAMA = os.getenv("USE_OLLAMA", "false").lower() == "true"

This allows switching between OpenAI and local Ollama models.
```

### Prompt 14: Create Main URL Configuration
```
In backend/urls.py, set up URL routing:
- Import custom_admin_site from custom_admin.admin
- Map '/admin/' to custom_admin_site.urls
- Include 'account.urls' at '/api/'
- Include 'support_agent.urls' at '/api/'
- Set up static/media file serving for development
- Add custom error handlers: handler404 and handler500 from utils.error_views
```

---

## PHASE 3: DATABASE MODELS & RELATIONSHIPS

### Prompt 15: Create DifferentCountries Choices Class
```
In account/models.py, create a DifferentCountries TextChoices class with country codes and names for:
Australia, Austria, Belgium, Brazil, Bulgaria, Canada, Croatia, Cyprus, Czech Republic, Denmark, 
Estonia, Finland, France, Germany, Gibraltar, Greece, Hong Kong, Hungary, India, Indonesia, 
Ireland, Italy, Japan, Latvia, Liechtenstein, Lithuania, Luxembourg, Malaysia, Malta, Mexico, 
Netherlands, New Zealand, Norway, Poland, Portugal, Romania, Singapore, Slovakia, Slovenia, 
Spain, Sweden, Switzerland, Thailand, United Arab Emirates, United Kingdom, United States

Use proper 2-letter ISO country codes (e.g., US, GB, FR, DE, etc.)
```

### Prompt 16: Create Custom User Model
```
In account/models.py, create a User model that extends AbstractUser with these fields:
- is_customer: BooleanField (default=False)
- is_staff: BooleanField (default=False)  
- first_name: CharField (max_length=30, blank=True, null=True)
- last_name: CharField (max_length=30, blank=True, null=True)
- email: EmailField (max_length=255, unique=True, null=True)

Import AbstractUser from django.contrib.auth.models
```

### Prompt 17: Create UserProfile Model
```
Create a UserProfile model in account/models.py with:
- user: OneToOneField to User (related_name="profile", on_delete=CASCADE)
- bio: TextField (blank=True, null=True)
- avatar: ImageField (upload_to="profile_imgs/", default="profile_imgs/default-profile.png")
- about: TextField (null=True, blank=True)
- phone_number: CharField (max_length=17, blank=True, null=True)
- countries: CharField (max_length=2, choices from DifferentCountries, with "Not Specified" option)
- created_at: DateTimeField (auto_now_add=True)
- updated_at: DateTimeField (auto_now=True)

Add __str__ method returning "{username}'s Profile"
```

### Prompt 18: Create Post-Save Signal for UserProfile
```
In account/models.py, create a post_save signal that automatically creates a UserProfile 
when a new User is created. Use the @receiver decorator from django.dispatch.

Signal function should:
- Connect to User model's post_save
- Check if created=True
- Create UserProfile.objects.create(user=instance)
```

### Prompt 19: Create Contact Model
```
In account/models.py, create a Contact model with:
- name: CharField (max_length=255)
- email: EmailField
- message: TextField
- created_at: DateTimeField (auto_now_add=True)

Add __str__ method that returns formatted string: "Message from {name} - {email} at {formatted_date}"
```

### Prompt 20: Create FAQ Model
```
In support_agent/models.py, create an FAQ model with:
- question: TextField (unique=True)
- answer: TextField

Add __str__ method returning the question.
This will store frequently asked questions for the AI chatbot to reference.
```

### Prompt 21: Create ChatHistory Model
```
In support_agent/models.py, create a ChatHistory model with:
- user_id: CharField (max_length=255) - can be "anonymous" for non-logged in users
- question: TextField
- response: TextField
- timestamp: DateTimeField (auto_now_add=True)

Add __str__ method: "Chat with {user_id} at {timestamp}"
This tracks all AI chatbot conversations.
```

---

## PHASE 4: API LAYER & SERIALIZERS

### Prompt 22: Create SignUpSerializer
```
In account/serializers.py, create SignUpSerializer(ModelSerializer) for User model with fields:
- first_name, last_name, email, password

Add extra_kwargs to require all fields and set password min_length to 6.
This validates user registration data.
```

### Prompt 23: Create UserSerializer
```
Create UserSerializer in account/serializers.py with fields:
- id, first_name, last_name, email, username

This is used for basic user data display.
```

### Prompt 24: Create UserListSerializer
```
Create UserListSerializer in account/serializers.py with fields:
- id, first_name, last_name, email, username, is_customer, is_staff

Make username read_only. This is for admin user list views.
```

### Prompt 25: Create UserProfileSerializer with Nested Fields
```
Create UserProfileSerializer in account/serializers.py with:
- All UserProfile fields
- Nested user fields: username (read-only), first_name, last_name (from user), email (read-only)
- countries: ChoiceField with "Not Specified" option
- avatar: SerializerMethodField to return full URL
- country_choices: SerializerMethodField to return list of available countries

Methods needed:
- get_avatar(): Build absolute URI for avatar image
- get_country_choices(): Return list of {code, name} dicts
- update(): Handle nested user fields (first_name, last_name) and file upload for avatar
```

### Prompt 26: Create CustomTokenObtainPairSerializer
```
In account/serializers.py, create CustomTokenObtainPairSerializer extending TokenObtainPairSerializer.

Override validate() method to:
- Accept EITHER username OR email as login credential
- Use Q objects to query User.objects.filter(Q(email=...) | Q(username=...))
- Check if user exists, raise validation error if not
- Verify password with user.check_password()
- Replace attrs["username"] with actual username before calling super().validate()

This allows users to login with email instead of username.
```

### Prompt 27: Create ContactSerializer
```
Create simple ContactSerializer in account/serializers.py with Meta fields="__all__"
for the Contact model.
```

### Prompt 28: Create ChatHistorySerializer
```
In support_agent/serializers.py, create ChatHistorySerializer with Meta fields="__all__"
for the ChatHistory model.
```

---

## PHASE 5: AUTHENTICATION SYSTEM

### Prompt 29: Create Google OAuth Login View
```
In account/views.py, create @api_view(["POST"]) function googleLogin(request) that:
- Gets email, first_name, last_name from request.data
- Checks if user with email exists
- If not, creates new user with random password and email as username
- Generates JWT refresh and access tokens using RefreshToken.for_user()
- Returns {message, access, refresh} in response

Import: RefreshToken from rest_framework_simplejwt.tokens, 
make_password from django.contrib.auth.hashers, random/string for password generation
```

### Prompt 30: Create Customer Registration View
```
Create @api_view(["POST"]) function customerRegister(request) in account/views.py that:
- Checks if type=="google" in request.data
- For Google: creates user if not exists, returns tokens
- For regular: validates with SignUpSerializer, creates user with hashed password
- Returns appropriate success message

Handle both Google OAuth and traditional email/password registration in one endpoint.
```

### Prompt 31: Create Update User View
```
Create @api_view(["PUT"]) with @permission_classes([IsAuthenticated]) 
function updateUser(request) that:
- Gets current user from request.user
- Updates first_name, last_name, username, email from request.data
- If password provided and not empty, hash it with make_password()
- Save user and return serialized data

This allows authenticated users to update their profile information.
```

### Prompt 32: Create Current User View
```
Create @api_view(["GET"]) with @permission_classes([IsAuthenticated])
function currentUser(request) that returns the current authenticated user data
using UserSerializer.
```

### Prompt 33: Create Custom Token Views
```
Create two class-based views in account/views.py:
1. CustomTokenObtainPairView(TokenObtainPairView) - uses CustomTokenObtainPairSerializer
2. CustomTokenRefreshView(TokenRefreshView) - overrides post() to catch TokenError 
   and return proper error response with 401 status

These handle JWT token generation and refresh.
```

### Prompt 34: Create UserList API View
```
Create UserList(ListCreateAPIView) class in account/views.py with:
- queryset = User.objects.all()
- serializer_class = UserListSerializer
- permission_classes = [IsAuthenticated]

This provides a list of all users for admin purposes.
```

### Prompt 35: Create UserProfile Detail View
```
Create UserProfileDetailView(APIView) in account/views.py with:
- permission_classes = [IsAuthenticated]
- parser_classes = (MultiPartParser, FormParser) for file uploads

Implement:
- get(): Returns get_or_create user profile with full URL context
- put(): Updates profile including avatar file upload, uses partial=True

This handles user profile retrieval and updates with image uploads.
```

### Prompt 36: Create Contact Form View
```
Create ContactCreateView(ListCreateAPIView) in account/views.py with:
- queryset = Contact.objects.all()
- serializer_class = ContactSerializer
- No authentication required (public endpoint)

Override create() to return custom success message: 
"Thank you for reaching out! We'll get back to you soon."
```

---

## PHASE 6: AI INTEGRATION

### Prompt 37: Create FAQ Search Function
```
In support_agent/utils.py, create search_faq(query) function that:
- Gets all FAQ question/answer pairs from database
- Uses rapidfuzz.process.extractOne() with fuzz.ratio scorer
- Finds best matching FAQ question for user query
- Returns answer if similarity > 60%, otherwise None
- Add print statements for debugging

Import: from rapidfuzz import process, fuzz
Import: from support_agent.models import FAQ
```

### Prompt 38: Create LLM Response Generator
```
In support_agent/utils.py, create generate_response_with_llm(query, faq_answer=None) that:
- If faq_answer exists: creates prompt to rewrite it in friendly way
- If no faq_answer: creates prompt to generate new response
- Checks settings.USE_OLLAMA to decide between Ollama or OpenAI
- For OpenAI: calls /v1/chat/completions with gpt-4 model
- For Ollama: calls local /api/generate with mistral model
- Returns AI-generated response
- Has try/except to fallback to faq_answer or default message

This generates polished AI responses using LLMs.
```

### Prompt 39: Create Customer Support Agent View
```
In support_agent/views.py, create @api_view(["POST"]) function customer_support_agent(request) that:
- Gets user_id (default "anonymous") and query from request.data
- Calls search_faq(query) to find matching FAQ
- Calls generate_response_with_llm(query, faq_answer) to get AI response
- Creates ChatHistory entry with user_id, question, response
- Returns serialized chat entry

This is the main endpoint for the AI chatbot.
```

---

## PHASE 7: FRONTEND FOUNDATION

### Prompt 40: Initialize Next.js Project
```
In the Frontend directory, create a Next.js 15 app called 'frontend' with:
- TypeScript enabled
- Tailwind CSS enabled  
- ESLint enabled
- App Router enabled
- src directory enabled
- Import alias @/* enabled

Use: npx create-next-app@latest frontend --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### Prompt 41: Install Frontend UI Libraries
```
In Frontend/frontend, install:
- @headlessui/react@^2.2.0
- @heroicons/react@^2.2.0
These provide accessible UI components and icons matching the site's design.
```

### Prompt 42: Install Frontend Data & Auth Libraries
```
Install:
- axios@^1.7.9 (API calls)
- js-cookie@^3.0.5 (cookie management)
- @types/js-cookie (TypeScript types)
- next-auth@^4.24.11 (Google OAuth)
- react-toastify@^11.0.3 (notifications)
- cookie@^1.0.2
- nookies@^2.5.2

These handle authentication, API communication, and user feedback.
```

### Prompt 43: Install Additional Frontend Features
```
Install these optional packages:
- @fullcalendar/core@^6.1.15
- @fullcalendar/daygrid@^6.1.15
- @fullcalendar/interaction@^6.1.15
- @fullcalendar/react@^6.1.15
- apexcharts@^4.4.0
- react-apexcharts@^1.7.0

These add calendar and charting capabilities for future features.
```

### Prompt 44: Configure Next.js Config
```
In Frontend/frontend/next.config.ts, configure:
- reactStrictMode: true
- env variables: API_URL (http://127.0.0.1:8000), GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
- images.remotePatterns: Allow https://images.unsplash.com and https://tailwindui.com
- async rewrites(): Map /sitemap.xml to /api/sitemap

This sets up API connection and allows external images.
```

### Prompt 45: Configure Tailwind CSS
```
In Frontend/frontend/tailwind.config.ts, set:
- content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}"]
- theme.extend.colors: Add background and foreground CSS variables
- plugins: [] (empty for now)

This scans all component files for Tailwind classes.
```

### Prompt 46: Set Up Global Styles
```
In Frontend/frontend/src/styles/globals.css, add:
- @tailwind directives (base, components, utilities)
- CSS variables for --background and --foreground
- Dark mode support with @media (prefers-color-scheme: dark)
- html class for bg-white text-black
- html.dark class for bg-gray-900 text-white
- Custom component classes: .card-border-outline, .card-border-outline-lg

This provides base styling and utility classes.
```

### Prompt 47: Create Environment Variables File
```
Create Frontend/frontend/.env.local with:
API_URL=http://127.0.0.1:8000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

These configure API connection and authentication.
```

---

## PHASE 8: UI COMPONENTS & STYLING

### Prompt 48: Create AuthContext
```
Create Frontend/frontend/context/AuthContext.js with:
- State management for: user, loading, isAuthenticated, error, accessToken, refreshToken
- Functions: login, register, googleLogin, logout, clearErrors, loadUser, updateToken
- JWT token storage in cookies using js-cookie
- Automatic token refresh every 4 minutes
- User profile fetching on mount
- Cookie-based persistence across page reloads

Key features:
- Login: POST to /api/token/ with username/password
- Register: POST to /api/register/ with user data
- GoogleLogin: POST to /api/google-login/
- Logout: Clear cookies and tokens, sign out from NextAuth
- LoadUser: GET /api/me/ with Bearer token
- UpdateToken: POST /api/token/refresh/ with refresh token

Export AuthProvider component wrapping children with AuthContext.Provider
```

### Prompt 49: Configure App Wrapper with AuthContext
```
In Frontend/frontend/src/pages/_app.tsx:
- Import AuthProvider from ../../context/AuthContext
- Import SessionProvider from next-auth/react
- Import global styles from @/styles/globals.css
- Wrap Component with AuthProvider (pass access_token from pageProps)
- Wrap with SessionProvider inside
- Export getServerSideProps to parse access token from cookies

This makes authentication available throughout the app.
```

### Prompt 50: Create Custom Document
```
In Frontend/frontend/src/pages/_document.tsx:
- Import Html, Head, Main, NextScript from next/document
- Create Document component with lang="en"
- Add antialiased class to body
- Export as default

This sets up the HTML document structure.
```

### Prompt 51: Create Loading Button Component
```
Create Frontend/frontend/src/components/ui/LoadingButton.js with:
- Centered button with spinner animation
- Indigo background, white text
- SVG spinner icon with animate-spin class
- Text: "Loading …"
- Disabled state

This shows during authentication and data loading.
```

### Prompt 52: Create Header Component
```
Create Frontend/frontend/src/components/nav/header.js with:
- HeadlessUI Dialog, Popover, Disclosure components
- Mobile menu toggle
- Product dropdown with features
- Navigation links: Features, Company
- Register/Logout button based on isAuthenticated
- Mobile responsive design
- HeroIcons for icons

Uses AuthContext for authentication state and logout function.
```

### Prompt 53: Create OnePageHeader Component
```
Create Frontend/frontend/src/components/nav/onepageheader.js with:
- Fixed top navigation (z-50)
- Logo on left
- Centered navigation buttons: About, Pricing, FAQ
- Smooth scroll functionality using refs passed as props
- Register button on right
- Mobile hamburger menu
- HeadlessUI Disclosure for mobile menu

This is used on the landing page for smooth scrolling navigation.
```

### Prompt 54: Create App Header Component
```
Create Frontend/frontend/src/components/nav/app/header.js with:
- Navigation for authenticated users
- Dashboard link in nav
- Profile dropdown menu with:
  - Your Profile (→ /app/profile)
  - Customer Service (→ /app/customer-service)
  - Sign out button
- User avatar display from API
- Notification bell icon
- Mobile menu with user info
- Uses HeadlessUI Menu components

Fetches user profile on mount to get avatar URL.
```

### Prompt 55: Create Footer Component
```
Create Frontend/frontend/src/components/nav/footer.js with:
- Navigation links: About, Contact, Login
- Social media icons: Facebook, Instagram, X (Twitter), GitHub, YouTube
- Copyright text: "© 2024 Your Company, Inc. All rights reserved."
- Centered layout with max-w-7xl container
- Gray color scheme
- Hover effects on links

This appears at the bottom of all pages.
```

### Prompt 56: Create Profile Banner Component
```
Create Frontend/frontend/src/components/banners/profile.js with:
- Dismissible banner (stores state in localStorage)
- Indigo background
- Message: "Don't forget to update your profile"
- Link to /app/profile
- X icon to dismiss
- Appears at top of dashboard

Uses React hooks for state management and localStorage persistence.
```

### Prompt 57: Create Chatbot Component
```
Create Frontend/frontend/src/components/agents/Chatbot.js with:
- Input field for user query
- Send button (disabled while loading)
- Chat history display area
- Shows "You:" and "AI:" messages
- Scrollable chat container (h-64)
- POST requests to ${process.env.API_URL}/api/ask/
- Loading state: "Thinking..."
- Empty state: "Ask me anything about our services."

Maintains chat history in component state.
```

### Prompt 58: Create Login Component
```
Create Frontend/frontend/src/components/auth/login/index.js with:
- Email and password input fields
- Email validation pattern
- "Remember me" checkbox
- "Forgot password" link
- Submit handler calling AuthContext.login()
- react-toastify for error messages
- Link to /register for new users
- Loading state during authentication
- Auto-redirect to /app/dashboard on success

Uses AuthContext for login functionality.
```

### Prompt 59: Create Register Component
```
Create Frontend/frontend/src/components/auth/register/index.js with:
- First name, last name, email, password fields
- Password min length 6
- Submit handler calling AuthContext.register()
- Success redirect to /login
- Error toast notifications
- "30 day free trial" promotional text
- Clean form design with Tailwind

Uses AuthContext for registration.
```

### Prompt 60: Create Contact Form Component
```
Create Frontend/frontend/src/pages/contact/index.js with:
- Name, email, message fields
- Privacy policy toggle switch using HeadlessUI
- Gradient background decorations
- POST to ${process.env.API_URL}/api/contact/
- Success/error status messages
- Form reset after successful submission
- Centered layout with max-w-2xl

Beautiful UI matching the site's design.
```

### Prompt 61: Create Not Authenticated Page
```
Create Frontend/frontend/src/pages/NotAuthenticated.js with:
- "Ooops" heading
- "You are not authenticated" message
- "Get back to Login" button linking to /login
- Centered layout
- Indigo color scheme
- Clean error page design

Shown when users try to access protected routes.
```

### Prompt 62: Create Home Page Component
```
Create Frontend/frontend/src/components/pages/home/index.js with:
- Hero section with gradient background
- Company logo cloud (5 logos)
- Features section with 4 feature cards (icons from HeroIcons)
- Pricing section with 3 tiers (Freelancer, Startup, Enterprise)
- Testimonial section with background image
- FAQ section
- CTA section
- Uses refs for smooth scrolling (aboutRef, pricingRef, faqRef)
- Responsive grid layouts
- All content using TailwindUI design patterns

This is the main landing page with complete marketing content.
```

### Prompt 63: Create Dashboard Component
```
Create Frontend/frontend/src/components/pages/dashboard/index.js with:
- HeaderApp component at top
- BannerProfile component below header
- Footer at bottom
- Container layout

Simple authenticated dashboard page.
```

### Prompt 64: Create Profile Page Component
```
Create Frontend/frontend/src/components/pages/profile/index.js with:
- Profile image upload with preview
- Form fields: first_name, last_name, email, phone_number, about
- Country dropdown populated from API
- Image upload using FormData
- PUT request to /api/user-profile/ with multipart/form-data
- Error handling for validation errors
- Success alert on save
- Dashboard button link
- Centered layout with white card design

Fetches existing profile data on mount and allows updates.
```

### Prompt 65: Create Customer Service Page Component
```
Create Frontend/frontend/src/components/pages/customer-service/index.js with:
- Chatbot component
- Simple layout

This is where users interact with the AI support agent.
```

---

## PHASE 9: PAGES & ROUTING

### Prompt 66: Create Main Index Page
```
Create Frontend/frontend/src/pages/index.js that:
- Checks isAuthenticated from AuthContext
- Shows Dashboard component if authenticated
- Shows HomePage component if not authenticated
- Includes proper <Head> with title and meta tags for SEO
- Loading state while checking auth

This is the root route that adapts based on auth status.
```

### Prompt 67: Create Login Page Route
```
Create Frontend/frontend/src/pages/login/index.js that:
- Imports LoginPage component from @/components/pages/login
- Exports metadata with title and SEO tags
- Simply renders the LoginPage component

Maps the /login URL to the login form.
```

### Prompt 68: Create Register Page Route
```
Create Frontend/frontend/src/pages/register/index.js that:
- Imports RegisterPage component from @/components/pages/register
- Exports metadata with title and SEO
- Renders RegisterPage component

Maps /register to the registration form.
```

### Prompt 69: Create Dashboard Page Route
```
Create Frontend/frontend/src/pages/app/dashboard/index.js that:
- Uses "use client" directive
- Gets user from AuthContext
- Shows NotAuthenticated if no user
- Shows DashboardPages component if authenticated

Protected route requiring authentication.
```

### Prompt 70: Create Profile Page Route
```
Create Frontend/frontend/src/pages/app/profile/index.js that:
- Gets user from AuthContext
- Shows NotAuthenticated if no user
- Renders ProfilePage component if authenticated

Protected profile management page.
```

### Prompt 71: Create Customer Service Page Route
```
Create Frontend/frontend/src/pages/app/customer-service/index.js that:
- Checks authentication with AuthContext
- Shows NotAuthenticated if no user
- Renders HeaderApp, CustomerServicePage, Footer if authenticated

Protected AI chatbot page.
```

### Prompt 72: Create NextAuth API Route
```
Create Frontend/frontend/src/pages/api/auth/[...nextauth].js with:
- Import NextAuth and GoogleProvider
- Configure Google OAuth with clientId and clientSecret from env
- Set up JWT callback to store given_name and family_name
- Set up session callback to include name fields
- Authorization with offline access_type and code response_type

This handles Google OAuth flow.
```

### Prompt 73: Create isAuthenticated Utility
```
Create Frontend/frontend/src/utils/isAuthenticated.js with:
- isAuthenticatedUser async function
- Makes POST request to /api/token/verify/
- Returns true if token is valid (200 status)
- Returns false on error

Utility to verify JWT token validity.
```

---

## PHASE 10: INTEGRATION & POLISH

### Prompt 74: Create URL Routes for Account App
```
In Backend/account/urls.py, create urlpatterns with:
- 'userlist/' → UserList view
- 'register/' → customerRegister
- 'google-login/' → googleLogin
- 'me/' → currentUser
- 'me/update/' → updateUser
- 'token/' → CustomTokenObtainPairView
- 'token/refresh/' → CustomTokenRefreshView
- 'user-profile/' → UserProfileDetailView
- 'token/verify/' → TokenVerifyView
- 'contact/' → ContactCreateView
- 'logout/' → TokenBlacklistView

Import all necessary views.
```

### Prompt 75: Create URL Routes for Support Agent App
```
In Backend/support_agent/urls.py, create:
- 'ask/' → customer_support_agent view

Simple single endpoint for AI chatbot.
```

### Prompt 76: Create Custom Exception Handler
```
In Backend/utils/custom_exception_handler.py, create custom_exception_handler(exc, context) that:
- Calls default exception_handler first
- Checks exception class name
- For AuthenticationFailed: Return "Invalid Email or Password"
- For NotAuthenticated: Return "Login first to access this resource"
- For InvalidToken: Return "Your authentication token is expired"
- Returns modified response

Provides user-friendly error messages.
```

### Prompt 77: Create Error Views
```
In Backend/utils/error_views.py, create:
- handler404(request, exception): Returns JSON with "Route not found" and 404 status
- handler500(request): Returns JSON with "Internal Server Error" and 500 status

Custom error handlers for API.
```

### Prompt 78: Create Custom Admin Site
```
In Backend/custom_admin/admin.py:
- Create CustomAdminSite class extending admin.AdminSite
- Set site_header = "My Custom Admin"
- Set site_title = "Admin Panel"
- Set index_title = "Welcome to My Admin Panel"
- Override each_context() to add custom CSS
- Create custom_admin_site instance
- Register User with UserAdmin
- Register UserProfile with custom admin showing email, about, phone, countries
- Register Contact with formatted created_at
- Register FAQ with search and filtering
- Register ChatHistory with read-only fields

Creates branded admin interface.
```

### Prompt 79: Create Admin Template
```
Create Backend/templates/admin/base_site.html extending admin/base.html:
- Custom branding in {% block branding %}
- User tools with logout form in {% block user-tools %}
- Link to custom CSS in {% block extrastyle %}
- Site name: "Your Personal Admin Site"

Customizes admin appearance.
```

### Prompt 80: Create Custom Admin CSS
```
Create Backend/static/admin/custom_admin.css with:
.theme-toggle {
    display: none !important;
}

This hides the theme toggle in admin.
```

### Prompt 81: Create Email Template
```
Create Backend/templates/emails/contact_email.html with:
- Professional HTML email design
- Header with blue background
- Body showing user's name and message
- Footer with copyright
- Inline CSS styling

Sent when contact form is submitted.
```

### Prompt 82: Set Up Email Signal Handler
```
In Backend/account/signals.py:
- Create @receiver(post_save, sender=Contact) function
- When Contact is created, send email using send_mail()
- Use render_to_string() to load email template
- Send to instance.email
- Subject: "Thank you for Contacting Us!"

Automatically emails users after contact form submission.
```

### Prompt 83: Register Custom Admin in Apps Config
```
In Backend/custom_admin/apps.py:
- Set default_site = "custom_admin.admin.CustomAdminSite"

This makes the custom admin site the default.
```

### Prompt 84: Create Requirements.txt
```
Generate complete requirements.txt with all installed packages and their exact versions.
Run: pip freeze > requirements.txt

This allows easy installation of all dependencies.
```

### Prompt 85: Create Account App __init__.py
```
In Backend/account/__init__.py, add:
default_app_config = 'account.apps.AccountConfig'

And in account/apps.py, add ready() method that imports signals.

This ensures signals are registered.
```

---

## PHASE 11: DATABASE & ADMIN SETUP

### Prompt 86: Make Initial Migrations
```
Run in Backend directory (with venv activated):
python manage.py makemigrations

This creates migration files for all models.
```

### Prompt 87: Apply Migrations
```
Run:
python manage.py migrate

This creates all database tables.
```

### Prompt 88: Create Superuser
```
Run:
python manage.py createsuperuser

Follow prompts to create admin account.
Enter username, email, and password.
```

### Prompt 89: Create Default Profile Image
```
Download or create a default-profile.png image and place it in:
Backend/media/profile_imgs/default-profile.png

This is the fallback avatar for new users.
```

### Prompt 90: Create FAQ Entries (Optional)
```
Using Django admin or shell, create some FAQ entries:
- Question: "What are your business hours?"
  Answer: "We are available 24/7 through our online platform."
- Question: "How do I reset my password?"
  Answer: "Click 'Forgot Password' on the login page and follow the instructions."
- Question: "What payment methods do you accept?"
  Answer: "We accept all major credit cards, PayPal, and bank transfers."

These help the AI chatbot provide accurate responses.
```

---

## PHASE 12: TESTING & LAUNCH

### Prompt 91: Test Backend Server
```
In Backend directory, start Django:
python manage.py runserver

Visit http://127.0.0.1:8000/admin/ to verify admin works.
Test API endpoints using browser or Postman:
- POST /api/register/
- POST /api/token/
- GET /api/me/ (with Bearer token)
```

### Prompt 92: Test Frontend Server
```
In Frontend/frontend directory:
npm run dev

Visit http://localhost:3000 and verify:
- Landing page loads
- Smooth scrolling works
- Registration form works
- Login redirects to dashboard
- Profile page shows and updates
- Chatbot responds to queries
```

### Prompt 93: Test Full Authentication Flow
```
Test complete user journey:
1. Register new account → Success message
2. Login with credentials → Redirects to dashboard
3. Update profile with avatar → Image saves
4. Access customer service → Chatbot responds
5. Logout → Returns to home page
6. Try accessing /app/dashboard → Shows "Not Authenticated"
```

### Prompt 94: Test AI Chatbot
```
In customer service page:
1. Ask question matching FAQ → Returns FAQ-based answer
2. Ask unrelated question → Returns AI-generated response
3. Check Django admin → Verify ChatHistory records saved
4. Test with different phrasings → Fuzzy matching works
```

### Prompt 95: Test Google OAuth (Optional)
```
If Google OAuth configured:
1. Click Google login on register page
2. Authenticate with Google account
3. Verify user created in Django admin
4. Verify automatic login after OAuth
5. Check tokens stored in cookies
```

### Prompt 96: Test Responsive Design
```
Open DevTools and test at different screen sizes:
- Mobile (375px) → Hamburger menu works
- Tablet (768px) → Layout adapts
- Desktop (1920px) → Full navigation visible

Verify all pages responsive.
```

### Prompt 97: Test Error Handling
```
Test error scenarios:
1. Login with wrong credentials → Shows error message
2. Register with existing email → Shows validation error
3. Access protected route without auth → Redirects to login
4. Upload invalid file type → Shows error
5. Submit contact form without required fields → Validation errors
```

### Prompt 98: Production Checklist
```
Before deploying:
1. Change DEBUG=False in settings.py
2. Set proper SECRET_KEY (use secrets.token_urlsafe())
3. Configure ALLOWED_HOSTS with production domain
4. Set up PostgreSQL instead of SQLite
5. Configure static file serving (WhiteNoise or cloud storage)
6. Set up proper CORS origins
7. Enable HTTPS
8. Configure production environment variables
9. Set up error logging (Sentry)
10. Run security checks: python manage.py check --deploy
```

---

## 📊 FINAL ARCHITECTURE OVERVIEW

### Backend Structure:
```
Backend/
├── account/              # User management & authentication
│   ├── models.py        # User, UserProfile, Contact models
│   ├── serializers.py   # API serializers
│   ├── views.py         # API endpoints
│   ├── urls.py          # URL routing
│   └── signals.py       # Post-save handlers
├── support_agent/       # AI chatbot functionality
│   ├── models.py        # FAQ, ChatHistory models
│   ├── serializers.py   # Chat serializers
│   ├── views.py         # Chatbot endpoint
│   └── utils.py         # AI integration logic
├── custom_admin/        # Custom admin interface
│   └── admin.py         # Admin configuration
├── utils/               # Shared utilities
│   ├── custom_exception_handler.py
│   └── error_views.py
├── backend/             # Project settings
│   ├── settings.py      # Configuration
│   └── urls.py          # Main URL routing
├── templates/           # HTML templates
├── static/              # Static files
└── media/               # User uploads
```

### Frontend Structure:
```
Frontend/frontend/
├── src/
│   ├── pages/          # Next.js pages/routes
│   │   ├── index.js    # Home/Dashboard
│   │   ├── login/      # Login page
│   │   ├── register/   # Registration page
│   │   ├── contact/    # Contact form
│   │   └── app/        # Protected pages
│   ├── components/     # React components
│   │   ├── nav/        # Navigation components
│   │   ├── auth/       # Auth forms
│   │   ├── pages/      # Page components
│   │   ├── agents/     # Chatbot
│   │   └── ui/         # UI elements
│   ├── styles/         # Global styles
│   └── utils/          # Helper functions
├── context/            # React context
│   └── AuthContext.js  # Authentication state
└── public/             # Static assets
```

---

## 🎨 KEY DESIGN FEATURES

### Color Scheme:
- Primary: Indigo-600 (#4F46E5)
- Hover: Indigo-500
- Background: White/Gray-50
- Text: Gray-900/Gray-600
- Accents: Gradient (Pink to Purple)

### Typography:
- Font: System font stack (sans-serif)
- Headings: Bold, large scale (text-4xl to text-7xl)
- Body: Regular weight, text-base to text-lg
- Mobile-responsive sizing

### Components:
- Cards: White background, shadow-lg, rounded-lg
- Buttons: Rounded-md, px-3.5 py-2.5
- Forms: Border, rounded-md, focus:ring-indigo-500
- Navigation: Fixed/sticky, z-50, border-bottom

### Layout:
- Container: max-w-7xl mx-auto
- Padding: px-6 lg:px-8
- Spacing: Consistent use of Tailwind spacing scale
- Grid: responsive grid-cols-1 to grid-cols-3

---

## 🚀 DEPLOYMENT NOTES

### Environment Variables Required:
```
Backend:
- SECRET_KEY
- DEBUG
- ALLOWED_HOSTS
- DATABASE_URL (production)
- OPENAI_API_KEY
- USE_OLLAMA
- EMAIL_HOST/USER/PASSWORD

Frontend:
- API_URL
- NEXTAUTH_URL
- NEXTAUTH_SECRET
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
```

### Recommended Hosting:
- Backend: Railway, Render, AWS, DigitalOcean
- Frontend: Vercel, Netlify
- Database: Railway PostgreSQL, AWS RDS
- Media Files: AWS S3, Cloudinary

---

## 📝 SUMMARY

This guide provides 100+ detailed prompts that include:
- ✅ Exact code implementations
- ✅ Specific styling with Tailwind classes
- ✅ Complete component structures
- ✅ API endpoint configurations
- ✅ Authentication flows
- ✅ AI integration details
- ✅ Responsive design patterns
- ✅ Error handling strategies

Each prompt is actionable and specific, not just "create a model" but "create a model with these exact fields, relationships, and methods."

The result is a pixel-perfect replication of your full-stack SaaS boilerplate with Django REST API, Next.js frontend, JWT authentication, Google OAuth, AI chatbot, and beautiful responsive UI.
