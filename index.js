import express from 'express';
import bodyParser from 'body-parser';
const { json, urlencoded } = bodyParser;
import sequelize from './util/database.js';
import { router as gadgetsRoutes } from './routes/gadgets_routes.js';

const app = express();

app.use(json())
app.use(urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");  // remove the cors problem
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

// test route
app.get('/', (req, res, next) => {
    res.send('Hello world!')
});

// Crud routes
app.use('', gadgetsRoutes); // imported the routes.


// error handling
app.use((error, req, res, next) => {
    console.log("Error in route:\n", error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message});
});

// sync databases
sequelize.sync({ alter: true }).then(result => {
    console.log("Database connected successfully!");
    app.listen(3000);
})
.catch(err => {console.log("Error while connecting to data base:\n", err)})
