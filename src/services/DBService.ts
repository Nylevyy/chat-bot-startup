import { Sequelize } from 'sequelize';

const getDbInstance = () => new Sequelize({ dialect: 'postgres' });

export const db = getDbInstance();
