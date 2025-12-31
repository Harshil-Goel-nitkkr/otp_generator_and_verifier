import express from 'express';
import {port} from './config/serverConfig.js';
import authRouter from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import connectDb from './config/dbConfig.js';

const app = express();

app.listen(port,async ()=>{
    await connectDb();
    console.log("Running on port " + port);
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.text());
app.use(cookieParser());

app.get('ping',(req,res)=>{
    return res.status(201).json({
        message: "pong"
    });
});

app.use('/auth',authRouter);