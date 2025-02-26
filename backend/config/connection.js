import mongoose from "mongoose";


export const dbconnection = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
    }catch(err){
        console.error(err);
        throw new Error("there is some error connecting database");
    }
}

export const dbdisconnect = async () => {
    try{
       await mongoose.disconnect();
    }catch(err){
        console.error(err);
        throw new Error("there is some error disconnecting database");
    }
}