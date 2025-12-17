import express from 'express';
import { type Application } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from '@repo/zod-schemas/environment/environments.z.js';
import { globalErrorHandler } from 'controller/error/error.master.controller.js';
import cors from 'cors';
import { corsOptions } from '@constants/cors.options.js';
import { userRouter } from 'api/user.api.js';
import { mutualFundRouter } from 'api/mutualFund.api.js';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOptions));

// API routes
app.use(env.BASE_API_ENDPOINT, userRouter);
app.use(`${env.BASE_API_ENDPOINT}/mutual-funds`, mutualFundRouter);
app.get('/test', (_req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is working fine',
  });
});

app.use(globalErrorHandler);

export { app };
