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

### 📂 JSON File Bridge Architecture
- **Website acts as a bridge** between UI and JSON files
- **We do NOT create or manage client folders/settings files**
- Client folders with settings.json are provided externally
- Our role: Read and write to existing JSON files only
- Expected structure (managed externally):
  ```
  /client-data-path/
  ├── 830123456/
  │   └── settings.json
  ├── 830987654/
  │   └── settings.json
  └── 830555555/
      └── settings.json
  ```

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

## 🆕 ADMIN PANEL IMPLEMENTATION (NEW!)

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

#### 3. Bot Management
- **Add Bot**: Castle ID, IGG ID, plan selection
- **Plan Types**: Monthly (R$150), Quarterly (R$400), Semi-annual (R$750), Annual (R$1400)
- **Bot Actions**: Renew, Pause, Cancel, Edit
- **Renewal History**: Track all renewals with dates and prices
- **Status Tracking**: Active, Expired, Paused, Cancelled

#### 4. Notifications (`/admin/notifications`)
- **Send Notifications**: Manual messages to customers
- **Channels**: WhatsApp (wa.me links), Email, SMS
- **Types**: Renewal reminders, Expiration warnings, Payment pending, General
- **Status Tracking**: Pending, Sent, Failed
- **Automatic Reminders**: Configured for 30, 15, 7, 1 days before expiration

#### 5. System Settings (`/admin/settings`)
- **Config Path**: Dynamic configuration path for castle settings files
- **General Settings**: System language, maintenance mode, backup settings
- **Integrations**: Telegram bot token, WhatsApp API configuration
- **Notification Settings**: Auto-reminder days, notification preferences

### Technical Implementation Details

#### Auth Module Separation
- `lib/auth-server.ts` - Server-side functions (fs imports)
- `lib/auth-client.ts` - Client-side functions (browser-safe)
- `lib/auth-types.ts` - Shared TypeScript interfaces
- `lib/auth.ts` - Re-exports for backward compatibility

#### Mock Data Structure
All admin features use mock data in development mode:
- Customer data with bot subscriptions
- Revenue statistics and charts
- Notification queue simulation
- System settings persistence

#### UI Components
- All built with shadcn/ui components
- Consistent dark theme with emerald accents
- Responsive design for mobile/desktop
- Toast notifications for user feedback

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
│   │   │   └── login/    # Client login validation
│   │   └── telegram-webhook/  # Telegram bot webhook endpoint
│   ├── admin/            # ADMIN PANEL (NEW!)
│   │   ├── layout.tsx    # Admin layout with sidebar
│   │   ├── page.tsx      # Dashboard with statistics
│   │   ├── users/        # Customer management
│   │   │   ├── page.tsx  # Customer list
│   │   │   └── [id]/     # Customer details
│   │   │       └── page.tsx
│   │   ├── notifications/ # Notification center
│   │   │   └── page.tsx
│   │   └── settings/     # System settings
│   │       └── page.tsx
│   ├── dashboard/         # Protected dashboard routes
│   │   ├── [castle]/     # Dynamic castle pages
│   │   │   ├── (20+ feature pages...)
│   │   └── components/    # Dashboard components
│   │       └── admin-link.tsx # Admin button (NEW!)
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
    └── castles.json     # Castle information
```

## Current Project Status

### ✅ Completed
1. **Basic Authentication System** - Simple JSON-based login
2. **Multi-tenant Dashboard** - Clients see only their castles
3. **Admin Panel** - Complete CRM system for customer/bot management
4. **Role-based Access** - Admin users get extra features
5. **Database Schema** - Prisma configured and ready
6. **Mock Data System** - Development mode with JSON files
7. **UI/UX Polish** - Consistent dark theme throughout

### 🚧 In Progress
1. **Castle Feature Pages** - Structure exists, need implementation
2. **Settings.json Integration** - API routes for reading/writing castle configs

### 📋 Next Steps
1. **Connect to Real Database** - Run migrations when ready for production
2. **Implement Castle Features** - Make each castle management page functional
3. **Real WhatsApp Integration** - Replace wa.me links with API
4. **Automated Tasks** - Cron jobs for renewal reminders
5. **Payment Gateway** - Integrate payment processing

## Important Files
- `app/page.tsx` - Login page with client authentication
- `app/admin/*` - Complete admin panel implementation
- `app/dashboard/[castle]/page.tsx` - Castle dashboard
- `lib/auth-*.ts` - Authentication module (separated for build optimization)
- `prisma/schema.prisma` - Complete database schema
- `data/clients.json` - Client credentials with admin roles
- `data/castles.json` - Castle information

## Recent Updates (2024-01-21)
- **Admin Panel Created**: Full CRM system at `/admin`
- **Customer Management**: CRUD operations with bot subscriptions
- **Notification System**: Customer communication center
- **System Settings**: Dynamic config path management
- **Auth Module Split**: Fixed build errors by separating server/client code
- **Role-based Access**: Admin button appears for admin/demo users
- **Prisma Integration**: Database schema ready for production
- **Build Fixes**: Resolved all Vercel deployment issues

## Development Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run database migrations (when ready)
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
```

## How to Access Admin Panel
1. Go to https://newidea-orpin.vercel.app
2. Login with **admin/admin** or **demo/demo**
3. Click the **"Admin"** button in the dashboard header
4. Access full admin features at `/admin`

---

**Last Updated**: 2024-01-21
**Updated By**: Claude with Bruno
**Status**: Development Mode - Admin Panel Fully Implemented