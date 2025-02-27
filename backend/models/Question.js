import mongoose from "mongoose";
import {randomUUID} from "crypto";


const TestCaseSchema = new mongoose.Schema({
    input: {
        type: String,
        required: true
    },
    expectedOutput: {
        type: String,
        required: true
    }
})


const QuestionSchema = new mongoose.Schema({
    id : {
        type: String,
        default: randomUUID(),
    },
    question : {
        type: String,
        required: true
    },
    description : { 
        type: String,
        required: true,
        unique: true
    },
    difficulty : {
        type: String,
        required: true
    },

    //testCases: [{ input: '', expectedOutput: '' }]
    testCases : [TestCaseSchema]
})


export default mongoose.model("Question", QuestionSchema);