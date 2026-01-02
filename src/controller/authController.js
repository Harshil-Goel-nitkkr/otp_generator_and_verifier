import { generateOTP, regenerateOTP, verifyEnteredOTP } from "../service/authService.js";

async function sendOTP(req,res){
    try{
        const response = await generateOTP(req.body.email);
        return res.status(200).json({
            success: true,
            data: response,
            error: {},
            message: "otp sent successfully"
        });
    }
    catch(error){
        if(error.statusCode){
            return res.status(error.statusCode).json({
                success: false,
                data: {},
                error: error,
                message: error.message
            });
        }
        res.status(500).json({
            success: false,
            data: {},
            error: error,
            message: "unknown error occurred"
        });
    }
}

async function resendOTP(req,res){
    try{
        const response = await regenerateOTP(req.body.email);
        return res.status(200).json({
            success: true,
            data: response,
            error: {},
            message: "otp sent successfully"
        });
    }
    catch(error){
        if(error.statusCode){
            return res.status(error.statusCode).json({
                success: false,
                data: {},
                error: error,
                message: error.message
            });
        }
        res.status(500).json({
            success: false,
            data: {},
            error: error,
            message: "unknown error occurred"
        });
    }
}

async function verifyOTP(req,res){
    console.log(req.body.email);
    try{
        const response = await verifyEnteredOTP(req.body.email, req.body.otp);
        res.cookie('Token', response.token, {
            httpOnly: true,  // Prevents client-side JavaScript from accessing the cookie
            maxAge: 7*24*60*60*1000,
            secure: true,    // Recommended: ensures the cookie is only sent over HTTPS in production
            sameSite: 'Lax'
        });
        res.status(200).json({
            success: true,
            data: response,
            error: {},
            message: "OTP verified and token generated"
        });
        
    }
    catch(error){
        if(error.statusCode){
            return res.status(error.statusCode).json({
                success: false,
                data: {},
                error: error,
                message: error.message
            });
        }
        return res.status(500).json({
            success: false,
            data: {},
            error: error,
            message: "unknown error occurred"
        });
    }
}

export {
    sendOTP,
    resendOTP,
    verifyOTP
};