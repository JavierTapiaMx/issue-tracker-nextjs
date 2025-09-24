# Issue Tracker

A modern issue tracking application built with Next.js, featuring authentication, real-time updates, and a clean UI for managing project issues.

## 🚀 Features

- **Issue Management**: Create, edit, delete, and track issues with status and priority levels
- **Authentication**: Secure user authentication powered by Clerk
- **Real-time Data**: Built with tRPC for type-safe API calls and real-time updates
- **Modern UI**: Clean, responsive interface using Tailwind CSS and Radix UI components
- **Database**: MySQL database with Drizzle ORM for type-safe database operations
- **Dashboard**: Visual charts and summaries of issue statistics
- **Dark/Light Mode**: Theme toggle with system preference detection
- **Error Tracking**: Integrated Sentry for production error monitoring
- **Responsive Design**: Mobile-friendly interface that works across all devices

## 🛠 Tech Stack

- **Framework**: [Next.js 15.5.2](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MySQL](https://www.mysql.com/) with [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [Clerk](https://clerk.com/)
- **API**: [tRPC](https://trpc.io/) for type-safe APIs
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)
- **Charts**: [Recharts](https://recharts.org/)
- **Editor**: [SimpleMDE Markdown Editor](https://github.com/sparksuite/simplemde-markdown-editor)
- **Monitoring**: [Sentry](https://sentry.io/)
- **Icons**: [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or later
- **npm**, **yarn**, **pnpm**, or **bun**
- **MySQL** database server

## 🚦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/JavierTapiaMx/issue-tracker-nextjs.git
cd issue-tracker-nextjs
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# MySQL database connection string
DATABASE_URL="mysql://username:password@localhost:3306/your_database_name"

# Clerk project configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

# Optional: Sentry configuration (for error tracking)
SENTRY_DSN="your_sentry_dsn"
```

### 4. Database Setup

Run the database migrations using Drizzle:

```bash
npx drizzle-kit migrate
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
├── app/                    # Next.js app directory (App Router)
│   ├── api/               # API routes and tRPC handler
│   ├── issues/            # Issue-related pages
│   │   ├── [id]/         # Dynamic issue detail pages
│   │   ├── new/          # Create new issue page
│   │   └── page.tsx      # Issues list page
│   ├── globals.css        # Global styles and Tailwind directives
│   ├── layout.tsx         # Root layout component
│   └── page.tsx          # Dashboard/home page
├── components/            # Reusable UI components
│   ├── Issues/           # Issue-specific components
│   ├── Users/            # User-related components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── NavBar.tsx        # Navigation component
│   ├── Pagination.tsx    # Pagination component
│   └── ThemeToggle.tsx   # Dark/light theme toggle
├── db/                   # Database configuration and schema
│   ├── drizzle.ts        # Drizzle database connection
│   └── schema.ts         # Database schema definitions
├── drizzle/              # Database migrations
├── hooks/                # Custom React hooks
│   ├── useIssues.ts      # Issues data fetching hook
│   └── useUsers.ts       # Users data fetching hook
├── lib/                  # Utility functions and validations
│   ├── utils.ts          # General utility functions
│   └── validations/      # Zod validation schemas
├── providers/            # React context providers
│   ├── authProvider.tsx  # Clerk auth provider wrapper
│   ├── themeProvider.tsx # Next-themes provider
│   ├── toastProvider.tsx # Toast notifications provider
│   └── trpcProvider.tsx  # tRPC provider setup
├── server/               # tRPC server setup
│   ├── context.ts        # tRPC context creation
│   ├── root.ts          # Root tRPC router
│   ├── trpc.ts          # tRPC server configuration
│   └── routers/         # API route handlers
├── trpc/                 # tRPC client configuration
└── types/                # TypeScript type definitions
```

## 🎯 Usage

### Creating Issues

1. Navigate to `/issues/new`
2. Fill in the issue title, description (with Markdown support), and priority
3. Assign the issue to a user (optional)
4. Click "Create Issue" to save

### Managing Issues

- **View All Issues**: Visit `/issues` to see all issues with filtering, sorting, and pagination
- **Issue Details**: Click on any issue title to view full details
- **Edit Issues**: Use the "Edit" button on individual issue pages
- **Delete Issues**: Use the delete button (with confirmation dialog)
- **Filter Issues**: Use the status filter dropdown to view specific issue types
- **Assign Users**: Use the assignee dropdown to assign issues to team members

### Dashboard Features

Visit the home page (`/`) to see:

- **Issue Summary Cards**: Quick overview of total, open, in-progress, and closed issues
- **Visual Charts**: Pie chart showing issue distribution by status
- **Latest Issues**: Recent issues with quick access links

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks
- `npx drizzle-kit generate` - Generate new database migrations
- `npx drizzle-kit migrate` - Apply database migrations
- `npx drizzle-kit studio` - Open Drizzle Studio for database management

## 🎨 Customization

### Theme Configuration

The project supports dark/light mode with system preference detection. Theme configuration is handled in:

- `app/globals.css` - CSS custom properties and theme variables
- `components/ThemeToggle.tsx` - Theme switching component
- `providers/themeProvider.tsx` - Theme context provider

### Adding New Issue Statuses

1. Update the `IssueStatus` enum in `db/schema.ts`
2. Generate a new migration: `npx drizzle-kit generate`
3. Apply the migration: `npx drizzle-kit migrate`
4. Update the status badge component in `components/Issues/IssueStatusBadge.tsx`

### Custom UI Components

The project uses shadcn/ui components which can be customized by:

1. Modifying component files in `components/ui/`
2. Updating the theme configuration in `tailwind.config.js`
3. Adjusting CSS custom properties in `app/globals.css`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `SENTRY_DSN` (optional)
4. Deploy automatically on every push to main branch

### Other Platforms

The application can be deployed to any platform supporting Next.js:

**Railway, Render, or DigitalOcean:**

1. Set up your environment variables
2. Ensure your MySQL database is accessible
3. Build the application: `npm run build`
4. Start with: `npm start`

**Docker Deployment:**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🛠 Development

### Database Management

- **View Database**: Use `npx drizzle-kit studio` to open a visual database browser
- **Create Migrations**: After schema changes, run `npx drizzle-kit generate`
- **Apply Migrations**: Run `npx drizzle-kit migrate` to update the database

### Code Quality

- **ESLint**: Run `npm run lint` to check for code issues
- **Prettier**: Configured with Tailwind CSS plugin for consistent formatting
- **TypeScript**: Full type safety across the application

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the existing code style
4. Run tests and linting (`npm run lint`)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use proper component composition
- Implement proper error handling
- Add appropriate loading states
- Ensure responsive design
- Write meaningful commit messages

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/JavierTapiaMx/issue-tracker-nextjs/issues) page
2. Search existing issues before creating a new one
3. Provide detailed information including:
   - Node.js version
   - Operating system
   - Error messages
   - Steps to reproduce

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
