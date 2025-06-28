import { errors } from "mongodb-memory-server";
import UserModel from "../Model/User.model.js";
import bcrypt from 'bcrypt';

/**POST: http://localhost:5000/api/register */
export async function register(req,res){
    
    try {
        const {username, password, profile, email} = req.body;

        //check the existing user
            const existUsername = new Promise((resolve,reject)=>{
                UserModel.findOne({username}, function(err,user){
                    if(err) reject(new Error(err))
                    if(user) reject ({error: "Please use unique username"});

                    resolve();
                })
            })

        //check the existing E-mail
        const existEmail = new Promise((resolve,reject)=>{
            UserModel.findOne({email}, function(err,email){
                if(err) reject(new Error(err))
                if(email) reject ({error: "Please use unique Email"});

                resolve();
            })
        });

        Promise.all([existUsername,existEmail])
            .then(()=>{
                    if(password){
                        bcrypt.hash(password,10)
                            .then(hashedPassword =>{
                                
                                const user = new UserModel({
                                    username,
                                    password: hashedPassword,
                                    profile: profile || '',
                                    email
                                });

                                user.save()
                                    .then(result => res.status(201).send({msg: "User Registeration Successfull"}))
                                    .catch(error => res.status(500).send({error}))
                            }).catch(error=>{
                                return res.status(500).send({
                                    error: "Unable to hashed password"
                                })
                            })
                    }
            }).catch(error =>{
                return res.status(500).send({
                    error: "Unable to hashed password"
                })
            })

    } catch (error) {
        return res.status(500).send(error);
    }
}

/**POST: http://localhost:5000/api/login */
export async function login(req,res){
    res.json('login route');
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


