import User from "../models/user.js";
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";


export const getAllUsers = async (req, res, next) => {
  // get all users
    try {
        const users = await User.find();
        res.status(200).json({ message: "ok", users });
    } catch (error) {
        res.json({ message: "error", cause: error.message });
    }
};


export const signUp = async (req,res,next) => {
    try {
        console.log(req.body);
        const { name, email, password, role, institution } = req.body;
        const temp = await User.findOne({email})
        if(temp) {
            return res.status(409).json({message: "user already exists"});
        }
        const encryptedPassword = await hash(password, 10);
        const user = new User({ name, email, password: encryptedPassword, role, institution });
        await user.save();

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            signed: true,
            secure: true,
            sameSite: 'none',
            // domain: "projectchatai.vercel.app",
            path: "/",
            httpOnly: true,
            expires
        });
        res.status(200).json({ message: "user created successfully", user: {name, email}});
    } catch (error) {
          res
          .status(200)
          .json({ message: "user not created", reason: error.message });
    }
};

export const logIn = async (req,res,next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if(!user){
        return res.status(404).json({"message" : "user not found"});
    }
    const result = await compare(password, user.password);
    if(!result){
        return res.status(401).json({"message" : "wrong password"})
    }

    res.clearCookie(COOKIE_NAME , {
        signed: true,
        secure: true,
        sameSite: 'none',
        // domain: "projectchatai.vercel.app",
        path: "/",
        httpOnly: true
    });
    console.error(COOKIE_NAME);
    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    // console.log(expires)
    expires.setDate(expires.getDate() + 7);

    res.cookie(COOKIE_NAME, token, {
        signed: true,
        secure: true,
        sameSite: 'none',
        // domain: "projectchatai.vercel.app",
        path: "/",
        httpOnly: true,
        expires
    });
    
    res.status(200).json({name: user.name, email: user.email});
};

export const verifyUser = async(req,res,next) => {
    try{
        const data = await User.findById(res.locals.jwtData.id);
        if(!data){
            res.status(401).json({message: "user not found"});
        }
        res.status(200).json({message: "OK", id: data.id, name: data.name ,email: data.email, role: data.role});
    }catch(err){
        res.status(200).json({message: "error", cause: err.message});
    }


}

export const logout = async(req,res,next) => {
    res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        signed: true,
        secure: true,
        sameSite: 'none',
        // domain: "projectchatai.vercel.app",
        path: '/'
    });
    res.status(200).json({message: "logged out"});
}