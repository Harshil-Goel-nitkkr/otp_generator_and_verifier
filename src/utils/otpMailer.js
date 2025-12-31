import nodemailer from 'nodemailer';
import { ownerEmailId, ownerEmailPasscode, ownerName } from '../config/serverConfig.js';

// code copied from "https://nodemailer.com/" and modified accordingly

async function otpMailer(emailId, otp){
    const transporter =await nodemailer.createTransport({ 
        service: 'gmail',
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // Use true for port 465, false for port 587
        auth: {
            user: ownerEmailId,
            pass: ownerEmailPasscode,
        },
    });

    // Send an email using async/await
    return (async () => {
        const info = await transporter.sendMail({
            from: `"${ownerName}" <${ownerEmailId}>`,
            to: emailId,
            subject: "Verification Code from XYZ application",
            text: `Your OTP for logging in XYZ application is ${otp}. This is valid for 10 minutes only.`,
        });

        console.log("Message sent:", info.messageId);
        return info;
    })();
    
}

export default otpMailer;