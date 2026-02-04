# DevEvent

A modern developer event discovery platform built with Next.js 16. Browse, explore, and book spots for tech events like conferences, meetups, and hackathons.

## Features

- **Event Discovery** - Browse featured tech events with a sleek, modern UI
- **Event Details** - View comprehensive event information including venue, schedule, and agenda
- **Booking System** - Reserve spots with email validation and duplicate prevention
- **Similar Events** - Discover related events based on shared tags
- **Analytics** - PostHog integration for user behavior tracking
- **Responsive Design** - Mobile-first approach with Tailwind CSS

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | MongoDB (Mongoose) |
| UI Components | shadcn/ui |
| Icons | Lucide React |
| Analytics | PostHog |
| Image Hosting | Cloudinary |
| WebGL Effects | OGL |

## Prerequisites

- Node.js 18.17 or later
- MongoDB database (local or Atlas)
- Cloudinary account (for image uploads)
- PostHog account (optional, for analytics)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/talkfelipe/nextjs_event_platform.git
cd nextjs_event_platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

# Cloudinary
CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>

# PostHog Analytics (optional)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/events/         # Event API routes
│   ├── events/[slug]/      # Event details page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── BookEvent.tsx       # Booking form
│   ├── EventCard.tsx       # Event card display
│   ├── LightRays.tsx       # WebGL background
│   ├── Navbar.tsx          # Navigation header
│   └── ui/                 # shadcn/ui components
├── database/               # Mongoose models
│   ├── event.model.ts      # Event schema
│   └── booking.model.ts    # Booking schema
├── lib/                    # Utilities
│   ├── mongodb.ts          # Database connection
│   ├── constants.ts        # Sample data
│   └── actions/            # Server actions
└── public/                 # Static assets
    ├── images/             # Event images
    └── icons/              # SVG icons
```

## API Routes

### Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | Fetch all events |
| POST | `/api/events` | Create a new event |
| GET | `/api/events/[slug]` | Fetch event by slug |

### Creating an Event

```bash
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "React Conference 2025",
    "description": "Annual React developer conference",
    "overview": "Join us for the biggest React event of the year",
    "image": "https://example.com/image.jpg",
    "venue": "Convention Center",
    "location": "San Francisco, CA",
    "date": "2025-06-15",
    "time": "09:00 AM",
    "mode": "hybrid",
    "audience": "React developers",
    "agenda": ["Keynote", "Workshops", "Networking"],
    "organizer": "React Community",
    "tags": ["react", "javascript", "frontend"]
  }'
```

## Database Schema

### Event

| Field | Type | Description |
|-------|------|-------------|
| title | String | Event name |
| slug | String | URL-friendly identifier (auto-generated) |
| description | String | Short description |
| overview | String | Detailed overview |
| image | String | Cloudinary image URL |
| venue | String | Venue name |
| location | String | City/address |
| date | String | ISO format (YYYY-MM-DD) |
| time | String | Time (HH:MM AM/PM) |
| mode | Enum | online, offline, or hybrid |
| audience | String | Target audience |
| agenda | [String] | Event agenda items |
| organizer | String | Organizer name |
| tags | [String] | Event categories |

### Booking

| Field | Type | Description |
|-------|------|-------------|
| eventId | ObjectId | Reference to Event |
| email | String | Attendee email (validated) |

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Performance Features

- React Compiler for automatic memoization
- Turbopack file system caching
- React Server Components
- Next.js Image optimization with Cloudinary CDN
- Cached MongoDB connections
- Suspense boundaries for streaming

## Deploy on Vercel

The easiest way to deploy this app is with [Vercel](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

MIT
