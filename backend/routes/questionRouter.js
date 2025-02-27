import { Router } from "express";
import { addQuestion, deleteQuestionById, getAllQuestions, getQuestion, updateQuestionById } from "../controllers/questionController.js";

const questionRouter = Router();

questionRouter.get('/all', getAllQuestions);
questionRouter.get('/question/:id', getQuestion);
questionRouter.post('/add', addQuestion);
questionRouter.put('/update/:id', updateQuestionById);
questionRouter.delete('/delete/:id', deleteQuestionById);
questionRouter.post('/:id/submit', (req, res) => {
    console.log(req.body);
    res.status(200).json({ message: "Code submitted successfully" });
});

export default questionRouter;