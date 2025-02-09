// To create tables of gadget

import { DataTypes } from 'sequelize';
import db from '../util/database.js';

const Gadgets = db.define(
    'gadgets', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        codename: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        successProbability: {
            type: DataTypes.INTEGER,
            allowNull: false, // Allow NULL values
        },
        decommissionedTimestamp: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    }
); 

export { Gadgets }
