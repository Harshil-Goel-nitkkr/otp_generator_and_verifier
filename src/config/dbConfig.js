import { dbUrl } from "./serverConfig.js";
import mongoose from "mongoose";

async function connectDb(){
    try{
        await mongoose.connect(dbUrl);
        console.log("Data base connected");
    }
    catch(error){
        console.log("unable to connect to database");
        console.log(error);
    }
}

export default connectDb;