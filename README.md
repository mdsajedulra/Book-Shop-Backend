# 📚 Book Shop Backend API

A complete RESTful API backend for the Book Shop application. Built using **TypeScript**, **Express.js**, and **MongoDB (Mongoose)**. This backend supports user authentication, role-based authorization, product and order management, and payment integration via **SurjoPay**.

---

## 🛠️ Technologies Used

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB (Mongoose)**

---

## 📦 Key Packages

- **bcryptjs** – Password hashing  
- **jsonwebtoken** – JWT authentication  
- **dotenv** – Manage environment variables  
- **zod** – Input validation  
- **ts-node-dev** – Hot reload for dev  


---

## ✨ Features

### 🧑‍💼 Authentication & Roles

- Secure registration & login (JWT-based)
- Hashed passwords
- Roles: `user` (default), `admin` (manually updated in DB)

### 📚 Book/Product Management

- CRUD operations for products (admin only)
- Public product browsing
- Search, filter, and sort functionality by:
  - Title
  - Author
  - Category
  - Price range
  - Availability

### 📦 Order Management

- Users can place orders
- Quantity validation (stock check)
- Admin can manage all orders (CRUD)
- User can view own orders

### 💳 Payment Integration

- SurjoPay integration for order checkout

- Order confirmation after successful payment

### 🛡️ Security & Error Handling

- Centralized error responses
- Secure routes with role-based access
- User-friendly messages for:
  - Login failure
  - Registration errors
  - Operation failures (e.g. out of stock)

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd bookshop-backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret>

```

### 4️⃣ Run the Server

#### Development:
```bash
npm run start:dev
```




---

## 🔐 Role-based Dashboard

- **Admin**: Manage users, products, orders  
- **User**: View orders, update profile

---

## 🔗 Live Server

[https://bookshopbackend-henna.vercel.app/](https://bookshopbackend-henna.vercel.app/)
