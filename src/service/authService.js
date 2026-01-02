import { fetchUser, updateOtp } from "../repository/userRepository.js";
import otpMailer from "../utils/otpMailer.js";
import jwt from 'jsonwebtoken';
import {tokenSecretKey, tokenExpiryTime} from '../config/serverConfig.js';

async function generateOTP(email){
    const otp = (Math.floor(Math.random()*10000)).toString();
    while(otp.length < 4) otp = "0" + otp;
    const expiryTime = Date.now() + 10*60*1000; // 10 minutes
    const user = await updateOtp(email,otp,expiryTime);
    
    if(!user){
        throw {message: "User not found", statusCode: 404};
    }

    // now send the otp to user
    const response = await otpMailer(email,otp);
    if(!response){
        throw {message: "unable to send otp, Please try again", statusCode: 500}
    }
    return response;
}

async function regenerateOTP(email){
    const otp = (Math.floor(Math.random()*10000)).toString();
    const expiryTime = Date.now() + 10*60*1000; // 10 minutes
    await updateOtp(email,otp,expiryTime);

    // now send the otp to user
    const response = await otpMailer(email,otp);
    if(!response){
        throw {message: "unable to send otp, Please try again", statusCode: 500}
    }
    return response;
}

async function verifyEnteredOTP(email, givenOtp){
    console.log(email);
    const user = await fetchUser(email);
    console.log(user);
    console.log(user.otp);
    console.log(user.otpExpiry);
    if(!user.otp || user.otp === "" || !user.otpExpiry){
        throw {message: "Otp not generated, Please generate otp first", statusCode: 400};
    }

    if(user.expiryTime < Date.now()){
        throw {message: "Otp expired, Please regenerate otp", statusCode: 400};
    }

    if(user.otp != givenOtp){
        throw {message: "Invalid Otp", statusCode: 401};
    }

    user.otp = "";
    user.save();

    console.log("hello");
    // now generate a toke (JWT) and return that token
    console.log(tokenSecretKey);
    console.log(tokenExpiryTime);
    const token = jwt.sign({email: email},tokenSecretKey, {expiresIn:tokenExpiryTime});
    console.log(token);
    return {
        token: token,
    }
}

export {
    generateOTP,
    regenerateOTP,
    verifyEnteredOTP
}