import mongoose from 'mongoose';

// regex for email "/^([0-9]{9}|[a-z]+(\.[a-z]+)?|[a-z]+)@nitkkr\.ac\.in$/" is generated using
// the site https://rows.com/tools/regex-generator
// only @nitkkr.ac.in emails are valid
// rollno@nitkkr.ac.in "or"  facultyname@nitkkr.ac.in "or" firstname.secondname@nitkkr.ac.in 
// these are valid email format 

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"name is required"],
        trim: true,
    },
    email:{
        type: String,
        required: [true,"email is required"],
        trim: true,
        match: [
            /^([0-9]{9}|[a-z]+(\.[a-z]+)?|[a-z]+)@nitkkr\.ac\.in$/,
            "Please enter a valid NIT KKR email address"
            ]
        },
    otp:{
        type: String,
    },
    otpExpiry:{
        type: Date
    },
    isLoggedIn:{
        type: Boolean,
        default: false
    }
},{
    timestamps:true
});

const userModel = mongoose.model('User',userSchema);
export default userModel;
