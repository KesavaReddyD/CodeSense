import { Router } from "express";
import { getAllUsers, signUp, logIn , logout, verifyUser} from "../controllers/authcontroller.js";
// import { getAllUsers, logIn, logout, signUp, verifyUser } from "../controllers/usersControllers.js";
import { loginvalidaton, signupValidation, validator } from "../utils/validator.js";
import { verifyToken } from "../utils/token-manager.js";
const authRouter = Router();

authRouter.get('/all', getAllUsers);

authRouter.post('/signup', validator(signupValidation) ,signUp);
authRouter.post('/login',validator(loginvalidaton), logIn);
authRouter.get('/authverify', verifyToken, verifyUser);
authRouter.get('/logout', logout);

export default authRouter;