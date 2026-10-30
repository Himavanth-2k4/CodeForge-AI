# CodeForge AI

> High-quality, production-minded coding interview preparation platform.

Built with a modular monolithic architecture featuring a React SPA frontend, Node.js + Express backend, strict TypeScript, PostgreSQL, and sandboxed code execution.

---

## 🚀 Verified Runtimes & Dependencies

| Tool / Layer | Verified Version | Notes |
|---|---|---|
| **Node.js** | `v20.19.4` | LTS Engine |
| **npm** | `11.6.0` | npm workspaces enabled (`client`, `server`) |
| **TypeScript** | `5.6.3` | Strict mode enabled in both workspaces (`any` forbidden) |
| **Vite** | `5.4.21` | Configured with reverse proxy for `/api` requests |
| **React** | `18.3.1` | Single Page Application with TanStack Query v5 |
| **Express** | `4.21.1` | Modular NodeNext ESM architecture |
| **PostgreSQL** | `16-alpine` | Defined in `docker-compose.yml` (Port 5432, localhost-only) |

---

## 📁 Repository Structure

```
codeforge-ai/
├── AGENTS.md                  # Project charter & persistent engineering rules
├── docker-compose.yml         # Containerized PostgreSQL 16 service
├── package.json               # Root monorepo workspace configuration
├── package-lock.json          # Root dependency lockfile
├── README.md                  # Project documentation & setup instructions
├── .env.example               # Root environment variables template
├── .gitignore                 # Strict ignore rules for .env across all workspaces
├── docs/                      # Architectural & planning deliverables
├── client/                    # Frontend React Single Page Application (Vite)
│   ├── .env                   # Local client environment (git-ignored)
│   ├── .env.example           # Client environment template
│   ├── eslint.config.js       # ESLint 9 flat config (browser globals)
│   ├── index.html             # HTML5 entrypoint
│   ├── package.json           # Client dependencies and scripts
│   ├── postcss.config.js      # PostCSS configuration for Tailwind
│   ├── tailwind.config.js     # Tailwind CSS theme configuration
│   ├── tsconfig.json          # Strict client TypeScript configuration
│   ├── vite.config.ts         # Vite configuration with /api reverse proxy
│   └── src/
│       ├── App.tsx            # QueryClientProvider & BrowserRouter
│       ├── main.tsx           # React DOM root render
│       ├── index.css          # Tailwind directives & CSS reset
│       ├── vite-env.d.ts      # Vite client type definitions
│       ├── api/
│       │   └── client.ts      # Typed fetch wrapper with CSRF headers
│       ├── components/layout/
│       │   ├── AppLayout.tsx  # Shared layout frame (Navbar + Outlet + Footer)
│       │   ├── Navbar.tsx     # Header with status badge
│       │   └── Footer.tsx     # Footer copyright
│       ├── pages/
│       │   └── HomePage.tsx   # Hero & live backend connection status card
│       ├── routes/
│       │   └── AppRoutes.tsx  # Route definitions & 404 fallback
│       └── types/
│           └── api.types.ts   # Strongly typed API response contracts
└── server/                    # Backend API Server (Node.js + Express)
    ├── .env                   # Local server environment (git-ignored)
    ├── .env.example           # Server environment template
    ├── eslint.config.js       # ESLint 9 flat config (Node globals)
    ├── package.json           # Server dependencies and scripts
    ├── tsconfig.json          # Strict NodeNext TypeScript configuration
    └── src/
        ├── app.ts             # Express application factory (middleware + routes)
        ├── server.ts          # Process entrypoint & graceful shutdown
        ├── config/
        │   └── env.ts         # Runtime environment validation with Zod
        ├── controllers/
        │   └── health.controller.ts # GET /api/v1/health handler
        ├── middleware/
        │   ├── error.middleware.ts  # Centralized error handler
        │   └── logger.middleware.ts # Structured HTTP request logger
        ├── routes/
        │   ├── health.routes.ts     # Health router
        │   └── index.ts             # Aggregator router mounted at /api/v1
        └── utils/
            └── AppError.ts          # Custom operational error class
```

---

## ⚙️ Environment Setup

1. Copy the environment template files:

```powershell
Copy-Item .env.example .env
Copy-Item server/.env.example server/.env
Copy-Item client/.env.example client/.env
```

2. Environment Variables:
   - `PORT`: Express server port (default: `5000`).
   - `CLIENT_ORIGIN`: Allowed origin for CORS & CSRF checks (default: `http://localhost:5173`).
   - `DATABASE_URL`: PostgreSQL connection string (default: `postgresql://codeforge:codeforge_dev_secret@localhost:5432/codeforge_db?schema=public`).
   - `JWT_SECRET`: Secret key for session tokens (must be >= 32 chars).
   - `VITE_API_BASE_URL`: Base API route used by the React client.

---

## 📦 Verified Root Scripts

All commands work directly from the project root:

```powershell
# 1. Type-check all workspaces (client & server in strict mode)
npm run typecheck

# 2. Lint all workspaces (ESLint 9 flat config)
npm run lint

# 3. Production build (Vite bundle + TypeScript compilation)
npm run build

# 4. Run both client and server concurrently
npm run dev

# 5. Run services individually
npm run dev:server    # Starts Express backend on http://localhost:5000
npm run dev:client    # Starts Vite frontend on http://localhost:5173
```

---

## 📡 API Health Endpoint Architecture

- **Current Implementation (`GET /api/v1/health`)**:
  - Serves as an application **liveness probe** confirming the Express process is active, responsive, and serving HTTP requests.
- **Future Database Readiness (`GET /api/v1/health/ready`)**:
  - In **Milestone 3**, once Prisma and PostgreSQL are integrated, a readiness check will be added to ping the database (`prisma.$queryRaw\`SELECT 1\``) and verify end-to-end data connectivity.

---

## 🐳 PostgreSQL & Docker Compose Setup Guide (Windows)

The repository provides a production-grade PostgreSQL service in [`docker-compose.yml`](docker-compose.yml):
- Pinned image: `postgres:16-alpine`.
- Port binding: `127.0.0.1:5432:5432` (**localhost-only**, preventing external exposure).
- Named persistent volume: `codeforge_postgres_data`.
- Health check: `pg_isready -U codeforge -d codeforge_db`.

### If Docker Desktop is Not Yet Installed:
To set up Docker on Windows:
1. Download **Docker Desktop for Windows** from the official site: https://www.docker.com/products/docker-desktop/
2. Ensure **WSL 2 (Windows Subsystem for Linux)** feature is enabled during installation.
3. Start Docker Desktop and verify the installation in PowerShell:
   ```powershell
   docker --version
   docker compose version
   ```
4. Start the database service:
   ```powershell
   # Validate compose configuration
   docker compose config

   # Start PostgreSQL container in background
   docker compose up -d postgres

   # Check container status and health
   docker compose ps

   # View container logs
   docker compose logs postgres

   # Test database readiness directly inside the container
   docker compose exec postgres pg_isready -U codeforge -d codeforge_db
   ```"# CodeForge-AI" 
