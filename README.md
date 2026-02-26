## SocialHub – React Social Media App

SocialHub is a modern social media web application built with **React** and **Vite**, inspired by platforms like Facebook.  
It provides user authentication, a protected news feed, interactive posts with comments, and a profile page, all with a clean, responsive UI.

---

### Key Features

- **Authentication & Authorization**
  - User registration and login with **form validation** using `react-hook-form` + `zod`.
  - JWT token stored in `localStorage` and provided across the app via a custom `AuthContext`.
  - Public routes (`/`, `/login`, `/register`) and protected routes (`/home`, `/profile`, `/postDetails/:postId`) using route guards.

- **Home & Feed**
  - Landing page (`/`) with marketing-style hero section explaining the app and CTAs for Register/Login.
  - Main feed (`/home`) showing a list of posts fetched from a backend API.
  - Loading skeletons (`PostSkeleton`) for smoother UX while fetching posts.

- **Posts & Comments**
  - `PostCard` component showing post body, image, likes count, comments count, and top comment.
  - Post details page at `/postDetails/:postId` that shows a single post with its comments.
  - Ability to create comments on posts using **React Query mutations** and auto-refreshing the comments list.

- **Profile Page**
  - Profile page that uses cached profile data (React Query) to display:
    - Cover image and avatar  
    - Name, username  
    - Followers and following counts
  - Prepared actions for editing profile and changing cover/avatar (UI ready for future backend integration).

- **State Management & Data Fetching**
  - **React Context** (`AuthContext`) for authentication state (token, setToken).
  - **@tanstack/react-query** for:
    - Fetching posts and post details
    - Fetching comments for a post
    - Fetching user profile data
    - Mutations for creating comments with automatic cache invalidation

- **UI & UX**
  - Built with **@heroui/react** components and **Tailwind CSS** utility classes.
  - Responsive layout with a fixed top navbar (`MyNavbar`) and modern, glassmorphism-inspired design.
  - Icons and visuals via `iconsax-react` and custom hero images.
  - Loading, success, and error feedback inside forms (e.g. login/register loaders and success messages).

---

### Tech Stack

- **Frontend**
  - React + Vite
  - React Router DOM
  - @tanstack/react-query
  - @heroui/react
  - Tailwind CSS
  - iconsax-react, lucide-react

- **Form & Validation**
  - react-hook-form
  - zod

- **HTTP Client**
  - axios

---

### Project Structure (Simplified)

```bash
src/
  App.jsx                  # Routes configuration (public + protected)
  main.jsx                 # App entry, providers (HeroUI, React Query, AuthContext)
  index.css                # Global styles

  Componants/
    Context/
      AuthContext.jsx      # Authentication context (token management)
    Layout/
      Layout.jsx           # Root layout with routing outlet
    Navbar/
      MyNavbar.jsx         # Top navigation bar for authenticated area
    PostTemplet/
      PostCard.jsx         # Post UI + comment creation
      BtnComment.jsx
      TopComment.jsx
      PostSkeleton.jsx
    hero/
      Hero.jsx             # Hero section reused in auth pages
    BodyGard/
      BodyGard.jsx         # Protected route wrapper
      InnversGard.jsx      # Inverse guard for guests
    Error/
      Error.jsx            # Form & API error messages
    NotFound/
      NotFound.jsx

  Page/
    Home/
      Home.jsx             # Public landing page
    Login/
      Login.jsx            # Login form with validation & API integration
    Register/
      Register.jsx         # Registration form with validation & API integration
    MainHome/
      MainHome.jsx         # Authenticated feed with posts list
    PostDet/
      PostDet.jsx          # Post details + comments
    Profile/
      Profile.jsx          # User profile page
```

---

### Environment Variables

The app expects a backend API base URL from an environment variable:

```bash
VITE_API_URL=<YOUR_BACKEND_BASE_URL>
```

Create a `.env` file in the project root (same level as `vite.config.js`) and add:

```bash
VITE_API_URL=https://your-api-url.com/api/v1
```

---

### Getting Started

- **Prerequisites**
  - Node.js (LTS recommended)
  - npm or yarn

- **Installation**

```bash
npm install
```

- **Run in Development**

```bash
npm run dev
```

- **Build for Production**

```bash
npm run build
```

---

### Possible Future Improvements

- Implement real-time features (e.g. live chat, notifications) using WebSockets.
- Add full profile editing (bio, links, avatar, cover image upload).
- Implement likes/shares as real interactions with the backend.
- Add pagination / infinite scroll to the posts feed.
- Add dark/light theme toggle.

---

### Short CV Summary (English)

> Built **SocialHub**, a React + Vite social media web app with JWT authentication, protected routes, and a modern UI using HeroUI and Tailwind. Implemented data fetching and mutations with React Query (posts, comments, profile), and form validation with `react-hook-form` and `zod` for robust login and registration flows.

### ملخص قصير للمشروع (بالعربي)

> طوّرت تطبيق سوشيال ميديا ويب باسم **SocialHub** باستخدام React وVite مع نظام تسجيل دخول وحماية للصفحات باستخدام JWT وReact Router. استخدمت React Query لجلب البيانات والتعامل مع الكومنتس والبروفايل، بالإضافة إلى `react-hook-form` و`zod` لعمل فاليديشن قوية على فورمات التسجيل وتسجيل الدخول، مع واجهة مستخدم عصرية مبنية بـ HeroUI وTailwind.

