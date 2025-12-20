This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Environment Variables for Vercel Deployment

For proper deployment to Vercel, you need to set the following environment variables:

1. `DATABASE_URL`: For production deployment, you'll need to use a proper database service like Vercel Postgres, Supabase, or another PostgreSQL/MySQL service
2. `BETTER_AUTH_SECRET`: Set this to a secure random string for production

Example environment variables for Vercel:
```
DATABASE_URL=postgresql://username:password@host:port/database_name
BETTER_AUTH_SECRET=your-super-secret-jwt-key-change-in-production
```

**Important**: SQLite databases don't work well in serverless environments like Vercel. For production deployment, you should migrate to a proper database service like PostgreSQL or MySQL.

## Local Development

For local development, you can run:
```bash
npm run dev
```
