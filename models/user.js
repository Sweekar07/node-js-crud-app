import { DataTypes } from 'sequelize';
import db from '../util/database.js';

const User = db.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user', // Default role
    },
});

export { User };
