This is a [Next.js](https://nextjs.org) project mainly focused on custom authentication.
This is a POC and learning record of application of:
1. Manual Login System with Email-Password
2. OAuth Authentication using: 
    1. Google
    2. Github
    3. Discord

### New Technologies Used
1. Redis (memory DB)
2. Docker
3. Postgres sql DB

## Set-up
1. First step
```bash
# to start docker and pull necessary images
docker-compose up -d
#to migrate postgres db
npm run db:migrate
# to view database
npm run db:studio
```

2. Create a .env file similar to .env.example file and fill all the details.

## Getting Started

First, run the development server:

```bash
# start the project
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
