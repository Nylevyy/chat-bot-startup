import { Sequelize } from 'sequelize';
import { PASSWORD, USERNAME } from '../consts';

const getDbInstance = () =>
  new Sequelize({
    dialect: 'postgres',
    database: 'test_db',
    host: '109.71.13.85',
    port: 6432,
    username: USERNAME,
    password: PASSWORD,
  });

export const db = getDbInstance();
