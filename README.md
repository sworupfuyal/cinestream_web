# CineStream Web

A full-featured movie streaming platform built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. CineStream provides separate user and admin dashboards, movie browsing with filtering and sorting, personal lists (favorites & watch later), reviews, profile management, and a global dark/light theme system.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Development Server](#running-the-development-server)
- [Available Scripts](#available-scripts)
- [Architecture Overview](#architecture-overview)
- [Authentication & Authorization](#authentication--authorization)
- [Routing](#routing)
- [Theming](#theming)
- [Error Handling](#error-handling)
- [API Integration](#api-integration)

---

## Features

### Public
- Landing page with hero section, how-it-works, and why-choose-us sections
- User registration and login with form validation (Zod + React Hook Form)
- Forgot password / reset password flow

### User Dashboard
- Browse movies with **search**, **genre filtering**, and **sorting** (title, year, duration)
- View detailed movie pages with poster, description, genres, and metadata
- Add/remove movies to **Favorites** and **Watch Later** lists
- Submit and view **reviews** and **ratings** on movie pages
- Profile management with avatar upload
- Settings page with **dark/light theme toggle** and logout
- Responsive sidebar navigation with mobile drawer

### Admin Dashboard
- Dashboard overview with statistics (total users, movies, reviews)
- Full **CRUD** for movies (create, read, update, delete) with image uploads
- Movie list with search, genre filtering, sorting, and pagination
- Full **CRUD** for users (create, read, update, delete)
- User list with search and pagination
- Responsive sidebar navigation with mobile drawer

### UI/UX
- Fully **responsive** design from mobile to desktop
- Global **dark/light theme** with localStorage persistence and flash prevention
- Skeleton loading states on every route
- Error boundaries on every route with retry functionality
- Custom 404 not-found pages
- Toast notifications for user feedback

---

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5 |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS 4 |
| **Forms** | React Hook Form 7 + Zod 4 |
| **HTTP Client** | Axios |
| **Icons** | Lucide React |
| **Notifications** | React Toastify |
| **Video** | HLS.js |
| **Font** | Poppins (via next/font) |
| **Linting** | ESLint 9 + eslint-config-next |

---

## Project Structure

```
cinestream-web/
├── app/                          # Next.js App Router pages & layouts
│   ├── layout.tsx                # Root layout (ThemeProvider + AuthProvider)
│   ├── page.tsx                  # Landing page
│   ├── globals.css               # Global styles + light theme overrides
│   ├── error.tsx                 # Global error boundary
│   ├── loading.tsx               # Global loading state
│   ├── not-found.tsx             # Global 404 page
│   ├── (auth)/                   # Auth route group (login, signup, forgot/reset password)
│   │   ├── schema.ts             # Zod schemas for auth forms
│   │   ├── _components/          # Auth form components
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── reset-password/page.tsx
│   ├── admin/                    # Admin dashboard route group
│   │   ├── layout.tsx            # Admin layout (sidebar + header)
│   │   ├── page.tsx              # Admin dashboard (stats overview)
│   │   ├── _components/          # Admin-specific components
│   │   ├── movies/               # Movie CRUD pages
│   │   │   ├── page.tsx          # Movie list with filtering/sorting
│   │   │   ├── create/page.tsx   # Create movie form
│   │   │   └── [id]/edit/page.tsx # Edit movie form
│   │   └── users/                # User management pages
│   │       ├── page.tsx          # User list
│   │       ├── create/page.tsx   # Create user form
│   │       └── [id]/             # User detail & edit pages
│   ├── user/                     # User dashboard route group
│   │   ├── layout.tsx            # User layout (sidebar + header)
│   │   ├── _compoents/           # User-specific components
│   │   ├── dashboard/page.tsx    # Movie browsing with filters
│   │   ├── movies/[id]/page.tsx  # Movie detail page
│   │   ├── favorites/page.tsx    # Favorites list
│   │   ├── watchlater/page.tsx   # Watch later list
│   │   ├── profile/page.tsx      # Profile management
│   │   └── settings/page.tsx     # Theme toggle + logout
│   ├── components/               # Shared landing page components
│   │   ├── navbar/               # Navigation bar
│   │   ├── hero/                 # Hero section
│   │   ├── footer/               # Footer
│   │   └── ...                   # Other landing sections
│   └── api/                      # Next.js API routes
│       └── reviews/[movieId]/    # Reviews proxy endpoint
├── context/                      # React context providers
│   ├── AuthContext.tsx            # Authentication state management
│   └── ThemeContext.tsx           # Dark/light theme management
├── lib/                          # Shared utilities & data layer
│   ├── constants.ts              # API base URL constant
│   ├── cookie.ts                 # Cookie management (auth token, user data)
│   ├── api/                      # API client layer (axios calls)
│   │   ├── axios.ts              # Configured Axios instance with auth interceptor
│   │   ├── endpoints.ts          # Centralized API endpoint constants
│   │   ├── auth.ts               # Auth API functions
│   │   ├── public-movies.ts      # Public movie API functions
│   │   ├── user-list-api.ts      # User list API functions
│   │   └── admin/                # Admin-specific API functions
│   │       ├── movie-api.ts      # Movie CRUD API
│   │       └── user.ts           # User management API
│   └── actions/                  # Next.js Server Actions (use-case layer)
│       ├── auth-action.ts        # Auth server actions
│       ├── user-list-actions.ts  # User list server actions
│       └── admin/                # Admin server actions
│           ├── movie-action.ts   # Movie CRUD actions
│           └── user-action.ts    # User management actions
├── proxy.ts                      # Middleware for route protection & redirects
├── public/images/                # Static assets
├── scripts/seedMovies.js         # Database seeding script
└── config files                  # next.config.ts, tsconfig.json, eslint, postcss, etc.
```

---

## Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** (comes with Node.js)
- A running instance of the **CineStream backend API** (default: `http://localhost:6050`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd cinestream-web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:6050
```

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL | `http://localhost:6050` |

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create optimized production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint across the codebase |
| `npm run seed:movies` | Seed the database with sample movies |

---

## Architecture Overview

The project follows a **layered architecture** pattern adapted for Next.js:

```
┌─────────────────────────────────────────────┐
│          Presentation Layer (app/)           │
│   Pages, Layouts, Components, Forms          │
├─────────────────────────────────────────────┤
│        Application Layer (context/)          │
│   AuthContext, ThemeContext                   │
├─────────────────────────────────────────────┤
│      Use-Case Layer (lib/actions/)           │
│   Server Actions (business logic)            │
├─────────────────────────────────────────────┤
│     Data Access Layer (lib/api/)             │
│   Axios HTTP calls, endpoint constants       │
├─────────────────────────────────────────────┤
│    Infrastructure (lib/cookie.ts, proxy.ts)  │
│   Cookie management, middleware              │
└─────────────────────────────────────────────┘
```

**Data flow:** Page → Server Action → API function → Axios → Backend REST API

---

## Authentication & Authorization

- **JWT-based** authentication with tokens stored in HTTP-only cookies
- **Middleware** (`proxy.ts`) protects routes based on user role:
  - **Public routes** (`/login`, `/signup`, `/forgot-password`, `/reset-password`) — accessible without auth
  - **User routes** (`/user/*`) — require `user` or `admin` role
  - **Admin routes** (`/admin/*`) — require `admin` role only
- Authenticated users are redirected away from public auth pages
- Unauthenticated users are redirected to `/login` when accessing protected routes
- `AuthContext` provides global auth state (`user`, `isAuthenticated`, `logout`, `checkAuth`)

---

## Routing

The app uses **Next.js App Router** with the following route groups:

| Route Group | Path | Description |
|---|---|---|
| `(auth)` | `/login`, `/signup`, `/forgot-password`, `/reset-password` | Authentication pages |
| `admin` | `/admin`, `/admin/movies/*`, `/admin/users/*` | Admin dashboard & management |
| `user` | `/user/dashboard`, `/user/movies/*`, `/user/favorites`, `/user/watchlater`, `/user/profile`, `/user/settings` | User dashboard & features |

Each route group has its own layout with appropriate navigation (sidebar + header).

---

## Theming

CineStream supports **dark and light themes** via a custom `ThemeContext`:

- Theme is stored in `localStorage` under the key `cinestream-theme`
- A `data-theme` attribute on `<html>` drives CSS overrides in `globals.css`
- An inline script in the root layout prevents flash of wrong theme on page load
- Users can toggle the theme from the **Settings** page
- Admin and user headers also include a theme toggle button

---

## Error Handling

Every route segment has dedicated error handling files:

- **`error.tsx`** — Client-side error boundaries with retry buttons
- **`loading.tsx`** — Skeleton loaders matching the page layout for Suspense fallbacks
- **`not-found.tsx`** — Custom 404 pages with contextual navigation links

These exist at the global, admin, user, and individual route levels to provide granular, context-aware error recovery.

---

## API Integration

All backend communication goes through a centralized layer:

1. **Endpoints** (`lib/api/endpoints.ts`) — Single source of truth for all API URLs
2. **Axios Instance** (`lib/api/axios.ts`) — Pre-configured with base URL, auth interceptor, and credentials
3. **API Functions** (`lib/api/*.ts`) — Typed functions for each API call (auth, movies, users, lists)
4. **Server Actions** (`lib/actions/*.ts`) — Next.js server actions that orchestrate API calls, cookie management, and cache revalidation

The backend API runs on `http://localhost:6050` by default and handles:
- Auth (register, login, password reset, profile update)
- Movies (CRUD, genre listing, public browsing)
- Users (admin CRUD, listing)
- User Lists (favorites, watch later, status checks)
- Reviews (per-movie reviews)
