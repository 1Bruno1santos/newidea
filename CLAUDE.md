# DieselBot Dashboard - Project Documentation

## ⚠️ IMPORTANT GUIDELINES FOR DEVELOPMENT

### 🎨 Visual Layout Rules
- **DO NOT CHANGE** the general visual layout of the website
- Minor adjustments and improvements are acceptable
- Maintain the existing dark theme with emerald accents
- Keep the current design patterns and UI consistency

### 🔓 Development Mode
- We are in **DEVELOPMENT MODE** - no authentication procedures required
- Demo credentials (username: "demo", password: "demo") are sufficient
- No need to implement complex auth systems during development

### 🔑 Client Authentication System
- **Multi-client support** with username/password authentication
- Client credentials stored in `/data/clients.json`
- Available clients:
  - `admin/admin` - **Administrador com acesso total ao painel admin** (role: admin)
  - `demo/demo` - **Demo user com acesso admin** (IGG: 830555555, role: admin)
  - `client1/client1` - Cliente 1 (IGGs: 830123456, 830987654)
  - `client2/client2` - Cliente 2 (IGG: 830555555)
  - `bruno/bruno` - Bruno Santos (IGGs: 830123456, 830987654)
- Clients can only access their assigned IGG IDs
- Admin users can access all castles and the admin panel
- Client info stored in localStorage under key 'client'

### 🛡️ Admin Panel Access
- **Login with admin/admin or demo/demo** to get admin access
- After login, an **"Admin" button** appears in the dashboard header
- Click the Admin button to access the administrative panel at `/admin`
- Regular clients don't see the Admin button

### 🏰 Castle System Architecture (UPDATED!)
- **Dynamic Castle Loading**: Castles are loaded from the configured directory path
- **Config Path Setting**: Set via Admin → Settings → Config Path
- **IGG IDs as URLs**: Routes now use IGG IDs instead of castle names (`/dashboard/830123456`)
- **Automatic Filtering**: Clients only see castles matching their assigned IGG IDs
- **Path Conversion**: Windows paths automatically converted to WSL format when needed
- **Expected Structure**:
  ```
  /config-path/
  ├── 830123456/         # IGG ID as folder name
  │   └── settings.json  # Castle configuration
  ├── 830987654/
  │   └── settings.json
  └── 830555555/
      └── settings.json
  ```

### 📂 System Settings Storage
- **Config Path**: Stored in `/data/system-settings.json`
- **Persistence**: Settings survive server restarts
- **API Access**: GET/POST `/api/settings` for config management
- **Git Ignored**: system-settings.json is not committed

### 📋 Session Protocol
- **ALWAYS READ THIS CLAUDE.MD FILE** at the beginning of each new session
- This ensures consistency and awareness of project guidelines
- Update this file with any significant changes or new patterns

### 🗄️ Database Configuration
- **Database**: PostgreSQL (Supabase)
- **Connection String**: `DATABASE_URL="postgresql://postgres:Bz916444389@db.ynerykeqaycpcgssrqrg.supabase.co:5432/postgres"`
- **Prisma ORM** configured with complete schema:
  - Customer (clientes)
  - Bot (assinaturas de bots)
  - BotRenewal (histórico de renovações)
  - Notification (sistema de notificações)
  - SystemSettings (configurações do sistema)
  - ActivityLog (logs de auditoria)
- **Note**: Database ready but using JSON files for development mode

### 🚀 Deployment Information
- **Platform**: Vercel
- **Production URL**: https://newidea-orpin.vercel.app
- **GitHub Repository**: https://github.com/1Bruno1santos/newidea
- Auto-deploys on push to main branch

---

## 🆕 ADMIN PANEL IMPLEMENTATION

### Overview
Complete administrative panel implemented at `/admin` with full CRM functionality for managing customers and bot subscriptions.

### Admin Features Implemented

#### 1. Dashboard (`/admin`)
- **Statistics Cards**: Active customers, Active bots, Expired bots, Monthly revenue
- **Revenue Chart**: Last 6 months visualization
- **Recent Activities**: Renewals, new customers, expirations
- **Additional Metrics**: Renewal rate, expiring bots forecast

#### 2. Customer Management (`/admin/users`)
- **Customer List**: Search, filter, and view all customers
- **Create Customer**: Add new customers with unique codes (CLIENTE_001, etc.)
- **Customer Details** (`/admin/users/[id]`):
  - Contact information (name, email, WhatsApp)
  - Bot subscriptions management
  - Statistics (active/expired bots, monthly value)
  - Complete CRUD operations

#### 3. Bot Management (UPDATED!)
- **Add Bot**: Castle ID, IGG ID, plan selection
- **Plan Types**: Monthly (R$150), Quarterly (R$400), Semi-annual (R$750), Annual (R$1400)
- **Bot Actions**: 
  - **Renew/Reactivate**: Extend subscription period
  - **Pause**: Temporarily suspend bot
  - **Edit**: Modify bot details
  - **Cancel**: Mark as cancelled (keeps in records)
  - **Remove Completely** (NEW!): Permanently delete from customer record
- **Renewal History**: Track all renewals with dates and prices
- **Status Tracking**: Active, Expired, Paused, Cancelled
- **Visual Indicators**: Color-coded actions (orange for cancel, red for delete)

#### 4. Notifications (`/admin/notifications`)
- **Send Notifications**: Manual messages to customers
- **Channels**: WhatsApp (wa.me links), Email, SMS
- **Types**: Renewal reminders, Expiration warnings, Payment pending, General
- **Status Tracking**: Pending, Sent, Failed
- **Automatic Reminders**: Configured for 30, 15, 7, 1 days before expiration

#### 5. System Settings (`/admin/settings`)
- **Config Path** (FUNCTIONAL!): 
  - Set the directory where castle folders are located
  - Path is saved in `/data/system-settings.json`
  - Validates and tests path before saving
  - Automatic Windows → WSL path conversion
- **General Settings**: System language, maintenance mode, backup settings
- **Integrations**: Telegram bot token, WhatsApp API configuration
- **Notification Settings**: Auto-reminder days, notification preferences

### Technical Implementation Details

#### Auth Module Separation
- `lib/auth-server.ts` - Server-side functions (fs imports)
- `lib/auth-client.ts` - Client-side functions (browser-safe)
- `lib/auth-types.ts` - Shared TypeScript interfaces
- `lib/auth.ts` - Re-exports for backward compatibility

#### API Routes Structure
- `/api/auth/login` - User authentication
- `/api/settings` - GET/POST config path management
- `/api/castles/list` - Dynamic castle listing from config directory
- `/api/admin/*` - Admin-specific endpoints (future)

#### Dynamic Castle Loading System
- Reads castle directories from configured path
- Filters by numeric folder names (IGG IDs)
- Attempts to read settings.json for castle details
- Falls back to defaults if settings.json missing
- Multi-tenant filtering based on client's IGG IDs

---

## Tech Stack
- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript
- **UI Framework**: React 19
- **Styling**: Tailwind CSS
- **Component Library**: Radix UI (shadcn/ui components)
- **Animation**: Framer Motion
- **Database ORM**: Prisma (configured, ready for production)
- **Bot Integration**: Telegraf (Telegram Bot Framework)
- **Icons**: Lucide React

## Project Structure
```
newidea/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── castles/      # Castle management
│   │   │   └── list/     # Dynamic castle listing
│   │   ├── settings/     # System settings API
│   │   └── telegram-webhook/  # Telegram bot webhook
│   ├── admin/            # Admin panel
│   │   ├── layout.tsx    # Admin layout with sidebar
│   │   ├── page.tsx      # Dashboard with statistics
│   │   ├── users/        # Customer management
│   │   │   ├── page.tsx  # Customer list
│   │   │   └── [id]/     # Customer details
│   │   │       └── page.tsx
│   │   ├── notifications/ # Notification center
│   │   └── settings/     # System settings
│   ├── dashboard/         # Protected dashboard routes
│   │   ├── [castle]/     # Dynamic castle pages (NOW USES IGG IDs!)
│   │   │   ├── (20+ feature pages...)
│   │   └── components/    # Dashboard components
│   │       ├── castle-list.tsx # Dynamic castle loader
│   │       └── admin-link.tsx # Admin button
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Login page
├── components/            # Shared components
│   └── ui/               # UI components (shadcn/ui)
├── hooks/                # Custom React hooks
│   └── use-toast.ts      # Toast notifications
├── lib/                  # Utility functions
│   ├── auth.ts          # Client auth exports
│   ├── auth-client.ts   # Browser-safe auth
│   ├── auth-server.ts   # Server-side auth
│   ├── auth-types.ts    # Shared types
│   └── database.ts      # Prisma client
├── prisma/
│   └── schema.prisma    # Database schema
├── utils/                # Helper functions
└── data/                 # Data files
    ├── clients.json     # Client credentials
    ├── castles.json     # Castle information (mock)
    └── system-settings.json # Config path storage (git ignored)
```

## Current Project Status

### ✅ Completed
1. **Basic Authentication System** - Simple JSON-based login
2. **Multi-tenant Dashboard** - Clients see only their castles
3. **Admin Panel** - Complete CRM system for customer/bot management
4. **Role-based Access** - Admin users get extra features
5. **Database Schema** - Prisma configured and ready
6. **Dynamic Castle Loading** - Reads from configured directory
7. **Config Path Management** - Settable via admin panel
8. **Bot Removal Feature** - Complete deletion from customer records
9. **Build Optimizations** - All deployment issues resolved

### 🚧 In Progress
1. **Castle Feature Pages** - Structure exists, need implementation
2. **Settings.json Read/Write** - API routes for castle configuration

### 📋 Next Steps
1. **Implement Castle Features** - Make each page functional
2. **Connect to Real Database** - Run migrations for production
3. **Real WhatsApp Integration** - Replace wa.me links
4. **Automated Tasks** - Cron jobs for reminders
5. **Payment Gateway** - Integrate payment processing

## Important Files
- `app/page.tsx` - Login page
- `app/admin/*` - Admin panel pages
- `app/dashboard/components/castle-list.tsx` - Dynamic castle loader
- `app/api/settings/route.ts` - Config path API
- `app/api/castles/list/route.ts` - Castle listing API
- `lib/auth-*.ts` - Authentication modules
- `prisma/schema.prisma` - Database schema
- `data/clients.json` - User credentials
- `data/system-settings.json` - Config storage

## Recent Updates (2025-01-21)
- **Dynamic Castle System**: Replaced hardcoded castles with directory-based loading
- **Config Path API**: Functional settings management
- **URL Structure Change**: Now uses IGG IDs instead of castle names
- **Bot Removal Feature**: Added "Remove Completely" action
- **Path Conversion**: Automatic Windows → WSL conversion
- **Build Fixes**: Resolved all deployment issues
- **localStorage Fix**: Corrected key from 'clientInfo' to 'client'

## Development Commands
```bash
# Install dependencies
npm install

# Run development server (default port 3000)
npm run dev

# Run on custom port (Windows)
set PORT=4002 && npm run dev

# Run on custom port (Mac/Linux)
PORT=4002 npm run dev

# Build for production
npm run build

# Git operations
git pull                    # Get latest changes
git add .                   # Stage all changes
git commit -m "message"     # Commit changes
git push origin main        # Push to GitHub

# Database (when ready)
npx prisma migrate dev      # Run migrations
npx prisma generate         # Generate client
```

## How to Test Locally
1. Clone: `git clone https://github.com/1Bruno1santos/newidea.git`
2. Install: `cd newidea && npm install`
3. Run: `npm run dev` or `set PORT=4002 && npm run dev`
4. Access: `http://localhost:3000` or `http://localhost:4002`
5. Login: Use admin/admin or demo/demo
6. Configure: Go to Admin → Settings → Set config path
7. Test: Castles will load from your configured directory

## How to Access Admin Panel
1. Go to https://newidea-orpin.vercel.app or localhost
2. Login with **admin/admin** or **demo/demo**
3. Click the **"Admin"** button in the dashboard header
4. Access full admin features at `/admin`

---

**Last Updated**: 2025-01-21 (Session 2)
**Updated By**: Claude with Bruno
**Status**: Development Mode - Dynamic Castle System Implemented