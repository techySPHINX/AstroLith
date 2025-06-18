# AstroLith

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0.5-646cff?logo=vite)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-brightgreen?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21.2-black?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.8.4-47A248?logo=mongodb)](https://mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.8.1-black?logo=socket.io)](https://socket.io/)
[![WebContainer](https://img.shields.io/badge/WebContainer-API-ffcb05)](https://webcontainers.io/)
[![Google Gemini AI](https://img.shields.io/badge/Google%20Gemini%20AI-API%20Key-8E75B2?logo=google-gemini&logoColor=white)](https://ai.google.dev/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#)

---

## 🚀 Overview

**AstroLith** is a full-stack, generative AI-powered software engineering agentic-platform that acts as a MERN stack developer, generating and serving code dynamically using WebContainer technology. The application features a robust backend with Node.js, Express, MongoDB, Redis, and Google Gemini AI, and a modern frontend built with React, Vite, and a suite of developer-focused tools for real-time, collaborative, and AI-powered coding experiences[#1][#6].

---

## 🧩 Key Features

- **Generative AI Developer**: Acts as a MERN stack engineer, generating code based on user prompts and serving it instantly via WebContainer[#1][#6].
- **WebContainer Integration**: Run Node.js code directly in the browser for a seamless, serverless development experience[#1][#6].
- **Real-Time Collaboration**: Powered by Socket.io for instant updates and multi-user interaction[#1][#6].
- **Project & User Management**: Create, update, and manage projects; add users to projects; maintain a file tree per project; secure authentication with hashed passwords[#1][#6].
- **AI Integration**: Leverage Google Gemini AI for content generation and smart project assistance[#1][#6].
- **Redis Caching**: Fast, scalable caching for improved performance[#1][#6].
- **RESTful API**: Clean, modular, and well-documented endpoints[#1][#6].
- **Modern UI/UX**: Built with React 18, React Router v7, and Remixicon for a fast, responsive, and beautiful interface[#1][#6].
- **Markdown & Syntax Highlighting**: Supports markdown rendering and code highlighting for documentation and code previews[#1][#6].
- **Developer Experience**: Integrated ESLint, React hooks linting, and Vite for fast builds and hot reloading[#1][#6].

---

## 🏗️ Tech Stack

### Frontend

| Technology           | Purpose                                 |
|----------------------|-----------------------------------------|
| **React 18**         | Component-based UI                      |
| **Vite**             | Lightning-fast build tool & dev server  |
| **@webcontainer/api**| In-browser Node.js runtime              |
| **Socket.io-client** | Real-time communication                 |
| **Axios**            | HTTP client for API requests            |
| **React Router v7**  | Client-side routing                     |
| **Remixicon**        | Icon library                            |
| **highlight.js**     | Syntax highlighting                     |
| **markdown-to-jsx**  | Markdown rendering                      |
| **ESLint**           | Code linting and quality                |[#1][#6]

### Backend

| Technology                | Purpose                                 |
|---------------------------|-----------------------------------------|
| **Node.js**               | Backend runtime                         |
| **Express**               | API server                              |
| **MongoDB**               | Database                                |
| **Mongoose**              | MongoDB ODM                             |
| **Socket.io**             | Real-time communication                 |
| **Redis (ioredis)**       | Caching and session storage             |
| **Google Gemini AI**      | Generative AI services                  |
| **bcrypt**                | Password hashing                        |
| **jsonwebtoken**          | Authentication                          |
| **dotenv**                | Environment variable management         |
| **morgan**                | HTTP request logging                    |
| **express-validator**     | Input validation                        |[#1][#6]

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** (v20.x recommended)
- **npm** (v9.x+)
- **MongoDB** instance
- **Redis** instance
- **Google Gemini AI API Key**

### 1. Clone the repository

```bash
git clone https://github.com/techySPHINX/AstroLith
cd AstroLith
```

### 2. Setup Backend

```bash
cd backend
npm install
```

- Create a `.env` file in the `backend` directory with the following content:
 ```
 MONGODB_URI=your_mongodb_connection_string
 REDIS_HOST=your_redis_host
 REDIS_PORT=your_redis_port
 REDIS_PASSWORD=your_redis_password
 GOOGLE_AI_KEY=your_google_gemini_api_key
 ```

- Start the backend server:
 ```bash
 npm start
 ```



### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

- Start the development server:
 ```bash
 npm run dev
 ```

- Build for production:
 ```bash
 npm run build
 ```

- Preview the production build:
 ```bash
 npm run preview
 ```


---

## 🏷️ Tags

`#GenerativeAI` `#MERN` `#React` `#Vite` `#WebContainer` `#SocketIO` `#Frontend` `#Backend` `#NodeJS` `#Express` `#MongoDB` `#Redis` `#GoogleGeminiAI` `#AI` `#CodeGeneration` `#DeveloperTools` `#Collaboration`

---

## 📄 License

This project is licensed under the ISC License[#1].

---

## 🙏 Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [WebContainer API](https://webcontainers.io/)
- [Socket.io](https://socket.io/)
- [Remixicon](https://remixicon.com/)
- [highlight.js](https://highlightjs.org/)
- [markdown-to-jsx](https://github.com/probablyup/markdown-to-jsx)
- [Axios](https://axios-http.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://mongodb.com/)
- [Redis](https://redis.io/)
- [Google Gemini AI](https://ai.google.dev/)

---

> For questions, issues, or feature requests, please open an issue or contact the maintainer.
