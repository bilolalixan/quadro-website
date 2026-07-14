# Quadro — restaurant website

A rebuild of the Quadro restaurant website (Tashkent) on Next.js: trilingual
content (RU/UZ/EN, Russian by default), a real menu backed by a database, a
working table-booking flow with Telegram notifications, an event-inquiry
form, and an admin panel for managing bookings, events, gallery photos and
event inquiries.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- next-intl for i18n (`ru`, `uz`, `en`, default `ru`, no prefix on default locale)
- Prisma 7 (driver adapters) — SQLite locally, swappable to Postgres in production
- GSAP + Lenis for scroll-triggered reveal/parallax animations and smooth scrolling
- Telegram Bot API for booking and event-inquiry notifications
- Cookie/JWT-based session for the `/admin` panel (no separate user table — single shared password)

## Getting started

```bash
npm install
cp .env.example .env   # already provided as .env for local dev, adjust values
npx prisma migrate dev # creates dev.db and applies the schema
npx tsx prisma/seed.ts # seeds menu categories/dishes, events and gallery photos
npm run dev
```

Open http://localhost:3000.

## Environment variables

| Variable | Purpose | Required |
| --- | --- | --- |
| `DATABASE_URL` | SQLite file in dev (`file:./dev.db`), Postgres connection string in production | yes |
| `ADMIN_PASSWORD` | Password to sign in at `/admin/login` | yes |
| `ADMIN_SESSION_SECRET` | Secret used to sign the admin session JWT — set a long random value in production | yes |
| `TELEGRAM_BOT_TOKEN` | Bot token from [@BotFather](https://t.me/BotFather) | optional — bookings/inquiries still save to the DB without it |
| `TELEGRAM_CHAT_ID` | Chat/group/channel id that should receive new-booking and new-inquiry messages | optional |

### Setting up the Telegram bot

1. Message [@BotFather](https://t.me/BotFather), run `/newbot`, copy the token into `TELEGRAM_BOT_TOKEN`.
2. Add the bot to the group/channel that should receive alerts (or just message it directly for a personal chat).
3. Get the chat id (e.g. via `https://api.telegram.org/bot<token>/getUpdates` after sending a message) and set `TELEGRAM_CHAT_ID`.

## Admin panel

Sign in at `/admin/login` with `ADMIN_PASSWORD`. Session is a signed, httpOnly
cookie (7 days); `/admin/*` is excluded from locale routing and always served
in Russian.

- `/admin/bookings` — table bookings, with confirm/cancel/delete.
- `/admin/events` — create/edit/delete events (title + description in all three languages, date, order, photo upload).
- `/admin/gallery` — upload photos into the Interior/Food/Bar categories, delete existing ones.
- `/admin/event-inquiries` — private-event enquiries submitted from the Events page contact form.

Uploaded images are written to `public/images/uploads/` on disk. That's fine
for this local/single-server setup, but on most serverless hosts (Vercel
included) the filesystem is ephemeral — swap in a real object store (e.g.
Vercel Blob) before relying on uploads in production.

## Content

- Menu categories and dish prices in `prisma/seed.ts` were taken from the real, currently published quadro.uz menu (RU) and translated into UZ/EN. Update prices there and re-run the seed script when the real menu changes, or edit them going forward through the admin panel (events/gallery) or the database directly (menu).
- Marketing copy across the site was written from scratch — it is not copied from any reference site.
- `public/images/` and `public/videos/` contain real Quadro photography/video (not placeholders).

## Moving this project to another computer

Git only carries the source code. A few things are intentionally excluded
from the repo (`.gitignore`) and need to be copied over separately:

- `.env` — admin password, session secret, Telegram credentials.
- `dev.db` — the local SQLite database (menu, events, gallery entries, and
  any real bookings/event inquiries that came in — this can contain guest
  names/phone numbers/emails, so treat it like customer data, not code).
- `public/images/uploads/` — any photos added through the admin panel.

On the new machine: `git clone`, copy those three items into place, then
`npm install && npx prisma generate && npm run dev`.

## Deploying to Vercel

1. Push this repo to GitHub and import it in Vercel (or run `vercel` from the CLI).
2. Provision a Postgres database from the Vercel Marketplace (Neon or similar) and copy its connection string.
3. In `prisma/schema.prisma`, change the datasource provider to `postgresql`, and swap the driver adapter in `src/lib/prisma.ts` / `prisma/seed.ts` from `@prisma/adapter-better-sqlite3` to `@prisma/adapter-pg` (`npm install @prisma/adapter-pg`, `new PrismaPg({ connectionString: process.env.DATABASE_URL })`).
4. Set the environment variables from the table above in the Vercel project settings.
5. Run `npx prisma migrate deploy` against the production database, then `npx tsx prisma/seed.ts` once to seed it.
6. Set up an object store (e.g. Vercel Blob) for `/admin` photo uploads — the local-filesystem upload path won't persist on Vercel.
7. Deploy.

## Project structure

```
prisma/               schema, migrations, seed script
messages/              ru.json / uz.json / en.json UI strings
src/app/[locale]/      public site (home, about, menu, bar, events, gallery, contact)
src/app/admin/         admin panel: bookings, events, gallery, event inquiries
src/app/api/           public booking + event-inquiry submission endpoints
src/components/        header, footer, booking form, carousels, admin forms, etc.
src/lib/               prisma client, telegram helper, admin auth/upload, i18n content helpers
```
