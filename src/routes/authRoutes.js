import express from 'express';
import { resendOTP, sendOTP, verifyOTP } from '../controller/authController.js';

const authRouter = express.Router();

authRouter.post('/sendOTP',sendOTP);
authRouter.post('/resendOTP',resendOTP);
authRouter.post('/verifyOTP',verifyOTP);

export default authRouter;