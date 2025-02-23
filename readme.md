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

(Not available for now)
