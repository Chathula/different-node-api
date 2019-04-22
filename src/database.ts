import mongoose from 'mongoose';
import { mongodb } from './config';

export default async function connectDB() : Promise<any> {
    try {
        await mongoose.connect(mongodb.URI, {
            useNewUrlParser: true
        });
        if (process.env.NODE_ENV !== 'test') {
            console.log('DB is connected')
        }
    } catch (err) {
        console.error(err)
    }
}

