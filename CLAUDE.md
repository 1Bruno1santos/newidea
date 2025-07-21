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
  - `demo/demo` - Demo user (IGG: 830555555)
  - `client1/client1` - Cliente 1 (IGGs: 830123456, 830987654)
  - `client2/client2` - Cliente 2 (IGG: 830555555)
  - `bruno/bruno` - Bruno Santos (IGGs: 830123456, 830987654)
- Clients can only access their assigned IGG IDs
- Client info stored in localStorage after login

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

### 🗄️ Database Configuration (For Future Use)
- **Database**: PostgreSQL (Supabase)
- **Connection String**: `DATABASE_URL="postgresql://postgres:Bz916444389@db.ynerykeqaycpcgssrqrg.supabase.co:5432/postgres"`
- **Note**: Database integration will be implemented when needed
- Currently using hardcoded data for development

### 🚀 Deployment Information
- **Platform**: Vercel
- **Auto-deploy URL**: https://api.vercel.com/v1/integrations/deploy/prj_GXpX1jfuDxcYbmScAYk65NgUCYiA/WxvsAFQHTQ
- **GitHub Repository**: https://github.com/1Bruno1santos/newidea
- Auto-deploys on push to main branch

---

## Project Overview
DieselBot Dashboard is a Next.js 15 gaming management application with Telegram bot integration. It provides a web interface for managing game castles, resources, and various game features with multi-language support (PT/EN).

## Tech Stack
- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript
- **UI Framework**: React 19
- **Styling**: Tailwind CSS
- **Component Library**: Radix UI (shadcn/ui components)
- **Animation**: Framer Motion
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
│   ├── dashboard/         # Protected dashboard routes
│   │   ├── [castle]/     # Dynamic castle pages (will be [iggId])
│   │   │   ├── aceleradores/    # Accelerators management
│   │   │   ├── admin/           # Admin panel
│   │   │   ├── caca/            # Hunting feature
│   │   │   ├── coleta/          # Collection feature
│   │   │   ├── coliseu/         # Coliseum
│   │   │   ├── construcoes/     # Buildings
│   │   │   ├── diversos/        # Miscellaneous
│   │   │   ├── envio-recursos/  # Resource sending
│   │   │   ├── escudos/         # Shields
│   │   │   ├── eventos/         # Events
│   │   │   ├── familiares/      # Familiars
│   │   │   ├── fg/              # FG feature
│   │   │   ├── herois/          # Heroes
│   │   │   ├── ninhos/          # Nests
│   │   │   ├── pesquisa/        # Research
│   │   │   ├── reino-miragem/   # Mirage Kingdom
│   │   │   ├── sets/            # Equipment sets
│   │   │   ├── trocas-extravagante/ # Extravagant trades
│   │   │   ├── trocas-navio/    # Ship trades
│   │   │   └── tropas/          # Troops
│   │   └── components/    # Dashboard components
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Login page
├── components/            # Shared components
│   ├── ui/               # UI components (shadcn/ui)
│   └── castle-page-navigation.tsx
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   └── auth.ts          # Authentication utilities
├── utils/                # Helper functions
└── data/                 # Data files
    └── clients.json     # Client credentials and IGG assignments
```

## Key Features

### Authentication
- Multi-client authentication system
- Credentials validated against `/data/clients.json`
- Each client has assigned IGG IDs
- Session stored in localStorage
- Protected dashboard shows only client's IGG IDs

### Multi-language Support
- Portuguese (PT) and English (EN)
- Language switcher in login page
- Translations object in components

### Castle Management
- Multiple castle support
- Each castle has:
  - Name, level, power, troops
  - Individual management pages for different game features
  - Navigation between castle features

### Telegram Bot Integration
- Webhook endpoint at `/api/telegram-webhook`
- Telegraf framework for bot commands
- Environment variable for BOT_TOKEN

## Environment Variables
```bash
# .env.local
BOT_TOKEN=your_telegram_bot_token_here
```

## Development Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Key Components

### Login Page (`app/page.tsx`)
- Multi-language support
- Form validation
- Toast notifications for errors
- Redirects to dashboard on successful login

### Dashboard Layout
- Sidebar with castle list
- Main content area
- Responsive design

### Castle Pages
- Dynamic routing with `[castle]` parameter
- Individual pages for each game feature
- Consistent navigation component
- Framer Motion animations

## Styling Guidelines
- Dark theme with black background
- Emerald-500 as primary accent color
- Zinc color palette for neutral elements
- Consistent spacing and rounded corners
- Glass morphism effects with backdrop blur

## State Management
- Client-side state with React hooks
- No global state management needed
- Form state handled locally in components

## API Structure
- Next.js API routes in `app/api/`
- Authentication endpoint: `/api/auth/login`
- Telegram webhook handles bot updates
- All routes use App Router conventions
- Planned routes:
  - `/api/castle/[iggId]` - Read/write settings.json
  - `/api/client/[clientId]/castles` - Get client's IGG IDs

## Component Patterns
- Use "use client" directive for client components
- Consistent prop interfaces
- TypeScript for type safety
- Responsive design with Tailwind classes

## Security Considerations
- Environment variables for sensitive data
- Basic authentication (should be replaced in production)
- HTTPS required for Telegram webhooks

## Deployment Notes
- Optimized for Vercel deployment
- Requires environment variables setup
- Telegram webhook URL must be configured
- Next.js configuration ignores TypeScript/ESLint errors (development mode)

## Future Improvements
- Implement proper authentication system
- Add database integration
- Enhance Telegram bot functionality
- Add real-time updates
- Implement proper error handling
- Add comprehensive testing

## Common Tasks

### Adding a New Castle Feature
1. Create new page in `app/dashboard/[castle]/feature-name/page.tsx`
2. Add navigation link in castle page
3. Implement feature-specific UI and logic
4. Update navigation utils if needed

### Modifying UI Components
- All UI components are in `components/ui/`
- Based on shadcn/ui and Radix UI
- Maintain consistent styling with existing components

### Working with Translations
- Add new keys to translation objects
- Keep translations consistent across components
- Test both language versions

## Important Files
- `app/page.tsx` - Login page with client authentication
- `app/dashboard/[castle]/page.tsx` - Castle dashboard (to be [iggId])
- `components/ui/` - All UI components
- `utils/navigation.ts` - Navigation utilities
- `app/api/telegram-webhook/route.ts` - Bot webhook handler
- `app/api/auth/login/route.ts` - Client authentication endpoint
- `lib/auth.ts` - Authentication utilities and session management
- `data/clients.json` - Client credentials and IGG assignments

## Recent Updates
- **Client Authentication**: Implemented multi-client login system
- **JSON Bridge Architecture**: Established pattern for reading/writing external JSON files
- **Session Management**: Client info stored in localStorage after login
- **API Routes**: Created authentication endpoint for client validation

## Next Steps
- Update dashboard to show client-specific IGG IDs
- Create API routes for reading/writing settings.json files
- Connect existing castle pages to JSON file data
- Add client management interface in admin panel