# MERN Stack Authentication App

A complete authentication system built with the **MERN stack** – featuring registration, login, profile management, password reset via OTP, and protected routes.

---

## 🔧 Tech Stack

- **Frontend:** React, React Router, Formik, React Hot Toast  
- **Backend:** Node.js, Express  
- **Database:** MongoDB (with Mongoose)  
- **Authentication:** JWT (JSON Web Token), Bcrypt  
- **Email Service:** Nodemailer  
- **Utilities:** Axios, dotenv  

---

## ✨ Key Features

- ✅ **User Registration** (with fields: `firstName`, `lastName`, `mobile`, `address`, `city`)  
- 🔐 **JWT-Based Login**  
- 👤 **View & Update User Profile**  
- 🔁 **OTP-Based Password Reset** via Email  
- 🔒 **Protected Routes** with Token Verification  
- 🖼️ **Profile Image Upload** (Base64 encoded)

---

## 📁 Project Structure

```
mern-login-app/
├── client/               # React Frontend
│   ├── components/
│   ├── pages/
│   ├── helper/
│   ├── store/
│   ├── Styles/
│   └── main.jsx
├── server/               # Express Backend
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

### 1. Clone the Repository

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

Create a `.env` file inside the `server/` directory with the following content:

```
PORT=8080
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password
```

Start the backend server:

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

---

## 👨‍💻 Author

**Ganesh K**
