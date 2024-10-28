import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    const isTestEnv = process.env.NODE_ENV === 'test';

    const dbName = isTestEnv ? process.env.DB_NAME_TEST  : process.env.DB_NAME ;

    try {
        await mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@db:27017/${dbName}?authSource=admin`);
        console.log(`Connected to MongoDB ${dbName}`);
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

export default connectDB;
