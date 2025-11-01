


# Dashboard App

A modern, full-featured dashboard application built with Next.js and TypeScript. This project demonstrates role-based access control, user authentication, and data visualization.

## What I Built

This dashboard started as a learning project and evolved into something I'm really proud of. It has four different user experiences depending on who logs in:

- **Admin Dashboard** (red theme) - Full system access with revenue tracking and user management
- **Manager Dashboard** (blue theme) - Team performance monitoring and goal tracking
- **Developer Dashboard** (green theme) - Code metrics, bug tracking, and project stats
- **User Dashboard** (purple theme) - Personal progress and achievements

## Key Features

- **Authentication System** - Login, registration, and protected routes
- **Role-Based Dashboards** - Each user type sees a completely different interface
- **User Management** - Full CRUD operations for managing team members
- **Analytics** - Interactive charts with time-based filters (24h, 7d, 30d, 90d)
- **Persistent Data** - Uses localStorage to save user data and sessions
- **German Business Theme** - All data uses German locations, Euro currency, and .de emails

## Demo Accounts

Try these different roles:
- Admin: `admin@example.de` / `admin123`
- Manager: `user@example.de` / `user123`
- Developer: `demo@example.de` / `demo123`

Or just register your own account!

## Tech Stack

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Recharts for data visualization
- Lucide React for icons

## Running Locally
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're good to go.

## What I Learned

This was my first real dive into building a full-stack-ish application. I learned a ton about:
- User authentication and session management
- Building dynamic UIs that change based on user roles
- Working with TypeScript and proper data structures
- Creating responsive designs that work everywhere
- Managing state across an entire application

## Future Ideas

If I keep working on this, I'd love to add:
- Dark mode
- Real backend integration
- Email notifications
- Mobile app version
- More detailed analytics

---

Built as a learning project to understand modern web development. Feel free to explore the code!
