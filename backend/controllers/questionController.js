import Question from "../models/Question.js";

export const getAllQuestions = async (req, res, next) => {
    // console.log("Get all questions");
    try{
        const questions = await Question.find();
        res.status(200).json(questions);
    }catch (error){
        res.json({ message: "error", cause: error.message });
    }
}

export const getQuestionById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const question = await Question.findById(id);
        res.status(200).json(question);
    } catch (error) {
        res.json({ message: "error", cause: error.message });
    }
}

export const getQuestion = async (req, res, next) => {
    try {
        const { id } = req.params;
        const question = await Question
            .findOne({ id: id })
            .exec();
        res.status(200).json(question);
    } catch (error) {
        res.json({ message: "error", cause: error.message });
    }
}

export const addQuestion = async (req, res, next) => {
    try {
        console.log(req.body);
        const { question, description, difficulty, testCases } = req.body;
        console.log(testCases);
        const newQuestion = new Question({ question, description, difficulty, testCases });
        await newQuestion.save();
        res.status(200).json({ message: "question added successfully" });
    } catch (error) {
        res.json({ message: "error", cause: error.message });
    }
}

export const updateQuestionById = async (req, res, next) => {
    try {
        const { question, description, difficulty, testCases } = req.body;
        const { id } = req.params;
        // console.log(id);
        const updatedQuestion = await Question.findOneAndUpdate(
            { id: id }, // Query by your custom `id` field
            {question, description, difficulty, testCases},  // Data to update
            { new: true } // Return the updated document
          ).exec();
        res.status(200).json({ message: "question updated successfully" });
    }
    catch (error) {
        res.json({ message: "error", cause: error.message });
    }
}

export const deleteQuestionById = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Question.findOneAndDelete({ id: id });
        res.status(200).json({ message: "question deleted successfully" });
    }catch (error) {
        res.json({ message: "error", cause: error.message });
    }
};