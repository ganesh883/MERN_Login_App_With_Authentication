# MERN Stack Authentication App

A full-featured authentication system built with the MERN stack (MongoDB, Express, React, Node.js). Includes registration, login, profile update, password reset via OTP, and protected routes.

---

## 🔧 Tech Stack

- **Frontend:** React, React Router, Formik, React Hot Toast
- **Backend:** Node.js, Express
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT (JSON Web Token), Bcrypt
- **Email Service:** Nodemailer
- **Utilities:** Axios, dotenv

---

## ✨ Features

- ✅ User Registration (with fields: firstName, lastName, mobile, address, city)
- 🔐 Secure Login using JWT
- 🙍‍♂️ View & Update Profile
- 📩 OTP-based Password Reset
- 🔐 Protected Routes
- ☁️ Profile Image Upload (Base64)

---

## 📁 Project Structure

```
mern-login-app/
├── client/               # React frontend
│   ├── components/
│   ├── pages/
│   ├── helper/
│   ├── store/
│   ├── Styles/
│   └── main.jsx
├── server/               # Express backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utility/
│   └── database/conn.js
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/mern-login-app.git
cd mern-login-app
```

---

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in `server/` with:

```
PORT=8080
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password
```

Run the backend:

```bash
npm run start
```

---

### 3. Setup Frontend

```bash
cd client
npm install
npm run dev
```

## 👨‍💻 Author

**Ganesh K**  

