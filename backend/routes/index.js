import { Router } from "express";
import authRouter from "./authRouter.js";
const appRouter = Router();



// appRouter.use('/users', userRouter);
appRouter.use('/users', authRouter);
appRouter.use('/questions', )
    

export default appRouter;