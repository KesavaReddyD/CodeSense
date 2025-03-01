import { Router } from "express";
import { aiFeedback, evaluateSubmission, getSubmissionbyId } from "../controllers/codeSubmission.js";

const submissionRouter = Router();

submissionRouter.get('/:id', getSubmissionbyId);
submissionRouter.post('/evaluation/:id', evaluateSubmission , aiFeedback);
submissionRouter.get('/test/code', aiFeedback);

export default submissionRouter;