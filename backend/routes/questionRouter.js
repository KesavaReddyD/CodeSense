import { Router } from "express";
import { addQuestion, deleteQuestionById, getAllQuestions, getQuestion, updateQuestionById } from "../controllers/questionController.js";
import { codeSubmission } from "../controllers/codeSubmission.js";

const questionRouter = Router();

questionRouter.get('/all', getAllQuestions);
questionRouter.get('/question/:id', getQuestion);
questionRouter.post('/add', addQuestion);
questionRouter.put('/update/:id', updateQuestionById);
questionRouter.delete('/delete/:id', deleteQuestionById);
questionRouter.post('/:id/submit', codeSubmission);

export default questionRouter;