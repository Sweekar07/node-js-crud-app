// We will use this file to have the connection between postgress and db

import Sequelize from "sequelize";      // creating sequalize object or "const Sequelize = require('sequelize');"

const sequelize = new Sequelize(
    process.env.PG_DB,
    process.env.PG_USER,
    process.env.PG_PASSWORD,
    {
        host: process.env.PG_HOST,  // imp line to create a connection between db and application running in the container i.e. using container_names and not ids
        dialect: 'postgres',   // becoz Sequelize is an ORM that helps to build our app
    }
)     // creating an instance of above (new = create new object )

export default sequelize;
