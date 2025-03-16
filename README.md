# 🚀 AI-Deal-Finder - Setup & Run Guide

## 📌 **Project Overview**
AI-Deal-Finder is a MERN stack application that helps users find the best deals across various e-commerce platforms. It integrates **Google Authentication**, **Web Scraping**, and an AI-powered search system.

---

## 📌 **Tech Stack**
### **Frontend**  
- React.js  
- React Router  
- TailwindCSS  
- React Toastify (for notifications)  
- React Icons  

### **Backend**  
- Node.js  
- Express.js  
- MongoDB with Mongoose  
- JWT Authentication  
- Google OAuth with Passport.js  
- CORS Middleware  

---

## 📌 **Setup Instructions**
### **1️⃣ Frontend Setup**
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm start
   ```

---

### **2️⃣ Backend Setup**
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the **backend** folder and add the following environment variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
   PORT=5000
   FRONTEND_URL=http://localhost:3000 
   ```
4. Run the backend server:
   ```sh
   npm start
   ```
   or with **nodemon** (for hot reload):
   ```sh
   npm run dev
   ```

---

## 📌 **Dependencies Used**
### **Frontend**
- `react-router-dom`
- `react-toastify`
- `react-icons`

### **Backend**
- `express`
- `cors`
- `dotenv`
- `mongoose`
- `jsonwebtoken`
- `passport`
- `passport-google-oauth20`
- `bcryptjs`
- `nodemon` (for development)

---

## 📌 **Authentication**
- Users can **sign up** using email and password.
- Users can **log in** using Google OAuth.
- JWT tokens are used for **secure authentication**.
- Logout functionality is implemented.

---

## 📌 **Contributors**
- **Frontend:** Nikhil  
- **Backend:** Raghava  
- **Web Scraping:** Praharsha    

---
```
