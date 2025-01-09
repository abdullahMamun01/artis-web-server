/* eslint-disable no-undef */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';
import handleEmptyResponse from './app/middleware/handleEmptyResponse';

const app: Application = express();
import fileUpload from 'express-fileupload';




//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors());
// @ts-ignore 
app.use(fileUpload());
app.use(handleEmptyResponse);


//root route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello World',
    success: true,
    statusCode: 200,
  });
});
// application routes
app.use('/api/v1', router);


app.use(globalErrorHandler);
app.use(notFound);

export default app;
