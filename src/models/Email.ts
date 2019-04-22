import mongoose, { Schema, model } from 'mongoose';

export interface Email extends mongoose.Document {
    to: string,
    subject: string,
    content: string,
    status: object,
};

const EmailSchema = new Schema({
    to: String,
    subject: String,
    content: String,
    status: {
        type: String,
        enum: ['SENT', 'QUEUED', 'FAILED'],
    },
}, {
    timestamps: true
});

EmailSchema.methods = {
    toJSON() {
        return {
            id: this._id,
            status: this.status,
        }
    }
}

export default model<Email>('Email', EmailSchema);