<div align="center">
  <br />
      <img src="../FE/public/infobasic.png" alt="Project Banner">
  <br />

  <div>
    <img src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white" />
    <img src="https://img.shields.io/badge/-Clerk-3D4DB7?style=for-the-badge&logo=clerk&logoColor=white" />
    <img src="https://img.shields.io/badge/-Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white" />
    <img src="https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
    <img src="https://img.shields.io/badge/-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
    <img src="https://img.shields.io/badge/-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="vercel" />
    <img src="https://img.shields.io/badge/-Render-46E3B7?style=for-the-badge&logo=render&logoColor=000000" alt="render" />
    <img src="https://img.shields.io/badge/-Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="axios" />

  <!-- Express.js -->
  <img src="https://img.shields.io/badge/-Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  </div>

  <h3 align="center">A Website Ecommerce With Multiple Attribute For Product</h3>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## <a name="introduction">🤖 Introduction</a>

FabricFocus E-commerce is a full-stack e-commerce platform built with React.js, TypeScript, and Node.js. It includes both a public-facing user application and an admin dashboard, offering a wide range of functionalities. The project aims to provide a complete, scalable, and user-friendly e-commerce solution for both customers and administrators.

## <a name="tech-stack">⚙️ Tech Stack</a>

- React
- Tailwind CSS
- Axios (HTTP client)
- React Query
- Clerk
- Socket IO
- Node.js
- Express.js
- MongoDB
- Vercel (Deploy frontend)
- Render (Deploy backend)
- Nodemailer

## <a name="features">🔋 Features</a>

### Features of the FabricFocus E-commerce

User Features:

👉 User authentication (Login/Register)

👉 Product browsing and purchasing

👉 Cart and favorite product management

👉 Post-purchase reviews and order history

👉 Online payment integration

👉 Personal information management

👉 Real-time messaging with Admin

Admin Features:

👉 Dashboard with statistics

👉 Product, category, and attribute management

👉 Voucher and discount management

👉 Order and user management

👉 Blog/post management

👉 Slider and logo configuration

👉 Review moderation

and many more, including code architecture and reusability

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/luonq004/FabricFocus_E-commerce
```

**Installation Backend**

```bash
cd BE
```

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
DB_URI=
SECRET_KEY=
PORT=

CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# vnPay
VNP_TMN_CODE=
VNP_HASH_SECRET=
VNP_URL=
VNP_API=
VNP_RETURN_URL=

# gui mail
GMAIL_USER=
GMAIL_PASS=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Replace the placeholder values with your actual Database URL (DB_URI), Clerk key, VNPay, info Email and Cloudinary. You can obtain these credentials by signing up on the [MongoDB](https://cloud.mongodb.com/), [Clerk](https://clerk.com/), [VNPay](https://sandbox.vnpayment.vn/apis/docs/thanh-toan-token/token.html), [Email](https://myaccount.google.com/u/2/signinoptions/twosv) and [Cloudinary](https://cloudinary.com/).

**Running the Project**

```bash
npm run dev
```

**Installation Frontend**

```bash
cd FE
```

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
VITE_API_URL
VITE_API_URL_SOCKET
VITE_CLERK_PUBLISHABLE_KEY

VITE_CLOUDINARY_CLOUD_NAME
VITE_CLOUDINARY_CLOUD_FOLDER_NAME
VITE_CLOUDINARY_API_KEY
VITE_CLOUDINARY_API_SECRET
```

Replace the placeholder values with your actual API Backend, Cloudinary and Clerk key. You can obtain these credentials by signing up on the [Cloudinary](https://cloudinary.com/) and [Clerk](https://clerk.com/).

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.
