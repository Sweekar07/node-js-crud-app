# 🛠️ IMF Gadget API

A secure API to manage an inventory of high-tech gadgets, built using **Node.js, Express, and PostgreSQL** with a **Sequelize ORM**.

## 🚀 Features

### 🛂 User Authentication Routes (`/api`)
- **POST /register**: Register a new user.
- **POST /login**: Log in an existing user.
- **GET /getUsers**: Retrieve all registered users (protected route requiring authentication).

### ⚙️ Gadget Inventory (`/api/gadgets`) (protected route requiring authentication)
- **GET**: Retrieve all gadgets, each with a randomly generated mission success probability.
- **POST**: Add a new gadget with a unique, randomly generated codename.
- **PATCH**: Update an existing gadget's information.
- **DELETE**: Mark a gadget as "Decommissioned" instead of permanently deleting it, including a timestamp.
- **GET /gadgets?status={status}**: Retrieve gadgets filtered by status.

### 💥 Self-Destruct Sequence (`/gadgets/{id}/self-destruct`)
- **POST**: Trigger a self-destruct sequence for a gadget, requiring a randomly generated confirmation code.

### 🔐 Security & Authentication
- Implements **JWT-based authentication and authorization** to protect API endpoints.

### 🏗️ Tech Stack
- **Node.js** & **Express.js** for the backend.
- **PostgreSQL** as the database.
- **ORM:** Sequelize.
- **Docker** for containerization.

### 🚀 Deployment
- API is deployed on **Render**.

### 📖 Documentation
- API endpoints documented using **Swagger**. [live_swagger_link](https://node-js-crud-app-aute.onrender.com/api-docs/)
- The backend API can be tested with **Postman**.

### 📌 Getting Started
Check out the [local setup guide](./LOCAL_SERVER_SETUP.md) and [deployment guide](./DEPLOY_TO_PROD.md) for details on running this API.

