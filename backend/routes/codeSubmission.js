import { Router } from 'express';

const codeRouter = Router();


codeRouter.post('/submit', (req, res) => {
    console.log(req.body);
    res.status(200).json({ message: "Code submitted successfully" });
}
);

export default codeRouter;