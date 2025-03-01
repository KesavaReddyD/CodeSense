import { Router } from "express";
import { aiFeedback, evaluateSubmission, getAllSubmissions, getSubmissionbyId, updateGradeById } from "../controllers/codeSubmission.js";

const submissionRouter = Router();

submissionRouter.get('/:id', getSubmissionbyId);
submissionRouter.get('/board/all', getAllSubmissions);
submissionRouter.post('/evaluation/:id', evaluateSubmission , aiFeedback);
submissionRouter.get('/test/code', aiFeedback);
submissionRouter.put('/updateGrade/:id', updateGradeById);

export default submissionRouter;