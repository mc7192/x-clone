# 🐦 Social Media Clone

A modern social media clone built with **Next.js App Router**, featuring user authentication, infinite scrolling, real-time post feeds, and robust schema validation.

## 🚀 Features

- 🔐 **Authentication** using [Clerk](https://clerk.dev)
- 📓 **Database** powered by Prisma ORM with MySQL
- 🐳 **Dockerized** for easy local development
- 🌀 **Infinite Scrolling** with `react-infinite-scroll-component`
- 🕒 **Relative timestamps** via `timeago.js`
- ⚛️ **React Query** for efficient client-side data fetching & caching
- 🧠 **Zod** for type-safe and declarative schema validation
- 🧩 **Socket.IO** for real-time communication (e.g., notifications, online presence)
- 🆔 **UUID** for generating consistent unique identifiers
- 🥪 Clean and scalable architecture with server components & API routes

---

## 💠 Tech Stack

| Tool             | Purpose                                           |
| ---------------- | ------------------------------------------------- |
| **Next.js**      | React framework with App Router                   |
| **Clerk**        | Authentication & user management                  |
| **Prisma**       | Type-safe ORM for interacting with MySQL          |
| **MySQL**        | Relational database                               |
| **Docker**       | Containerized local development                   |
| **React Query**  | Data fetching, caching, and pagination            |
| **Socket.IO**    | Real-time features (e.g. live updates, presence)  |
| **uuid**         | Generation of unique IDs (e.g., messages, events) |
| **zod**          | Schema validation and type safety                 |
| **timeago.js**   | Human-readable relative timestamps                |
| **Tailwind CSS** | Utility-first styling framework                   |

---

## 📦 Project Structure (Simplified)

```
/app
  /api/posts         → REST API routes for fetching posts
  /posts             → Client-side rendering of posts
  /components        → UI and reusable components
/prisma
  schema.prisma      → DB schema
```

---

## 🧑‍💻 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/social-media-clone.git
cd social-media-clone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL="mysql://root:password@localhost:3306/social_db"
CLERK_SECRET_KEY=your-clerk-secret-key
CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
NEXT_PUBLIC_CLERK_FRONTEND_API=your-clerk-frontend-api
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
```

---

### 4. Start MySQL with Docker

```bash
docker-compose up -d
```

Then push your Prisma schema:

```bash
npx prisma db push
```

---

### 5. Run the Dev Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Key Concepts

- **Authentication** handled entirely via Clerk middleware and React hooks
- **Post Feed** is paginated with `cursor`-based infinite scrolling
- **Data Fetching** uses React Query (`useInfiniteQuery`)
- **Server Components** used for performance and scalability
- **MySQL + Prisma** manages post relationships, follows, and users
- **UI/UX** is enhanced with Tailwind and timeago.js for post timestamps

---

## 📂 Prisma Schema Sample (Simplified)

```prisma
model Post {
  id        String   @id @default(cuid())
  content   String
  userId    String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
}

model Follow {
  id          String   @id @default(cuid())
  followerId  String
  followingId String
}
```

---

## 📦 API Example

### `GET /api/posts?cursor=2&user=123`

- Returns paginated posts
- Supports filtering by user
- Response format:

```json
{
  "posts": [...],
  "hasMore": true
}
```

---

## 📸 Screenshots (Optional)

_Add screenshots or demo GIFs of your feed, infinite scroll, and post UI._

---

## 🧱 To-Do / Roadmap

- [ ] Add likes and comments
- [ ] Upload images via Clerk or Cloudinary
- [ ] Add notifications
- [ ] Real-time updates (e.g., using WebSockets)

---
