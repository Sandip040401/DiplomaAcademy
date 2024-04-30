import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectUsingMongoose = async() => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('Database is connected using Mongoose');
    } catch (err) {
        console.log('database config error');
        console.log(err);
    }
}