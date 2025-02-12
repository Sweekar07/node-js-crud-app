// We will use this file to have the connection between postgress and db

import dotenv from 'dotenv';
import { Sequelize } from 'sequelize'; // Corrected import statement

dotenv.config();

let sequelize; // Declare sequelize outside the conditional blocks

if (process.env.NODE_ENV === 'DEV') {
    sequelize = new Sequelize(
        process.env.POSTGRES_DB,
        process.env.POSTGRES_USER,
        process.env.POSTGRES_PASSWORD,
        {
            host: process.env.POSTGRES_HOST,
            dialect: 'postgres',
            port: process.env.POSTGRES_PORT,
        }
    );
} else {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
}

export default sequelize;
