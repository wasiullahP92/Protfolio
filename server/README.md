# Portfolio Backend API (Node.js, Express & MongoDB)

A production-ready REST API built with Node.js, Express, MongoDB, and Mongoose for Wasi Ullah's developer portfolio. Features secure JWT authentication, bcrypt password hashing, Multer image uploads, and full CRUD for projects, skills, experience, and education.

---

## 🛠️ Technology Stack
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js 4.x
- **Database:** MongoDB & Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **File Uploads:** Multer with file type & size validation
- **Configuration:** dotenv
- **Testing:** Automated integration test suite

---

## 📁 Directory Structure
```
server/
├── config/
│   └── db.js                 # MongoDB connection handler
├── controllers/
│   ├── authController.js     # Admin login, profile & logout
│   ├── projectController.js  # Projects CRUD & image management
│   ├── skillController.js    # Skills CRUD
│   ├── experienceController.js # Experience CRUD
│   └── educationController.js  # Education CRUD
├── middleware/
│   ├── authMiddleware.js     # JWT Bearer token protection
│   ├── uploadMiddleware.js   # Multer image upload & validation
│   └── errorHandler.js       # Centralized error & validation handler
├── models/
│   ├── Admin.js              # Admin schema with bcrypt hashing
│   ├── Project.js            # Project schema with auto-slug generation
│   ├── Skill.js              # Skills schema
│   ├── Experience.js         # Career experience schema
│   └── Education.js          # Academic qualifications schema
├── routes/
│   ├── authRoutes.js         # /api/auth/*
│   ├── projectRoutes.js      # /api/projects/*
│   ├── skillRoutes.js        # /api/skills/*
│   ├── experienceRoutes.js   # /api/experience/*
│   └── educationRoutes.js    # /api/education/*
├── tests/
│   └── api.test.js           # Automated end-to-end integration tests
├── uploads/                  # Uploaded project images storage
├── utils/
│   ├── generateToken.js      # JWT token generator
│   └── seedData.js           # Initial database seeder
├── .env.example              # Environment variables template
├── .env                      # Local environment configuration
├── package.json              # Server dependencies & scripts
└── server.js                 # Express application entrypoint
```

---

## ⚙️ Environment Configuration

Configuration is managed in `server/.env`. A ready-to-use `.env` file is generated:

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

> **Note on MongoDB:**
> - To use **MongoDB Atlas** (Cloud): replace `MONGO_URI` with your connection string:
>   `mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority`
> - To use **Local MongoDB**: install MongoDB Community Server or run `mongod`.

---

## 🚀 Running the Backend

### 1. Run Automated Test Suite
To verify all 24 API endpoints, authentication flows, and CRUD operations:
```bash
cd server
npm test
```

### 2. Seed Initial Database
To seed the default admin account and sample portfolio data:
```bash
cd server
npm run seed
```

To wipe and reseed:
```bash
node utils/seedData.js --destroy
node utils/seedData.js
```

### 3. Start Development Server
```bash
cd server
npm run dev
```

### 4. Start Production Server
```bash
cd server
npm start
```
Server runs at: `http://localhost:5000`
Health check: `http://localhost:5000/api/health`

---

## 🔒 Default Admin Credentials
- **Email:** `wasiwebsolution@gmail.com`
- **Password:** `AdminSecurePass123!`

---

## 📚 API Reference

### 1. Authentication
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | Public | Authenticate admin, returns JWT token |
| `GET` | `/api/auth/me` | Protected | Get current admin profile |
| `POST` | `/api/auth/logout` | Public | Discard session / logout |

#### Login Request:
```json
POST /api/auth/login
Content-Type: application/json

{
  "email": "wasiwebsolution@gmail.com",
  "password": "AdminSecurePass123!"
}
```

#### Protected Request Header:
```http
Authorization: Bearer <your_jwt_token_here>
```

---

### 2. Projects (`/api/projects`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/projects` | Public | List all projects (supports `?category=`, `?featured=`, `?search=`) |
| `GET` | `/api/projects/:id` | Public | Get single project by MongoDB ID or slug |
| `POST` | `/api/projects` | Protected | Create project (supports multipart/form-data with image) |
| `PUT` | `/api/projects/:id` | Protected | Update project fields and/or replace image |
| `DELETE` | `/api/projects/:id` | Protected | Delete project and delete associated uploaded image |

---

### 3. Skills (`/api/skills`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/skills` | Public | List all skills (supports `?category=`) |
| `POST` | `/api/skills` | Protected | Add a new skill |
| `PUT` | `/api/skills/:id` | Protected | Update skill level/category/icon |
| `DELETE` | `/api/skills/:id` | Protected | Delete skill |

---

### 4. Experience (`/api/experience`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/experience` | Public | Get all career timeline milestones |
| `GET` | `/api/experience/:id` | Public | Get single experience |
| `POST` | `/api/experience` | Protected | Add experience record |
| `PUT` | `/api/experience/:id` | Protected | Update experience record |
| `DELETE` | `/api/experience/:id` | Protected | Delete experience record |

---

### 5. Education (`/api/education`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/education` | Public | Get all academic qualifications |
| `GET` | `/api/education/:id` | Public | Get single education entry |
| `POST` | `/api/education` | Protected | Add education entry |
| `PUT` | `/api/education/:id` | Protected | Update education entry |
| `DELETE` | `/api/education/:id` | Protected | Delete education entry |
