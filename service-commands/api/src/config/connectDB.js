import Sequelize from 'sequelize';

const connectDb = async () => {
  const isTestEnv = process.env.NODE_ENV === 'test';
  const dbName = isTestEnv ? process.env.DB_NAME_TEST : process.env.DB_NAME;

  const db = new Sequelize(dbName, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: (msg) => console.log(`SQL Query: ${msg}`)
  });

  try {
    await db.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  return db;
};

export default connectDb;
