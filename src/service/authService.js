import { fetchUser, updateOtp } from "../repository/userRepository";
import otpMailer from "../utils/otpMailer";
import jwt from 'jsonwebtoken';
import {tokenSecretKey, tokenExpiryTime} from '../config/serverConfig';

async function generateOTP(email){
    const otp = (Math.floor(Math.random()*10000)).toString();
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
    const user = await fetchUser(email);
    if(!user.otp || !user.otpExpiry){
        throw {message: "Otp not generated, Please generate otp first", statusCode: 400};
    }

    if(user.expiryTime < Date.now()){
        throw {message: "Otp expired, Please regenerate otp", statusCode: 400};
    }

    if(user.otp != givenOtp){
        throw {message: "Invalid Otp", statusCode: 401};
    }

    user.otp = undefined;
    user.otpexpiry = undefined;

    // now generate a toke (JWT) and return that token
    const token = jwt.sign({email: email},tokenSecretKey,{algorithm: 'RS256'}, {expiresIn:tokenExpiryTime});

    return {
        token: token,
    }
}

export {
    generateOTP,
    regenerateOTP,
    verifyEnteredOTP
}