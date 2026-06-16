# 🍽️ Lewi Cafe — Food Ordering & Table Reservation System

A full-stack web application for **Lewi Cafe** that lets customers browse the menu, place food orders, book tables, and pay online (via **Chapa**). Admins and delivery personnel have dedicated dashboards.

> **Project:** FT-Project
> **Stack:** Vue 3 (frontend) · Node.js + Express (backend) · MySQL 8 (database) · Docker Compose (orchestration)

---

## 📑 Table of Contents
1. [Features](#-features)
2. [Project Structure](#-project-structure)
3. [Tech Stack](#-tech-stack)
4. [Quick Start (Docker — Recommended)](#-quick-start-docker--recommended)
5. [Manual Setup (Without Docker)](#-manual-setup-without-docker)
6. [Database Initialization](#-database-initialization)
7. [Environment & Configuration](#-environment--configuration)
8. [Chapa Payment Setup](#-chapa-payment-setup)
9. [Useful Docker Commands](#-useful-docker-commands)
10. [Troubleshooting](#-troubleshooting)
11. [Recent Restructure Notes](#-recent-restructure-notes)

---

## ✨ Features
- 🛒 **Food ordering** with categories (breakfast, lunch, dinner, dessert, hot & soft drinks)
- 🪑 **Table reservation** system
- 💳 **Online payment** integration (Chapa)
- 👤 **User**, **Admin**, and **Delivery Person** dashboards
- 🗣️ **Voice ordering** support
- 📱 Responsive UI (Vue 3 + Bootstrap)
- 🐳 Fully **Dockerized** (one-command bring-up)

---

## 📁 Project Structure
```
FT-Project/
├── docker-compose.yml          # Orchestrates MySQL, backend, frontend
├── init.sql                    # DB schema + sample food data
├── README.md
│
├── backend/                    # Node.js + Express API
│   ├── Dockerfile
│   ├── index.js
│   ├── package.json
│   ├── bookpay.js / ch.js / cha.js / chapa-wrapper.js
│   ├── newPay.js / pay.js / tx_ref_verify.js
│   ├── config/
│   │   └── database.js         # MySQL connection (uses Docker service name "mysql")
│   ├── controllers/            # admin, afoods, billdetails, billstatus,
│   │                           # booktable, cart, dp, food, lang, user
│   ├── models/                 # One model per controller
│   └── routes/
│       └── routes.js
│
└── frontend/                   # Vue 3 application
    ├── Dockerfile
    ├── package.json
    ├── vue.config.js
    ├── babel.config.js
    ├── public/
    │   └── index.html
    └── src/
        ├── main.js / App.vue / axios.js
        ├── admin/              # Admin & delivery-person pages
        ├── assets/             # css, icons, images
        ├── components/         # Footer, NavBar, OrderDetails, QuickView
        ├── pages/              # Home, Menu, Cart, Checkout, Login, Register,
        │                       # Table, MyOrder, MyTables, About, Voice, etc.
        ├── resources/          # SQL dumps (legacy)
        ├── router/index.js
        └── store/index.js      # Vuex
```

---

## 🧰 Tech Stack
| Layer        | Technology                                      |
|--------------|--------------------------------------------------|
| Frontend     | Vue 3, Vue Router, Vuex, Bootstrap 4, Axios      |
| Backend      | Node.js 18, Express 4, mysql2, Chapa SDK         |
| Database     | MySQL 8.0                                       |
| DevOps       | Docker, Docker Compose                          |

---

## 🚀 Quick Start (Docker — Recommended)

> The project was **restructured to use Docker** (see [Recent Restructure Notes](#-recent-restructure-notes)). This is the easiest way to run everything.

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) (≥ 20.10)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2+)

### 1. Clone the repository
```bash
git clone https://github.com/Ashed2127/FT-Project.git
cd FT-Project
```

### 2. Start all services
```bash
docker compose up --build -d
```

This spins up three containers:
| Service   | Container name | Port  | Purpose                       |
|-----------|----------------|-------|-------------------------------|
| `mysql`   | ft-mysql       | 3306  | MySQL 8 database              |
| `backend` | ft-backend     | 8081  | Node.js API                   |
| `frontend`| ft-frontend    | 8080  | Vue dev server (hot-reload)   |

### 3. Open the app
- 🌐 **Frontend:** http://localhost:8080
- 🔌 **Backend API:** http://localhost:8081
- 🗄️ **MySQL:** `localhost:3306` (user `root`, pass `rootpassword`, db `db_restaurant`)

The first start may take a few minutes (image pulls + `npm install` inside the containers).

---

## 🛠️ Manual Setup (Without Docker)

If you prefer to run things locally without Docker:

### Project setup (install node modules)
```bash
# in both /backend and /frontend
npm install
```

### Compiles and hot-reloads for development
```bash
# frontend
npm run serve

# backend
npm start
```

### Database
You must run a local MySQL 8 instance, then:
1. Create a database named `db_restaurant`
2. Run [`init.sql`](./init.sql) to create tables + seed food items
3. Edit `backend/config/database.js` to point at `localhost` (instead of `mysql`)

---

## 🗄️ Database Initialization

`init.sql` is the **canonical schema** for the project. It contains:
- `admin`, `deliver_person`, `user` (auth)
- `food` (menu items, pre-seeded with sample data)
- `cart`, `booktable`, `billdetails`, `billstatus`
- `languagestatus` (voice/language toggle)

### Load it inside the running MySQL container
```bash
docker exec -i ft-mysql mysql -uroot -prootpassword db_restaurant < init.sql
```

### Or, load it once during first run
The `docker-compose.yml` defines a volume for MySQL, so data **persists** between restarts. To re-seed from scratch:
```bash
docker compose down -v          # ⚠️ wipes MySQL data volume
docker compose up --build -d
docker exec -i ft-mysql mysql -uroot -prootpassword db_restaurant < init.sql
```

---

## ⚙️ Environment & Configuration

### `backend/config/database.js`
The Dockerized version points at the **Docker service name**:
```js
const db = mysql.createConnection({
    host: "mysql",          // ← Docker service name (NOT "localhost")
    user: "root",
    password: "rootpassword",
    database: "db_restaurant"
});
```
It also includes a **retry loop** (`connectWithRetry`) so the backend waits for MySQL to become healthy before connecting.

### Frontend API base URL
Check `frontend/src/axios.js` and make sure it targets `http://localhost:8081` (or the appropriate host) when running the Vue dev server.

---

## 💳 Chapa Payment Setup

In the **backend**, replace the Chapa secret key with your own. The relevant files are:
- `backend/bookpay.js`
- `backend/ch.js`
- `backend/cha.js`
- `backend/chapa-wrapper.js`
- `backend/newPay.js`
- `backend/pay.js`
- `backend/tx_ref_verify.js`

### Test Chapa numbers (sandbox)
Use one of the following test phone numbers provided by Chapa:

**Awash**
```
0900123456
```

**Amole**
```
0900123456
```

**Telebirr**
```
0900123456
```

---

## 🐳 Useful Docker Commands

```bash
# List all running containers
docker compose ps

# View backend logs
docker compose logs backend
docker compose logs -f backend        # follow/tail mode

# View frontend logs
docker compose logs frontend
docker compose logs -f frontend

# View MySQL logs
docker compose logs mysql

# Restart everything
docker compose restart

# Stop everything (keep data volume)
docker compose down

# Stop everything AND wipe the MySQL volume
docker compose down -v

# Rebuild images after Dockerfile / package.json changes
docker compose up --build -d

# Open a shell inside a container
docker exec -it ft-backend sh
docker exec -it ft-frontend sh
docker exec -it ft-mysql bash
```

---

## 🧯 Troubleshooting

### ❌ White / blank interface on http://localhost:8080
**Symptoms:** Containers all running, but the browser shows a blank white page and menu items do not render.

**Common causes & fixes:**
1. **Frontend can't reach the backend.** Open browser DevTools → Network tab and look for failed XHR calls to `http://localhost:8081`.
   - Confirm `frontend/src/axios.js` baseURL is `http://localhost:8081`.
   - Confirm the `backend` container is healthy: `docker compose ps`.
2. **API is returning empty / errors.** Tail the backend logs:
   ```bash
   docker compose logs -f backend
   ```
3. **Database is empty.** Re-seed with `init.sql` (see [Database Initialization](#-database-initialization)).
4. **Vue compile errors in the browser.** Open the browser console — if there are errors like `Failed to mount component`, check the frontend logs:
   ```bash
   docker compose logs -f frontend
   ```
5. **CORS issue.** The backend uses `cors` middleware, but if you changed the frontend port you may need to allow the new origin in `backend/index.js`.
6. **Stale `node_modules`.** If `package.json` changed, rebuild:
   ```bash
   docker compose down
   docker compose up --build -d
   ```


### ❌ `docker compose up` fails with "port already allocated"
Another process is using port `3306`, `8080`, or `8081`. Stop it, or edit `docker-compose.yml` to map different host ports.

### ❌ Hot-reload not working
The compose file mounts the project source as a volume so edits are reflected inside the container. If it isn't picking up changes, restart the affected service:
```bash
docker compose restart frontend
```

---

## 🆕 Recent Restructure Notes

The project was **restructured to add Docker support** (assisted by Grok). Summary of what changed:

### 🆕 New files
- **`docker-compose.yml`** (project root) — defines the `mysql`, `backend`, and `frontend` services.
- **`backend/Dockerfile`** — Node 18 Alpine image, installs deps, runs `npm start` (nodemon).
- **`frontend/Dockerfile`** — Node 18 Alpine image, installs deps, runs `npm run serve`.
- **`init.sql`** — canonical DB schema + sample food data, replaceable of older dumps in `frontend/src/resources/`.

### ✏️ Modified files
- **`backend/config/database.js`** — `host` changed from `localhost` to the Docker service name `mysql`; added a retry loop (`connectWithRetry`) so the backend waits for MySQL to be ready.

### ⚠️ Known issue after restructure
> DB, backend, and frontend are all running, but the UI still shows a **white/blank page** and **menu items are not displayed**.

If you hit this, see the [Troubleshooting → White / blank interface](#-white--blank-interface-on-httplocalhost8080) section above. The most likely culprits are:
- Frontend axios base URL not pointing at `http://localhost:8081`.
- API returning empty because `init.sql` was never loaded.
- Browser-side Vue errors (check the console + `docker compose logs -f frontend`).

---

## 📜 License
This project is private/educational — feel free to adapt for your own café or restaurant.
