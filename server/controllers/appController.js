import { errors } from "mongodb-memory-server";
import UserModel from "../Model/User.model.js";
import bcrypt from 'bcrypt';
import ENV from '../config.js';

/**POST: http://localhost:8080/api/register */
export async function register(req,res){
    
    try {
        const { username, password, profile, email } = req.body;

        // Check if username exists
        const existingUsername = await UserModel.findOne({ username });
        if (existingUsername) {
            return res.status(400).send({ error: "Please use unique username" });
        }

        // Check if email exists
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).send({ error: "Please use unique email" });
        }

        // Check if password is provided
        if (!password) {
            return res.status(400).send({ error: "Password is required" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new UserModel({
            username,
            password: hashedPassword,
            profile: profile || '',
            email
        });

        await user.save();
        return res.status(201).send({ msg: "User Registration Successful" });

    } catch (error) {
        return res.status(500).send({ error: error.message || "Internal Server Error" });
    }
}

/**POST: http://localhost:8080/api/login */
export async function login(req,res){
   
        const {username, password} = req.body;

        try {
            const user = await UserModel.findOne({ username });
            if (!user) return res.status(404).send({ error: "Username not Found" });

            const passwordCheck = await bcrypt.compare(password, user.password);
            if (!passwordCheck) return res.status(400).send({ error: "Incorrect Password" });

            const token = jwt.sign(
                { userId: user._id, username: user.username },
                ENV.JWT_SECRET,
                { expiresIn: "24h" }
            );

            return res.status(200).send({
                msg: "Login Successful..!",
                username: user.username,
                token
            });

        } catch (error) {
            return res.status(500).send({ error });
        }
}

/**PUT: http://localhost:5000/api/updateUser */
export async function updateUser(req,res){
    res.json('UpdateUser Route');
}

/**GET: http://localhost:5000/api/user/example123 */
export async function getUser(req,res){
    res.json('getUser Route');
}

/**GET: http://localhost:5000/api/generateOTP */
export async function generateOTP(req,res){
    res.json('generateOTP Route');
}

/**GET: http://localhost:5000/api/verifyOTP */
export async function verifyOTP(req,res){
    res.json('verifyOTP Route');
}

/**GET: http://localhost:5000/api/createResetSession */
export async function createResetSession(req,res){
    res.json('createResetSession Route');
}

/**PUT: http://localhost:5000/api/ResetPassword */
export async function resetPassword(req,res){
    res.json('resetPassword Route');
}


