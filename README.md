# Wasi Ullah – Full-Stack Developer Portfolio & Private Admin CMS

A modern, high-performance, responsive personal developer portfolio and private content management system for **Wasi Ullah – WordPress Developer & Web Designer**.

Built with a decoupled full-stack architecture:
- **Frontend:** React 19, Vite, Tailwind CSS, GSAP, Lucide React, React Router 7.
- **Backend:** Node.js, Express 4, MongoDB, Mongoose, JWT Authentication, bcryptjs, Multer, Helmet, Rate Limiting.
- **Embedded Database Fallback:** Automatic zero-setup in-memory MongoDB engine for instant local development without pre-installed MongoDB services.

---

## 🌟 Key Features

### Public Developer Portfolio
- **Dark-Themed Aesthetic:** Deep dark canvas (`#06070b`) with ambient purple and electric cyan glows.
- **Hero Section:** GSAP entrance animation, availability indicator, profile showcase with floating badge micro-cards.
- **Dynamic Content:** Automatically fetches projects, skills, experience, and education from MongoDB with seamless static fallback.
- **Curated Projects Showcase:** Filterable by category (*All, WordPress, E-Commerce, Web Design*), with high-res thumbnails, PageSpeed metrics, and live demo modals.
- **Interactive Skills Inventory:** Filterable by Core Competencies vs. Actively Learning Stacks with animated proficiency bars.
- **Career & Academic Timelines:** Verified milestones for P92 IT Solution internship, freelance client roles, and educational qualifications (DIT, Intermediate, Matric).
- **Inbound Contact System:** Interactive message form with client-side validation that saves submissions directly to MongoDB and notifies the admin dashboard.
- **Curriculum Vitae Modal:** Formatted, on-screen printable CV with one-click PDF generation.

### Private Admin Dashboard (`/admin`)
- **Protected Routes:** Guarded with JWT Bearer authentication; unauthenticated visits are redirected to `/admin/login`.
- **Overview Analytics:** Real-time counters (Total Projects, Featured Projects, Total Skills, Experience Entries, Unread Inquiries) and category breakdown charts.
- **Projects Management:** Complete CRUD system with search, category filtering, one-click featured toggling, and Multer image file uploads or direct image URLs.
- **Skills Management:** Add, edit, or remove skills with live proficiency sliders (0–100%) and Lucide icon selectors.
- **Experience & Education Management:** Add, update, and manage job roles, key contributions, and academic credentials.
- **Messages Inbox:** Real-time contact form inbox with unread badges, full message reader, and quick "Reply via Email" mailto launcher.
- **Settings:** Update administrator display name, email, and password.

---

## 📁 Project Architecture

```
portfolio/
├── index.html                   # HTML5 entry with Google Fonts & Open Graph SEO tags
├── package.json                 # Frontend dependencies & root orchestration scripts
├── tailwind.config.js           # Dark theme design system & custom glow effects
├── postcss.config.js            # PostCSS configuration
├── public/
│   ├── wasi-profile.jpg         # Profile portrait
│   └── favicon.svg              # Custom SVG favicon
├── src/
│   ├── App.jsx                  # Main router (Public Portfolio & Admin routes)
│   ├── main.jsx                 # React root mount
│   ├── index.css                # Tailwind directives & glassmorphic utility classes
│   ├── context/
│   │   └── AuthContext.jsx      # Admin auth context & session provider
│   ├── utils/
│   │   └── api.js               # Unified API client communicating with backend
│   ├── data/
│   │   └── portfolioData.js     # Default structured data store & offline fallback
│   ├── components/
│   │   ├── Navbar.jsx           # Nav links, CV download modal trigger, Admin portal link
│   │   ├── Hero.jsx             # GSAP timeline intro, avatar card, floating badges
│   │   ├── About.jsx            # Background, values, and IT diploma credentials
│   │   ├── Skills.jsx           # Dynamic filterable skills grid (Core & Learning)
│   │   ├── Experience.jsx       # Career timeline with achievements
│   │   ├── Education.jsx        # Academic milestone cards
│   │   ├── Projects.jsx         # Dynamic projects grid with GSAP stagger reveal
│   │   ├── ProjectModal.jsx     # Deep-dive project modal with metrics & live links
│   │   ├── Contact.jsx          # Public inquiry form connected to MongoDB
│   │   ├── CVModal.jsx          # Printable Curriculum Vitae modal
│   │   ├── SocialIcons.jsx      # SVG social icons (GitHub, LinkedIn, WhatsApp)
│   │   ├── Footer.jsx           # Brand statement, sitemap & smooth back-to-top
│   │   └── admin/
│   │       ├── AdminLayout.jsx  # Dark sidebar, top navigation, unread badge counter
│   │       └── ProtectedRoute.jsx # Route authentication guard
│   └── pages/admin/
│       ├── AdminLogin.jsx       # Private admin login with demo credentials autofill
│       ├── DashboardOverview.jsx# Analytics cards, category distribution chart, inbox
│       ├── ProjectsManagement.jsx # Projects table, search, category filter, delete modal
│       ├── AddProject.jsx       # Add/Edit project form with Multer upload or URL
│       ├── SkillsManagement.jsx # Skills grid with proficiency slider & icons
│       ├── ExperienceManagement.jsx # Work history and contributions editor
│       ├── EducationManagement.jsx # Academic qualifications editor
│       ├── MessagesManagement.jsx # Client inquiries reader & status toggler
│       └── AdminSettings.jsx    # Profile update and password change forms
└── server/
    ├── config/
    │   └── db.js                # MongoDB connection handler with auto-fallback
    ├── controllers/             # Auth, Projects, Skills, Experience, Education, Messages
    ├── middleware/              # JWT protection, Multer upload, centralized error handler
    ├── models/                  # Admin, Project, Skill, Experience, Education, Message
    ├── routes/                  # RESTful API route definitions
    ├── tests/
    │   └── api.test.js          # Automated end-to-end integration test suite (31 tests)
    ├── uploads/                 # Local image uploads storage (served at /uploads)
    ├── utils/
    │   ├── generateToken.js     # JWT signing helper
    │   └── seedData.js          # Initial database seeder
    ├── .env.example             # Backend environment template
    ├── .env                     # Active environment configuration
    ├── package.json             # Backend dependencies
    └── server.js                # Express application entrypoint with Helmet & Rate Limits
```

---

## ⚙️ Environment Variables Setup

The backend configuration is managed in `server/.env`. A pre-configured file is generated:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/portfolio_wasi
JWT_SECRET=super_secret_jwt_key_wasi_portfolio_2026_change_in_production
JWT_EXPIRE=30d
ADMIN_NAME=Wasi Ullah
ADMIN_EMAIL=wasiwebsolution@gmail.com
ADMIN_PASSWORD=AdminSecurePass123!
CLIENT_URL=http://localhost:5173
```

> **Zero-Setup Database:** If a local MongoDB instance is not detected, the backend will automatically spin up an embedded in-memory MongoDB instance for development!
> To connect to **MongoDB Atlas (Cloud)**, simply paste your cloud connection string into `MONGO_URI`:
> `mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority`

---

## 🚀 Running the Project

### Option A: Run Full Stack Simultaneously (Recommended)
From the root project directory:
```powershell
npm run dev:all
```
This runs both:
- **React Frontend:** `http://localhost:5173`
- **Node.js Backend:** `http://localhost:5000`

---

### Option B: Run in Separate Terminals

#### Terminal 1 — Frontend:
```powershell
npm run dev
```

#### Terminal 2 — Backend:
```powershell
cd server
npm run dev
```

---

## 🧪 Automated Testing

The backend includes a comprehensive 31-endpoint integration test suite that tests authentication, rate limiting, and full CRUD operations:

```powershell
cd server
npm test
```
*Current test result: **31 Passed, 0 Failed**.*

---

## 🔐 Default Administrator Login

- **Dashboard Login URL:** `http://localhost:5173/admin/login`
- **Email:** `wasiwebsolution@gmail.com`
- **Password:** `AdminSecurePass123!`
*(The login page includes a convenient one-click **"Autofill Default Admin Credentials"** button).*

---

## 📡 REST API Reference

### 1. Authentication
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | Public | Authenticates admin and returns JWT token |
| `GET` | `/api/auth/me` | Protected | Returns current admin profile |
| `POST` | `/api/auth/logout` | Public | Discards session on client |
| `PUT` | `/api/auth/profile` | Protected | Updates admin name and email |
| `PUT` | `/api/auth/password` | Protected | Changes admin password |

### 2. Projects
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/projects` | Public | List all projects (supports `?category=`, `?featured=`, `?search=`) |
| `GET` | `/api/projects/:id` | Public | Get single project by ID or slug |
| `POST` | `/api/projects` | Protected | Create new project (supports multipart image upload) |
| `PUT` | `/api/projects/:id` | Protected | Update existing project |
| `DELETE` | `/api/projects/:id` | Protected | Delete project and remove local file |

### 3. Skills
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/skills` | Public | List all skills |
| `POST` | `/api/skills` | Protected | Create a new skill |
| `PUT` | `/api/skills/:id` | Protected | Update skill level/category/icon |
| `DELETE` | `/api/skills/:id` | Protected | Delete skill |

### 4. Experience & Education
| Resource | GET | POST (Protected) | PUT (Protected) | DELETE (Protected) |
|---|---|---|---|---|
| Experience | `/api/experience` | `/api/experience` | `/api/experience/:id` | `/api/experience/:id` |
| Education | `/api/education` | `/api/education` | `/api/education/:id` | `/api/education/:id` |

### 5. Inquiries & Messages
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/messages` | Public | Submit message from public contact form |
| `GET` | `/api/messages` | Protected | List all contact inquiries for admin |
| `PUT` | `/api/messages/:id/read` | Protected | Mark inquiry as read or unread |
| `DELETE` | `/api/messages/:id` | Protected | Delete inquiry |

---

## 🚢 Production Deployment Guide

### Frontend Deployment (Vercel or Netlify)
1. Run `npm run build` to generate the production bundle in `dist/`.
2. Connect your Git repository to **Vercel** or **Netlify**.
3. Configure build settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Set environment variable:
   - `VITE_API_BASE_URL` = `https://your-backend-domain.com/api`
   - `VITE_SERVER_URL` = `https://your-backend-domain.com`

### Backend Deployment (Render, Railway, or VPS)
1. Deploy the `server/` directory.
2. Build command: `npm install`
3. Start command: `node server.js`
4. Environment variables to add:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
   - `MONGO_URI` = `mongodb+srv://<user>:<pass>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority`
   - `JWT_SECRET` = `<your_production_secret>`
   - `CLIENT_URL` = `https://your-frontend-domain.com`
