import express from 'express';
import { swaggerUi, specs } from './swagger.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
const { json, urlencoded } = bodyParser;
import sequelize from './util/database.js';
import { router as authRouter } from './routes/auth_routes.js';
import { router as gadgetsRoutes } from './routes/gadgets_routes.js';
import { router as userRoutes } from './routes/user_routes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(json())
app.use(urlencoded({ extended: false }));

// CORS Middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");  // remove the cors problem
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// test route
app.get('/', (req, res, next) => {
    res.json({
        status: 'healthy',
        time: new Date().toISOString(),
        help: 'Use /help route to view all the routes'
    });
});

// Example /help route (to list all the available routes and methods associated with expected query and params)
app.get('/help', (req, res) => {
    const routes = [
        { path: '/', method: 'GET', description: 'Health check and current time' },
        { path: '/help', method: 'GET', description: 'List all available routes' },
        { path: '/api/auth/register', method: 'POST', description: 'Register a new user (new user must register then login)', expectedParams: 'username, password (in body)' },
        { path: '/api/auth/login', method: 'POST', description: 'Log in an existing user (authentication token generated)', expectedParams: 'username, password (in body)' },
        { path: '/api/getUsers', method: 'GET', description: 'Get all users (requires authentication)', expectedQuery: 'None', expectedParams: 'None' },
        { path: '/api/gadgets', method: 'GET', description: 'Get all gadgets (requires authentication)', expectedQuery: 'status (optional)', expectedParams: 'None' },
        { path: '/api/gadgets', method: 'POST', description: 'Create a new gadget (requires authentication)', expectedQuery: 'None', expectedParams: 'name (in body)' },
        { path: '/api/gadgets/:id', method: 'PATCH', description: 'Update a gadget (requires authentication)', expectedQuery: 'None', expectedParams: 'id (in path), name, status (in body)' },
        { path: '/api/gadgets/:id', method: 'DELETE', description: 'Decommission a gadget (requires authentication)', expectedQuery: 'None', expectedParams: 'id (in path)' },
        { path: '/api/gadgets/:id/self-destruct', method: 'POST', description: 'Self-destruct a gadget (requires authentication)', expectedQuery: 'None', expectedParams: 'id (in path), confirmationCode (in body)' }
    ];
    res.json(routes);
});

// auth routes
app.use('/api', authRouter);
// User routes
app.use('/api', userRoutes);
// CRUD routes
app.use('/api', gadgetsRoutes); // imported the routes.

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// error handling
app.use((error, req, res, next) => {
    console.log("Error in route:\n", error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message});
});

// Sync database and start server
const startServer = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log("Database connected successfully!");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Error while connecting to database:", err);
    }
};

startServer();
