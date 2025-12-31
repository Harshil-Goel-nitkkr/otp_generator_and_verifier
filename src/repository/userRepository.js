import userModel from "../schema/userSchema.js"

async function fetchUser(email){
    try{
        const user = await userModel.find({email:email});
        return user;
    }
    catch(error){
        console.log(error);
    }
}

async function updateOtp(email,otp,expiryTime){
    console.log(email);
    try{
        const user = await userModel.findOneAndUpdate({email:email},{otp:otp, otpExpiry: expiryTime});
        return user;
    }
    catch(error){
        console.log(error);
    }
}

export {
    fetchUser,
    updateOtp
}