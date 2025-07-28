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

**AstroLith** is a cutting-edge, full-stack, generative AI-powered software engineering platform. It functions as a MERN stack developer, dynamically generating and serving code using WebContainer technology. This robust application features a Node.js, Express, MongoDB, and Redis backend, integrated with Google Gemini AI. The modern frontend, built with React and Vite, offers a comprehensive suite of developer tools for real-time, collaborative, and AI-enhanced coding experiences, including advanced version control and intelligent code assistance.

---

## 🧩 Key Features

-   **Generative AI Developer**: Acts as a MERN stack engineer, generating code based on user prompts and serving it instantly via WebContainer.
-   **WebContainer Integration**: Run Node.js code directly in the browser for a seamless, serverless development experience.
-   **Real-Time Collaborative Editor**: Powered by Y.js and Monaco Editor for instant, conflict-free multi-user code editing with real-time cursor synchronization.
-   **Role-Based Access Control (RBAC)**: Granular permissions (Owner, Editor, Viewer) for project collaborators, ensuring secure and controlled access to project resources.
-   **Git Integration (GitHub API)**: Seamlessly commit, branch, pull, and manage code versions directly from the platform using the GitHub API.
-   **Project & User Management**: Create, update, and manage projects; add users to projects; maintain a file tree per project; secure authentication with hashed passwords.
-   **Enhanced AI Integration**: Leverage Google Gemini AI for:
    *   **AI-Powered Code Completion**: Intelligent code suggestions as you type.
    *   **AI-Powered Debugging**: Analyze code and error details to identify and suggest fixes for bugs.
    *   **AI-Powered Code Review**: Automated review of code for best practices, potential bugs, security vulnerabilities, and style issues.
-   **Redis Caching**: Fast, scalable caching for improved performance.
-   **RESTful API**: Clean, modular, and well-documented endpoints.
-   **Modern UI/UX**: Built with React 18, React Router v7, and Remixicon for a fast, responsive, and beautiful interface.
-   **Markdown & Syntax Highlighting**: Supports markdown rendering and code highlighting for documentation and code previews.
-   **Developer Experience**: Integrated ESLint, React hooks linting, and Vite for fast builds and hot reloading.

---

## 🏗️ Tech Stack

### Frontend

| Technology           | Purpose                                 |
| :------------------- | :-------------------------------------- |
| **React 18**         | Component-based UI                      |
| **Vite**             | Lightning-fast build tool & dev server  |
| **@webcontainer/api**| In-browser Node.js runtime              |
| **Socket.io-client** | Real-time communication                 |
| **Axios**            | HTTP client for API requests            |
| **React Router v7**  | Client-side routing                     |
| **Remixicon**        | Icon library                            |
| **highlight.js**     | Syntax highlighting                     |
| **markdown-to-jsx**  | Markdown rendering                      |
| **ESLint**           | Code linting and quality                |
| **monaco-editor**    | Advanced code editor (VS Code editor)   |
| **y-monaco**         | Monaco Editor binding for Y.js          |
| **yjs**              | Conflict-free Replicated Data Types (CRDT)|
| **y-websocket**      | WebSocket connector for Y.js            |

### Backend

| Technology                | Purpose                                 |
| :------------------------ | :-------------------------------------- |
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
| **express-validator**     | Input validation                        |
| **@octokit/rest**         | GitHub API interaction                  |
| **y-websocket**           | WebSocket server for Y.js               |
| **yjs**                   | Conflict-free Replicated Data Types (CRDT)|

---

## ⚡ Getting Started

### Prerequisites

-   **Node.js** (v20.x recommended)
-   **npm** (v9.x+)
-   **MongoDB** instance
-   **Redis** instance
-   **Google Gemini AI API Key**
-   **GitHub Personal Access Token (PAT)**: Required for Git integration features. Generate one with `repo` scope from [GitHub Developer Settings](https://github.com/settings/tokens).

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

-   Create a `.env` file in the `backend` directory with the following content:
    ```
    MONGODB_URI=your_mongodb_connection_string
    REDIS_HOST=your_redis_host
    REDIS_PORT=your_redis_port
    REDIS_PASSWORD=your_redis_password
    GOOGLE_AI_KEY=your_google_gemini_api_key
    JWT_SECRET=your_jwt_secret
    ```

-   Start the backend server:
    ```bash
    npm start
    ```

-   Start the Y.js WebSocket server (for real-time collaboration):
    ```bash
    npm run y-server
    ```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

-   Start the development server:
    ```bash
    npm run dev
    ```

-   Build for production:
    ```bash
    npm run build
    ```

-   Preview the production build:
    ```bash
    npm run preview
    ```

---

## 🏷️ Tags

`#GenerativeAI` `#MERN` `#React` `#Vite` `#WebContainer` `#SocketIO` `#Frontend` `#Backend` `#NodeJS` `#Express` `#MongoDB` `#Redis` `#GoogleGeminiAI` `#AI` `#CodeGeneration` `#DeveloperTools` `#Collaboration` `#Realtime` `#GitIntegration` `#GitHubAPI` `#RBAC` `#MonacoEditor` `#Yjs`

---

## 📄 License

This project is licensed under the ISC License.

---

## 🙏 Acknowledgements

-   [React](https://react.dev/)
-   [Vite](https://vitejs.dev/)
-   [WebContainer API](https://webcontainers.io/)
-   [Socket.io](https://socket.io/)
-   [Remixicon](https://remixicon.com/)
-   [highlight.js](https://highlightjs.org/)
-   [markdown-to-jsx](https://github.com/probablyup/markdown-to-jsx)
-   [Axios](https://axios-http.com/)
-   [Node.js](https://nodejs.org/)
-   [Express](https://expressjs.com/)
-   [MongoDB](https://mongodb.com/)
-   [Redis](https://redis.io/)
-   [Google Gemini AI](https://ai.google.dev/)
-   [Monaco Editor](https://microsoft.github.io/monaco-editor/)
-   [Y.js](https://docs.yjs.dev/)
-   [Octokit](https://octokit.github.io/rest.js/)

---

> For questions, issues, or feature requests, please open an issue on our GitHub repository: [https://github.com/techySPHINX/AstroLith](https://github.com/techySPHINX/AstroLith)