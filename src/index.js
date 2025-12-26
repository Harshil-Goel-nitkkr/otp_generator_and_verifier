import express from 'express';
import {port} from './config/serverConfig';
import authRouter from './routes/authRoutes';
import cookieParser from 'cookie-parser';

const app = express();

app.listen(port,()=>{
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