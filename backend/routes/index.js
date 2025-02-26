import { Router } from "express";
import authRouter from "./authRouter.js";
const appRouter = Router();



// appRouter.use('/users', userRouter);
appRouter.use('/users', authRouter);
    

export default appRouter;