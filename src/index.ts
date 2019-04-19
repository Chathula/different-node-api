import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import connectDB from './database';

// Routes
import IndexRoutes from './routes';
import ApiRoutes from './routes/api';

// Initializations
const app = express();
connectDB();

// settings
app.set('port', process.env.PORT || 2010);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(IndexRoutes);
app.use('/v1', ApiRoutes);

//error handler
app.use(function (err : any, req : Request, res : Response, next : NextFunction) {
    if (err.isBoom) {
         return res.status(err.output.statusCode).json(err.output.payload);
    }
});

// Starting the Server
app.listen(app.get('port'), () => {
    console.log(`Server on port`, app.get('port'));
});