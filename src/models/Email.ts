import mongoose, { Schema, model } from 'mongoose';

export interface Email extends mongoose.Document {
    to: string,
    subject: string,
    content: string,
    status: object
};

const EmailSchema = new Schema({
    to: String,
    subject: String,
    content: String,
    status: {
        type: String,
        enum: ['SENT', 'QUEUED', 'FAILED'],
    }
});

export default model<Email>('Email', EmailSchema);