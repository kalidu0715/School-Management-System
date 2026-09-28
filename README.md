# 🏫 School Management System

A full-stack, enterprise-grade **School Management System** featuring a pixel-perfect dashboard, role-based authentication, PostgreSQL database health monitoring, and administrative cross-role activity tracking.

![Tech Stack](https://img.shields.io/badge/Stack-Node.js%20%7C%20React%20v18%20%7C%20PostgreSQL%20%7C%20Prisma-4f46e5)

---

## 🌟 Key Features

### 1. 🛡️ Role-Based Authentication & Portal Access
Supports 5 distinct user roles with dedicated permissions and dashboard views:
- 👑 **School Owner / Admin**: Full system control, PostgreSQL health cluster metrics, role management RBAC, and Force Sync.
- 🎓 **Principal**: Academic operations oversight, faculty directory, exam grade approvals.
- 👨‍🏫 **Teacher**: Subject course management, attendance marking, exam paper submission (e.g. Mark D., Elena G.).
- 🎒 **Student**: Course schedule, assignment submission tracking, GPA and attendance reports (e.g. Leo T.).
- 👨‍👩‍👧 **Parent**: Tuition fee status, payment clearance receipts, child academic progress tracking (e.g. Sarah W.).

### 2. 📊 Dynamic Dashboard & Real-Time Monitoring
- **4 Key Performance Indicator Cards**: Total Students (`1,432 +12`), Active Teachers (`84 On Shift`), Portal Usage (`78% Monthly avg.`), and Infrastructure Uptime (`99.9%`, `24ms latency`).
- **Recent Cross-Role Activity Table**: Interactive data table featuring role badge pills, category filtering, search, pagination, and **Export CSV** download functionality.
- **PostgreSQL Health Cluster**: Monitors DB connection pool usage (48/200), Cache Hit Rate (`99.82%`), and Transaction Rate (`1.2k TPS`).
- **Role Authorization Logs**: Live security feed of authentication events with `[AUTH_OK]` and `[AUTH_WARN]` badges.
- **Quick Jump Search**: Pressing search bar opens global modal to search across students, staff, subjects, and parents.

---

## 🛠️ Technology Stack

- **Frontend**: React v18, Vite, Vanilla CSS (Design System Tokens, Glassmorphism, Micro-animations), Lucide Icons.
- **Backend API**: Node.js, Express.js, CORS, Dotenv.
- **Database & ORM**: PostgreSQL, Prisma ORM 5.x.

---

## 📁 Directory Structure

```
School management system SH/
├── client/                      # React v18 Frontend (Vite)
│   ├── src/
│   │   ├── components/          # Sidebar, Header, StatCards, ActivityTable, DBHealthCard, AuthLogsCard, SearchModal
│   │   ├── context/             # AuthContext (Role-based state & demo logins)
│   │   ├── pages/               # Login, Dashboard, Subjects, Exams, Teachers, Students, Parents, RoleManagement, Billing, DBStatus
│   │   ├── styles/              # global.css design system
│   │   ├── App.jsx              # Main routing & layout controller
│   │   └── main.jsx             # React DOM entry
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                      # Node.js Express Backend
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema definitions
│   │   └── seed.js              # Database seed script for initial records
│   ├── routes/                  # Express API endpoints
│   │   └── api.js
│   ├── index.js                 # Server entry point
│   ├── .env.example             # Database connection configuration template
│   └── package.json
│
└── README.md                    # System documentation & setup guide
```

---

## 🚀 Quick Setup & Installation Guide

### Prerequisites
- Node.js (v18 or higher recommended)
- PostgreSQL database (Optional - system includes automatic fallback for demo mode if PostgreSQL is not currently running)

---

### Step 1: Install & Run Frontend (`client/`)

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   > The React app will run locally at **http://localhost:3000** (or http://localhost:5173).

---

### Step 2: Install & Run Backend with PostgreSQL (`server/`)

1. Open a new terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Configure your PostgreSQL connection string in `.env`:
   Create or edit `.env` inside `server/`:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/school_management_db?schema=public"
   PORT=5000
   ```

4. Run Prisma database migrations to create the PostgreSQL tables:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Seed the database with sample data matching the design screenshot:
   ```bash
   npx prisma db seed
   ```

6. Start the Express API server:
   ```bash
   npm run dev
   ```
   > The API server will run at **http://localhost:5000**.

---

## 🔐 Demo User Credentials

You can log in using any of the credentials below or click the **One-Click Demo Login** buttons on the login page:

| Role | Name | Email | Password |
|---|---|---|---|
| **School Owner / Admin** | ADMIN | `owner@school.edu` | `password123` |
| **Principal** | Principal | `principal@school.edu` | `password123` |
| **Teacher** | Sajith | `teacher@school.edu` | `password123` |
| **Student** | Ruwin | `student@school.edu` | `password123` |
| **Parent** | Amitha | `parent@gmail.com` | `password123` |

---

## 💡 Smart Dual-Mode Data Architecture

- **Connected Mode**: When the Express API and PostgreSQL database are running, live data is fetched directly via Prisma ORM.
- **Offline / Standalone Demo Mode**: If PostgreSQL is not active, the React frontend seamlessly provides full interactive mock data, ensuring instant UI demonstration without server dependencies.

---

## 📄 License
Created for School Management System. All rights reserved.
