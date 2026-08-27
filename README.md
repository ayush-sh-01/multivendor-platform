<div align="center">

# 🛍️ ThriftCampus
### Premium Luxury Second-Hand Fashion Marketplace for Students

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Render-6C63FF?style=for-the-badge&logo=render)](https://multivendor-platform-2vkb.onrender.com)
[![Backend](https://img.shields.io/badge/Backend-Spring%20Boot%203.3-6DB33F?style=for-the-badge&logo=spring)](https://spring.io/projects/spring-boot)
[![Frontend](https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Database](https://img.shields.io/badge/Database-PostgreSQL%20%7C%20Neon-4169E1?style=for-the-badge&logo=postgresql)](https://neon.tech)
[![Docker](https://img.shields.io/badge/Deployed-Docker-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com)
[![License](https://img.shields.io/badge/License-MIT-D4AF37?style=for-the-badge)](LICENSE)

**A full-stack, multi-vendor e-commerce platform where students buy and sell curated second-hand fashion — with zero commission, zero delivery, and a premium dark gold luxury aesthetic.**

[🌐 Live Demo](https://multivendor-platform-2vkb.onrender.com) · [📖 API Docs](https://multivendor-platform-2vkb.onrender.com/swagger-ui/index.html)

</div>

---

## 📋 Table of Contents
- [About The Project](#-about-the-project)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [ER Diagram](#-er-diagram)
- [Application Flow](#-application-flow)
- [Features](#-features)
- [User Roles](#-user-roles)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started-local-setup)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Future Enhancements](#-future-enhancements)

---

## 🌟 About The Project

ThriftCampus is a **luxury-themed multi-vendor fashion marketplace** where college students can:
- 🛒 **Buy** curated second-hand clothing from verified student sellers
- 📦 **Sell** their own wardrobe pieces with zero commission
- 🤝 **Hand-off** clothes directly on campus — zero carbon, zero delivery cost

The platform features an editorial **Premium Dark Gold & Deep Black** aesthetic, making the thrift experience feel high-fashion and desirable.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│         BROWSER (React + Vite)              │
│   Served as static files by Spring Boot     │
└──────────────────┬──────────────────────────┘
                   │ REST API calls (/api/*)
┌──────────────────▼──────────────────────────┐
│      RENDER.COM — Docker Container          │
│   Spring Boot 3.3 + Spring Security + JWT   │
│   Serves static frontend + REST API         │
└──────────────────┬──────────────────────────┘
                   │ JDBC / PostgreSQL
┌──────────────────▼──────────────────────────┐
│      NEON DB — Serverless PostgreSQL        │
│   Tables: User, Vendor, Product, Category,  │
│   Cart, Order, OrderItem                    │
└─────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|:---|:---|:---|
| Java | 21 | Core programming language |
| Spring Boot | 3.3.5 | Web framework |
| Spring Security | 6.x | Authentication & authorisation |
| Spring Data JPA | 3.3.5 | ORM layer |
| JJWT | 0.12.6 | JWT token generation |
| PostgreSQL Driver | Latest | Cloud DB (Neon) |
| MySQL Connector | Latest | Local development |
| Springdoc OpenAPI | 2.6.0 | Swagger UI |
| Maven | 3.9+ | Build tool |

### Frontend
| Technology | Version | Purpose |
|:---|:---|:---|
| React | 18 | UI library |
| Vite | 5.x | Build tool |
| Tailwind CSS | 3.x | Styling |
| Three.js | Latest | 3D elements |
| React Context API | Built-in | State management |

### Infrastructure
| Technology | Purpose |
|:---|:---|
| Docker | Containerisation |
| Render.com | Free cloud hosting |
| Neon DB | Free PostgreSQL cloud |
| GitHub | Source control & CI/CD |

---

## 🗄️ ER Diagram

```
┌──────────────────┐          ┌─────────────────────┐
│      USER        │          │       VENDOR         │
├──────────────────┤          ├─────────────────────┤
│ id          PK   │◄─────────│ id             PK   │
│ name             │  1 : 1   │ user_id        FK   │
│ email       UK   │          │ shop_name           │
│ password         │          │ description         │
│ role             │          │ rating              │
└────────┬─────────┘          └──────────┬──────────┘
         │ 1                             │ 1
         │ M                             │ M
         ▼                               ▼
┌──────────────────┐          ┌─────────────────────┐
│      ORDER       │          │       PRODUCT        │
├──────────────────┤          ├─────────────────────┤
│ id          PK   │          │ id             PK   │
│ user_id     FK   │          │ vendor_id      FK   │
│ total_amount     │          │ category_id    FK   │
│ status           │          │ name                │
│ pickup_location  │          │ price               │
│ created_at       │          │ size / image_url    │
└────────┬─────────┘          │ condition_rating    │
         │ 1 : M              │ in_stock            │
         ▼                    └─────────────────────┘
┌──────────────────┐
│   ORDER_ITEM     │          ┌─────────────────────┐
├──────────────────┤          │      CATEGORY        │
│ id          PK   │          ├─────────────────────┤
│ order_id    FK   │          │ id             PK   │
│ product_id  FK   │          │ name                │
│ quantity         │          │ image_url           │
│ price_at_time    │          └─────────────────────┘
└──────────────────┘

┌──────────────────┐
│      CART        │
├──────────────────┤
│ id          PK   │
│ user_id     FK   │
│ product_id  FK   │
│ quantity         │
└──────────────────┘
```

---

## 🔄 Application Flow

### Authentication Flow
```
User submits login form
    → POST /api/auth/login { email, password }
    → Backend looks up user by email
    → BCrypt compares password hash
    → If valid: generate JWT token (24h expiry)
    → Return { token, user: { id, name, role } }
    → Frontend stores token in memory
    → All future requests: Authorization: Bearer <token>
```

### Purchase Flow
```
Browse Products → Quick View → Add to Cart
    → Not logged in? → Auth Modal → login
    → POST /api/cart { productId, quantity }
    → JWT verified → Cart saved to DB

Open Cart Drawer → Select Pickup Location → Place Order
    → POST /api/orders { pickupLocation }
    → Backend: Order + OrderItems created from Cart
    → Cart cleared → Confirmation shown
```

### Vendor Upload Flow
```
Vendor clicks Upload → Upload Modal opens
    → Fills: name, category, size, price, imageUrl, description
    → POST /api/products (requires VENDOR role JWT)
    → Backend validates role → Saves to DB
    → Product appears live in gallery ✅
```

---

## ✨ Features

### Shopping
- [x] Real-time search and category filtering
- [x] Quick view modal with product details
- [x] Shopping cart with quantity controls
- [x] Campus pickup location selector
- [x] Order placement and history

### Authentication
- [x] JWT-based stateless authentication
- [x] BCrypt password hashing
- [x] Role-based access control (CUSTOMER / VENDOR)
- [x] 1-click demo login

### Design & UX
- [x] Premium Dark Gold aesthetic (#0A0A0A + #D4AF37)
- [x] Playfair Display + Inter typography
- [x] Pill-shaped classy buttons
- [x] 3D card hover lift + gold border glow
- [x] Fully responsive (mobile, tablet, desktop)
- [x] Cart drawer slide animation
- [x] Toast notification system
- [x] Infinite scrolling marquee banner

### Vendor Features
- [x] Product upload form
- [x] Product management (edit/delete)
- [x] Curator profile cards with ratings

### Infrastructure
- [x] Dockerised deployment
- [x] Spring profiles (local MySQL / cloud PostgreSQL)
- [x] Hibernate auto table creation
- [x] Sample data seeded on first boot
- [x] GitHub → Render auto-deploy

---

## 👥 User Roles

| Permission | CUSTOMER | VENDOR |
|:---|:---:|:---:|
| Browse & search products | ✅ | ✅ |
| Add to cart & order | ✅ | ✅ |
| View own orders | ✅ | ✅ |
| Upload new products | ❌ | ✅ |
| Edit / delete own products | ❌ | ✅ |
| Vendor dashboard | ❌ | ✅ |

---

## 📡 API Endpoints

> Full interactive docs: `/swagger-ui/index.html`

| Method | Endpoint | Auth | Description |
|:---|:---|:---:|:---|
| POST | `/api/auth/register` | Public | Create account |
| POST | `/api/auth/login` | Public | Login → JWT |
| GET | `/api/products` | Public | All products |
| POST | `/api/products` | VENDOR | Upload product |
| GET | `/api/cart` | User | View cart |
| POST | `/api/cart` | User | Add to cart |
| POST | `/api/orders` | User | Place order |
| GET | `/api/orders` | User | Order history |
| GET | `/api/categories` | Public | All categories |
| GET | `/api/vendors` | Public | All vendors |

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Java 21+, Node.js 18+, MySQL 8+, Maven 3.9+

### 1. Clone
```bash
git clone https://github.com/ayush-sh-01/multivendor-platform.git
cd multivendor-platform
```

### 2. MySQL Setup
```sql
CREATE DATABASE multivendor_db;
```
Update `src/main/resources/application.properties` with your MySQL password.

### 3. Run Backend
```bash
./mvnw spring-boot:run
# Starts at http://localhost:8080
```

### 4. Run Frontend (Dev Mode)
```bash
cd frontend
npm install
npm run dev
# Starts at http://localhost:3000
```

### Demo Accounts
| Email | Password | Role |
|:---|:---|:---|
| `customer@dezel.com` | `customer123` | CUSTOMER |
| `artisan@dezel.com` | `vendor123` | VENDOR |

---

## 🐳 Deployment

### Render.com + Neon DB (Free)

1. Create free PostgreSQL on [neon.tech](https://neon.tech)
2. Create **Web Service** on [render.com](https://render.com) (Docker runtime)
3. Set environment variables:

```
SPRING_PROFILES_ACTIVE   = prod
SPRING_DATASOURCE_URL    = jdbc:postgresql://YOUR_NEON_HOST/neondb?sslmode=require
SPRING_DATASOURCE_USERNAME = YOUR_NEON_USER
SPRING_DATASOURCE_PASSWORD = YOUR_NEON_PASSWORD
```

4. Push to GitHub → Render auto-deploys! 🚀

---

## 📁 Project Structure

```
multivendor-platform/
├── Dockerfile
├── pom.xml
├── frontend/
│   └── src/
│       ├── components/     # UI components (Navbar, Cart, etc.)
│       ├── context/        # Auth, Cart, Product state
│       ├── hooks/          # useTilt, useScrollReveal
│       ├── services/       # API calls
│       └── data/           # Mock data fallback
└── src/main/
    ├── java/com/multivendor/
    │   ├── controller/     # REST endpoints
    │   ├── service/        # Business logic
    │   ├── repository/     # DB queries
    │   ├── entity/         # JPA models
    │   ├── security/       # JWT filter & service
    │   └── config/         # SecurityConfig, DataInitializer
    └── resources/
        ├── application.properties       # Local MySQL
        ├── application-prod.properties  # Neon PostgreSQL
        └── static/                      # Built React files
```

---

## 🔮 Future Enhancements

- [ ] Email notifications on order/sale
- [ ] Real image upload (Cloudinary)
- [ ] Product reviews & ratings
- [ ] In-app buyer-seller messaging
- [ ] Payment integration (Razorpay)
- [ ] Admin moderation panel
- [ ] AI style recommendations
- [ ] Mobile app (React Native)

---

⭐ Star this repo if you find it useful!

</div>
