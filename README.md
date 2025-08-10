# StayEase - Hotel Booking Application

<div align="center">
  <div>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express 5" />
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="SMTP Gmail" />
    <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest" />
    <img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white" alt="Cypress" />
  </div>
  <p align="center">Live Web Application <a href=https://stayease-sutd.vercel.app/>StayEase</a></p>
</div>

A full‑stack hotel booking platform with a React + Vite frontend and an Express + Prisma backend on PostgreSQL. Includes user registration with email verification, JWT-based auth (token kept in cookies on the client), hotel search and details, Stripe Checkout payments, and booking history.

## Tech Stack
- Frontend: React 19, Vite, TypeScript, Tailwind, Axios, React Router
- Backend: Node.js, Express 5, TypeScript, Prisma ORM
- Database: PostgreSQL (Railway)
- Payments: Stripe Checkout
- Email: SMTP via Nodemailer
- E2E/Component Tests: Cypress
- Unit/Integration Tests (backend): Jest + Supertest

---

## Project Structure

```
C4T6-HotelBooking/
├── apps/
│   ├── client/                  # React frontend (Vite)
│   │   ├── src/
│   │   │   ├── api/             # Axios instance and API modules
│   │   │   ├── components/      # UI components
│   │   │   ├── contexts/        # Auth context (cookie-based)
│   │   │   ├── hooks/           # Custom hooks
│   │   │   ├── pages/           # Route pages
│   │   │   └── types/           # TS types
│   │   └── vercel.json          # SPA rewrites and cache headers
│   └── server/                  # Express backend
│       ├── prisma/              # Prisma schema and migrations
│       ├── src/
│       │   ├── controllers/     # Route handlers (auth, booking, payment, hotel, destination)
│       │   ├── middleware/      # Auth JWT middleware
│       │   ├── routes/          # Express routers
│       │   └── utils/           # Prisma client, Stripe client, email helper
│       └── data/                # Destination data for quick search
├── package.json                 # Root workspace scripts
└── README.md
```

---

## Features

- User registration with email verification link
- Secure login; JWT stored in cookies on client, sent as Bearer Authorization headers
- Profile retrieval and updates, change password, delete account
- Destination search with fuzzy matching; nearby destination search by radius
- Hotel search with prices, details with per‑night conversion
- Stripe Checkout integration and booking persistence post‑payment
- Email booking confirmation

---

## Environment Variables

### Backend (`apps/server/.env`)
Required:
- `PORT`=3000
- `DATABASE_URL`=postgresql connection string (Railway)
- `JWT_SECRET`=your_secure_random_string
- `FRONTEND_URL`=frontend origin (e.g., https://your-frontend.vercel.app)
- `BASE_URL`=public backend base URL (e.g., https://your-backend.up.railway.app)
- `STRIPE_KEY`=Stripe secret key (starts with sk_live_ or sk_test_)
- `SMTP_HOST`=SMTP host (e.g., smtp.sendgrid.net, smtp.gmail.com)
- `SMTP_PORT`=587
- `SMTP_USER`=SMTP username
- `SMTP_PASS`=SMTP password

Optional (testing/fuzz DB):
- `DATABASE_TEST_URL`=secondary Postgres URL for test routes under `/test/api`

Example:
```env
PORT=3000
DATABASE_URL=postgresql://user:pass@host:port/db
DATABASE_TEST_URL=postgresql://user:pass@host:port/db_test
JWT_SECRET=supersecretjwt
FRONTEND_URL=https://your-frontend.vercel.app
BASE_URL=https://your-backend.up.railway.app
STRIPE_KEY=sk_test_************************
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_smtp_password
```

### Frontend (`apps/client/.env`)
```env
VITE_API_URL=http://localhost:3000/api
VITE_TEST_API_URL=http://localhost:3000/test/api
```

On Vercel, set:
```env
VITE_API_URL=https://your-backend.up.railway.app/api
```

---

## Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- npm 8+
- PostgreSQL (local or use a remote Railway DB)
- Stripe account and API key
- SMTP credentials for email (e.g., SendGrid)

### Install Dependencies
```bash
# From repo root
npm run install:all
```

### Configure Environment
- Create `apps/server/.env` and `apps/client/.env` using the examples above.
- Ensure your Postgres is reachable from your machine.

### Initialize Database
Migrations are committed in the repo. Apply them:
```bash
cd apps/server
npx prisma migrate deploy
npx prisma generate
```

### Run Both Apps
```bash
# From repo root
npm start
# Client at http://localhost:5173
# Server at http://localhost:3000
```

### Run Individually
```bash
# Frontend only
npm run dev:client

# Backend only
npm run dev:server
```

### Build
```bash
# Build both
npm run build

# Or separately
npm run build:client
npm run build:server
```

---

## Implementation Details

### Authentication
- JWT auth with `Authorization: Bearer <token>` handled by `apps/server/src/middleware/auth.ts` (uses `JWT_SECRET`).
- Client stores `auth_user` and `auth_token` cookies and sends token in Authorization header via Axios interceptor (`apps/client/src/api/axios.ts`). Cookies are set with `sameSite='strict'` and `secure` in production.
- Email verification flow:
  - Register: `POST /api/auth/register` issues a verification email via `sendVerificationEmail` using `BASE_URL` to build verification link (`/api/auth/verify-email?token=...`).
  - Verify: `GET /api/auth/verify-email?token=...` marks the user verified.
  - Resend: `POST /api/auth/resend-verification`.

### Hotels and Destinations
- Destination search with Fuse.js against `apps/server/data/destinations.json`.
- Hotel search/details integrate with service layer (`apps/server/src/services/hotelService.ts`). Prices converted to per‑night based on check‑in/out.

### Payments and Bookings
- `POST /api/payments/checkout` creates a Stripe Checkout session with line items from the client.
- Success flow:
  - Frontend redirects back with `session_id`.
  - `POST /api/payments/success` verifies the session via Stripe API and persists bookings (idempotent per `stripeSessionId`).
  - Sends booking confirmation email via `sendBookingConfirmationEmail`.
- Bookings linked to user with cascade delete in Prisma schema.

### CORS
- Allowed origins include `FRONTEND_URL` and `http://localhost:5173`.

---

## API Reference

Base URLs:
- Local: `http://localhost:3000/api`
- Test routes: `http://localhost:3000/test/api` (uses `DATABASE_TEST_URL`)
- Production: `https://your-backend.up.railway.app/api`

Auth:
- `POST /auth/register` body: `{ email, password, name? }`
- `GET /auth/verify-email?token=...`
- `POST /auth/resend-verification` body: `{ email }`
- `POST /auth/login` body: `{ email, password }` → `{ token, user }`
- `GET /auth/profile` (auth)
- `PATCH /auth/profile` (auth) body: `{ name }`
- `PATCH /auth/change-password` (auth) body: `{ currentPassword, newPassword }`
- `DELETE /auth/delete-account` (auth) body: `{ password }`

Destinations:
- `GET /destinations?query=...`
- `GET /destinations/nearby?lat=..&lng=..&radius=..`
- `GET /destinations/hotel?destination_id=..&checkin=..&checkout=..&guests=..`

Hotels:
- `GET /hotels/search?destination_id=..&checkin=..&checkout=..&guests=..&currency?&lang?`
- `GET /hotels/:id/details?destination_id=..&checkin=..&checkout=..&guests=..&currency?&lang?`

Bookings:
- `POST /bookings` (auth) body:
  ```
  {
    hotelId, hotelName, roomKey, roomDescription, roomImage?,
    specialRequest?, primaryGuestFullName, primaryGuestPhoneNumber,
    checkin, checkout, guests, baseRateInCurrency, includedTaxesAndFeesInCurrency,
    sessionId
  }
  ```
- `GET /bookings/me` (auth)

Payments:
- `POST /payments/checkout` body: `{ items: PaymentItem[], userId }`
- `POST /payments/success` body: `{ sessionId }`
- `POST /payments/mock-success` (test/jest only)

Health:
- `GET /health`

---

## Deployment

### 1) Provision PostgreSQL on Railway
- Create a PostgreSQL instance on Railway.
- Copy the connection URL and set it as `DATABASE_URL`.
- Optional: create a second DB for `DATABASE_TEST_URL`.

Apply migrations once (from local or a Railway shell):
```bash
cd apps/server
npx prisma migrate deploy
npx prisma generate
```

### 2) Deploy Backend on Railway
- Create a new Railway service from your GitHub repo (monorepo).
- Set service root to `apps/server` if Railway supports monorepo path selection.
- Build command: `npm run build`
- Start command: `npm run start` (or `npm run start:prod` to build then start)
- Environment variables (as above):
  - `PORT=3000`
  - `DATABASE_URL=...`
  - `JWT_SECRET=...`
  - `FRONTEND_URL=https://your-frontend.vercel.app`
  - `BASE_URL=https://your-backend.up.railway.app`
  - `STRIPE_KEY=sk_live_or_test_key`
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- Expose the service and note the public URL (use it as `BASE_URL` and in the frontend `VITE_API_URL`).

Notes:
- Ensure Prisma migrations are applied on first deploy (either via shell or Railway deploy hooks).
- Confirm CORS is working by setting `FRONTEND_URL` correctly.

### 3) Deploy Frontend on Vercel
- Import the repo into Vercel and set the project root to `apps/client`.
- Environment variables:
  - `VITE_API_URL=https://your-backend.up.railway.app/api`
- Build command: `npm run build`
- Output directory: `dist`
- `vercel.json` already configures SPA rewrites and long‑cache for assets.

Post-deploy:
- Verify email verification link resolves correctly (`BASE_URL` must be your Railway backend).
- Test login and that cookies are set with `Secure` and `SameSite=Strict` on HTTPS.

---

## Local vs Production URLs

- Local:
  - Frontend: `http://localhost:5173`
  - Backend: `http://localhost:3000` (API at `/api`)
- Production:
  - Frontend (Vercel): `https://your-frontend.vercel.app`
  - Backend (Railway): `https://your-backend.up.railway.app` (API at `/api`)

Ensure:
- Backend `FRONTEND_URL` = production frontend origin
- Backend `BASE_URL` = production backend base URL
- Frontend `VITE_API_URL` = `${BASE_URL}/api`

---

## Security Notes

- JWT tokens are stored in client cookies and sent via Authorization header to the backend.
- Cookies are set with `secure` in production and `sameSite='strict'`.
- Set a strong `JWT_SECRET` and keep `STRIPE_KEY`/SMTP credentials secret.
- CORS is restricted to `FRONTEND_URL` plus local dev.

---

## Scripts

Root:
```bash
npm start              # Run client + server concurrently
npm run dev:client     # Frontend only
npm run dev:server     # Backend only
npm run build          # Build both
npm run build:client   # Build frontend
npm run build:server   # Build backend
npm run install:all    # Install deps for root, client, server
```

Backend (`apps/server`):
```bash
npm run dev            # TS dev server
npm run build          # tsc
npm run start          # node dist/index.js
npm run start:prod     # build then start
npm test               # jest (backend)
```

Frontend (`apps/client`):
```bash
npm run dev            # Vite dev
npm run build          # tsc -b && vite build
npm run preview        # Vite preview
```

---

## Testing

...

---

## Troubleshooting

- CORS errors: Verify `FRONTEND_URL` matches your Vercel domain exactly.
- Verification email not sent: Check SMTP env vars and provider logs; ensure `BASE_URL` points to the live backend so the link resolves.
- Stripe errors: Verify `STRIPE_KEY` and allowed redirect URLs in Stripe dashboard.
- Prisma/DB errors: Confirm `DATABASE_URL` is correct and `prisma migrate deploy` has been run.
- Cookies not set in production: Use HTTPS domains; cookies use `secure` in production.
