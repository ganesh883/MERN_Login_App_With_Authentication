User Flow Summary

Register → Login → Dashboard/Profile → Forgot Password (OTP flow) → Reset Password

🔐 1. User Registration

Frontend:

User fills the registration form: name, username, email, phone, address, password.

On submit, data is sent via axios.post('/api/register', { ... }).

Backend:

Express receives data in /api/register route.

Password is hashed using bcryptjs.

User data is stored in MongoDB using mongoose.

✅ Result: New user is added to the database.

🔑 2. Login Process

Frontend:

User enters username + password.

On submit, axios.post('/api/login') is called.

If login is successful, a JWT token is returned and stored in localStorage.

Backend:

/api/login checks if user exists.

Compares hashed password using bcrypt.compare().

If matched, signs JWT with secret key.

✅ Result: User is authenticated and can access protected routes.

🔐 3. JWT Authentication

Each protected API or page checks for a valid JWT token.

AuthorizeUser (React component) blocks routes if no token is found.

Backend uses middleware to decode and verify token.

✅ Result: Secure session management.

🔁 4. Password Recovery (OTP Flow)

Step 1: Forgot Password
User clicks "Forgot Password".

generateOTP() is called → triggers /api/generateOTP.

Step 2: Email Sending
OTP is generated on backend and stored in app.locals.

Email with OTP is sent using nodemailer.

Step 3: OTP Verification
User enters OTP → verified via /api/verifyOTP.

Step 4: Reset Password
After verification, user is redirected to reset page.

New password is submitted to /api/resetPassword.

✅ Result: User can recover access without admin help.

👤 5. Profile Page

On visiting /profile, React calls useFetch('user/username') using stored token.

Backend validates token, fetches user data, and sends it.

Profile data is displayed on frontend with the option to update.

✅ Result: Authenticated user can view and edit their profile.

⚙️ Technologies & Tools Used

Purpose	Tool / Library
Frontend	React, Tailwind CSS
Routing	React Router DOM
State Mgmt	Zustand (auth store)
Form Handling	Formik
Validation	Custom (validate.js)
Backend	Node.js, Express
DB	MongoDB, Mongoose
Auth	JWT, bcryptjs
Email OTP	Nodemailer

📁 Folder Structure Overview


📦 client/ (React)
 ┣ 📂 components/
 ┣ 📂 helper/       ← API calls (axios)
 ┣ 📂 store/        ← Zustand store
 ┣ 📂 Styles/       ← Tailwind CSS
 ┗ App.js

📦 server/ (Node)
 ┣ 📂 controllers/
 ┣ 📂 middleware/
 ┣ 📂 routes/
 ┣ 📂 model/
 ┗ index.js


📌 Summary

This MERN stack project is a fully functional login system with:

✅ Secure registration/login using JWT
✅ Role-based protection using middleware
✅ Real-world forgot-password flow with email OTP
✅ Clean frontend design using Tailwind
✅ API separation via helper.js and React hooks

