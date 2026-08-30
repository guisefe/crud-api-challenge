# User CRUD API

[![CI](https://github.com/guisefe/crud-api-challenge/actions/workflows/ci.yml/badge.svg)](https://github.com/guisefe/crud-api-challenge/actions/workflows/ci.yml)
![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)

An authenticated CRUD API for user registration, login and profile management. This is a
historical backend exercise retained to document engineering growth and maintained with basic
repository, security and CI hygiene.

## What it demonstrates

- a small Express application with an explicit application/startup boundary;
- MongoDB persistence through Mongoose;
- password hashing with bcrypt and JWT authentication;
- allowlisted profile updates and password-safe query projections;
- a stable health endpoint, automated smoke tests and GitHub Actions CI;
- environment-based configuration with no committed credentials.

It is intentionally a compact learning project, not a production identity platform. The main
AI and data engineering portfolio projects are available on the
[author profile](https://github.com/guisefe).

## Run locally

Requirements: Node.js 22+ and MongoDB.

```bash
git clone https://github.com/guisefe/crud-api-challenge.git
cd crud-api-challenge
npm ci
cp .env.example .env
npm start
```

Replace `JWT_SECRET` with a random value containing at least 32 characters. The API starts only
after validating its configuration and connecting to MongoDB.

## API surface

| Method | Endpoint | Authentication | Purpose |
| --- | --- | --- | --- |
| `GET` | `/health` | No | Liveness contract |
| `POST` | `/api/auth/register` | No | Register a user |
| `POST` | `/api/auth/login` | No | Obtain a JWT |
| `GET` | `/api/users/list` | Bearer JWT | List and filter users |
| `GET` | `/api/users/:id` | Bearer JWT | Retrieve one user |
| `PATCH` | `/api/users/:id` | Bearer JWT | Update allowlisted fields |
| `DELETE` | `/api/users/:id` | Bearer JWT | Delete one user |

Protected requests use the standard header:

```text
Authorization: Bearer <token>
```

List queries support `name`, `email`, `dateOfBirth` and comma-separated `sort` fields. Prefix a
sort field with `-` for descending order, for example `sort=name,-dateOfBirth`.

## Quality checks

```bash
npm run check
npm test
```

CI installs the lockfile dependencies, checks JavaScript syntax and runs the Node.js test suite.

## Security scope

- `.env` files and installed dependencies are ignored;
- passwords are excluded from queries by default;
- login failures use a uniform response to reduce account enumeration;
- profile updates accept only `name`, `email` and `dateOfBirth`;
- invalid or expired credentials return HTTP 401.

A production identity service would additionally require request validation middleware, rate
limiting, refresh-token rotation, password recovery, email verification, audit logging, secrets
management, observability and a dedicated authorization policy.
