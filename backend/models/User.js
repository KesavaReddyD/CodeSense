import mongoose from "mongoose";
import {randomUUID} from "crypto";

const userSchema = new mongoose.Schema({
    id : {
        type: String,
        default: randomUUID(),
    },
    name : {
        type: String,
        required: true
    },
    email : { 
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    role : {
        type: String,
        required: true
    },
    institution : {
        type: String,
        required: true
    },
})


export default mongoose.model("User", userSchema);