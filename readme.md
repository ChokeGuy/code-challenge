# Project Setup Guide

## Prerequisites

- **Git** installed
- **Node.js** installed (version 16+ recommended)
- **Docker Desktop** installed and running
- An **IDE** such as VS Code, WebStorm, or any preferred editor

## Clone the Repository

To get started, clone the repository:

```sh
 git clone https://github.com/ChokeGuy/code-challenge
```

## Problem 4 - Three Ways to Sum `n`

### How to Run

1. Navigate to the `Problem 4` directory:
   ```sh
   cd src/problem4
   ```
2. Run the following command:
   ```sh
   npx tsx index.ts
   ```
   > _Note:_ You may need to install the `tsx` package if it's not already installed.

---

## Problem 5 - CRUD Resources API

### Setup and Run

1. Navigate to the `Problem 5` directory:
   ```sh
   cd src/problem5
   ```
2. Install dependencies using `npm` (or use `yarn`/`bun` if preferred):
   ```sh
   npm install
   ```
3. Create a `.env` file and add the following environment variables:
   ```ini
   NODE_ENV=DEV
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=root
   DB_PASSWORD=123456
   DB_NAME=temp_database
   ```
   > _Note:_ This is just a demo setup. In a real-world application, these variables should not be exposed.
4. Start the database instance using Docker:
   ```sh
   docker compose up -d
   ```
5. Run the migration to apply database changes:
   ```sh
   npm run migration:run
   ```
   > _Note:_ You can generate a new migration using `npm run migration:generate --name=<migration_name>` and revert the last migration if needed with `npm run migration:revert`.
6. Start the project:
   ```sh
   npm run dev
   ```
7. Once the server is running, you can test the APIs using the provided **Postman collection**:
   - [Postman Collection](https://www.postman.com/bold-capsule-703444/workspace/resources-service)
   - Make sure to switch the **environment** to `env` before running the tests.

---

## Problem 6

# Scoreboard API Service

## Overview

This API service handles user score updates and maintains a live scoreboard displaying the top 10 users. It processes score updates via Redis Queue, updates the database, caches leaderboard data, and notifies connected clients through WebSocket.

## Architecture

The system follows an event-driven architecture using Redis as a queue for processing score updates. WebSocket is used to push real-time updates to the clients.

### **Flow of Process:**

1. **User Action:** A user performs an action that increases their score.
2. **API Request:** The client sends a request to `POST /api/score/update` with a valid `accessToken`.
3. **Queue Processing:** The request is added to a Redis queue for processing.
4. **Distributor Handling:** A worker service fetches tasks from the queue, verifies the update, modifies the database, and retrieves the top 10 scores.
5. **Cache Update:** The top 10 scores are stored in Redis Cache.
6. **WebSocket Notification:** All connected clients are notified about the updated leaderboard.

---

## API Documentation

### **1. User Authentication**

#### `POST /api/auth/login`

**Description:** Authenticates a user and returns `accessToken` and `refreshToken`.

**Request Body:**

```json
{
  "username": "user1",
  "password": "password123"
}
```

**Response:**

```json
{
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "accessToken": "yourAccessToken",
    "refreshToken": "yourRefreshToken"
  }
}
```

**Notes:**

- The `accessToken` is used for API authorization.
- The `refreshToken` is used to generate a new `accessToken`.

#### `POST /api/auth/refresh`

**Description:** Refreshes the `accessToken` using a valid `refreshToken`.

**Request Body:**

```json
{
  "refreshToken": "yourRefreshToken"
}
```

**Response:**

```json
{
  "statusCode": 200,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "newAccessToken"
  }
}
```

#### `POST /api/auth/logout`

**Description:** Logs out a user and adds their token to the blacklist.

**Headers:**

```json
  "Authorization": "Bearer yourAccessToken"
```

**Response:**

```json
{
  "statusCode": 200,
  "message": "Logout successful. Token blacklisted.",
  "data": null
}
```

---

### **2. Update User Score**

#### `POST /api/score/update`

**Description:** Updates a user's score when an action is completed.

**Headers:**

```
Authorization: Bearer yourAccessToken
```

**Request Body:**

```json
{
  "userId": "12345",
  "points": 10
}
```

**Response:**

```json
{
  "statusCode": 200,
  "message": "Score update received and queued for processing.",
  "data": null
}
```

**Notes:**

- The API does **not** update scores directly. It adds the request to the Redis Queue.
- The request is processed asynchronously by a worker.
- A valid `accessToken` is required for authorization.

---

### **3. Retrieve Leaderboard**

#### `GET /api/leaderboard`

**Description:** Fetches the top 10 users with the highest scores.

**Response:**

```json
{
  "statusCode": 200,
  "message": "Leaderboard retrieved successfully.",
  "data": [
    { "userId": "12345", "score": 2500 },
    { "userId": "67890", "score": 2300 }
  ]
}
```

**Notes:**

- This endpoint retrieves data from Redis Cache.
- If the cache is empty, it fetches from the database and updates the cache.

---

## Database Schema

### **Users Table**

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Sessions Table**

```sql
CREATE TABLE "sessions" (
  "id" uuid PRIMARY KEY,
  "username" varchar NOT NULL,
  "refresh_token" varchar NOT NULL,
  "user_agent" varchar NOT NULL,
  "client_ip" varchar NOT NULL,
  "is_blocked" bool NOT NULL DEFAULT false,
  "expires_at" timestamptz NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);
```

### **Scores Table**

```sql
CREATE TABLE "scores" (
  "id" bigserial PRIMARY KEY,
  "user_id" bigserial NOT NULL,
  "score" int NOT NULL DEFAULT 0,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE INDEX "idx_scores_score" ON "scores" ("score" DESC);

ALTER TABLE "sessions" ADD FOREIGN KEY ("username") REFERENCES "users" ("username");
ALTER TABLE "scores" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
```

---

## WebSocket Integration

The WebSocket server pushes leaderboard updates to all connected clients when scores change.

### **WebSocket Connection**

- Clients should connect to `ws://yourserver.com/ws/scoreboard`.
- On connection, clients will receive a real-time leaderboard update.

### **WebSocket Event: Score Update**

**Example Message:**

```json
{
  "event": "score_update",
  "data": [
    { "userId": "12345", "score": 2500 },
    { "userId": "67890", "score": 2300 }
  ]
}
```

---

## Redis Queue Processing

The score update requests are processed using a Redis queue.

### **Queue Workflow:**

1. API receives a score update request and pushes it to Redis Queue (`score_updates`).
2. A worker service (Distributor) consumes tasks from Redis Queue.
3. The worker validates the score update and applies changes to the database.
4. The worker fetches the latest top 10 scores and updates Redis Cache.
5. The WebSocket server sends an update to all connected clients.

---

## Tech Stack

### **Backend:**

- **Node.js** – Runtime environment for executing JavaScript/Typescript code on the server.
- **Express.js** – Web framework for building APIs.
- **Redis** – Used for **message queue (Redis Queue)** and **caching leaderboard data**.
- **PostgreSQL** – Relational database for storing users and scores.
- **WebSocket (ws library)** – Handles real-time leaderboard updates.
- **JWT & PASETO** – Authentication and token handling.

---

## Improvements & Recommendations

1. **Security Enhancements:**
   - Implement a **Redis-based Token Blacklist** to revoke compromised tokens.
2. **Rate Limiting:**
   - Prevent users from sending excessive score update requests using API rate limiting (e.g., Redis-based token bucket algorithm).
3. **Leaderboard Expiry Policy:**
   - Set a TTL (Time-To-Live) for Redis cache to prevent stale leaderboard data.
4. **Scalability Considerations:**
   - Deploy multiple worker instances to handle a high number of score updates.
   - Use a load balancer for distributing WebSocket connections across multiple servers.
