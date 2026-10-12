# Botfrag: a gaming community web app (MERN)

Botfrag is a community site for gamers to share clips, highlights and stories. Players sign up, post with tags and images, like and comment, search by title or tag, browse by creator, and keep a player profile.

Built for **CSE470 Software Engineering** at BRAC University (2022). It builds on the open-source *Memories* MERN tutorial by JavaScript Mastery, adapted for gaming with Botfrag branding and player profiles.

## Repository layout

The project was delivered in milestones, and each one is kept as its own folder:

| Folder | What it contains |
|---|---|
| `botFrag_project(feature 1)` | Milestone 1 submission |
| `botFrag_project(feature 1, 2 & 3)` | Milestone 2 submission (features 1–3) |
| `botFrag_project(complete)` | **Final version**, with search, creator/tag pages, comments and pagination |

Each folder has a `server/` (Node, Express, MongoDB with Mongoose, JWT auth) and a `client/` (React, Redux, Material-UI).

## Run the final version

```bash
# API
cd "botFrag_project(complete)/server"
cp .env.example .env        # then set CONNECTION_URL and JWT_SECRET
npm install
npm start                   # http://localhost:5000

# Web client (in a second terminal)
cd "botFrag_project(complete)/client"
npm install
npm start                   # http://localhost:3000
```

The client uses `react-scripts` 3. On Node 17 or newer, start it with `NODE_OPTIONS=--openssl-legacy-provider npm start`.

## API

| Method | Route | Auth | Purpose |
|---|---|---|---|
| POST | `/user/signup`, `/user/signin` | none | Create an account or sign in (returns a JWT) |
| GET | `/posts?page=n` | none | Paginated feed (8 per page) |
| GET | `/posts/search?searchQuery=&tags=` | none | Search by title or tags |
| GET | `/posts/creator?name=` | none | Posts by a creator |
| GET | `/posts/:id` | none | One post |
| POST / PATCH / DELETE | `/posts`, `/posts/:id` | JWT | Create, edit or delete a post |
| PATCH | `/posts/:id/likePost` | JWT | Like or unlike |
| POST | `/posts/:id/commentPost` | none | Comment |

## Tests

```bash
cd "botFrag_project(complete)/server"
npm test
```

These API tests run against an in-memory MongoDB, so no database setup is needed. They cover sign-up, duplicate sign-up, password checks, protected routes and the post create, list, search, like and delete flow.

## Maintenance notes (2026)

- **Security:** removed a database connection string from the source (it was in a commented-out line), moved the JWT secret to an environment variable, and stopped the API returning password hashes
- **Auth fix:** the middleware accepted any token of 500 or more characters without checking its signature, and it left requests hanging when the token was missing. It now verifies every token and returns 401 otherwise
- Loaded `.env` before the routes read it, upgraded `jsonwebtoken` to v9 (v8 doesn't run on current Node and has known advisories), and added API tests and `.env.example` files
- Google sign-in used `react-google-login`, which Google has retired, so email and password is the supported sign-in method

## Tech

MongoDB · Express · React · Node.js · Redux · Material-UI · JWT · bcrypt
