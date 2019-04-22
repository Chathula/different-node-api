import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import connectDB from './database';
import { errorHandler } from './middlewares';
import { sendQueuedEmail } from './services';

// Routes
import IndexRoutes from './routes';
import ApiRoutes from './routes/api';

// Initializations
const app = express();
app.use(cors());
connectDB();

// Run cron job
sendQueuedEmail();

// settings
app.set('port', process.env.PORT || 2010);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(IndexRoutes);
app.use('/v1', ApiRoutes);

//error handler
app.use(errorHandler());

// Starting the Server
app.listen(app.get('port'), '0.0.0.0', () => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(`Server on port`, app.get('port'));
    }
});

export default app;