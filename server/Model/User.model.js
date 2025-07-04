import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required : [true, "Please provide unique Username"],
        unique : [true, "Username Exist"]
    },
    password: {
        type: String,
        required: [true, "Please privde a password"],
        unique : false,
    },
    email: {
        type:String,
        required : [true, "Please provide a unique email"],
        unique : true,
    },
    firstName : {type: String},
    lastName: {type: String},
    mobile: {type: Number},
    address: {type: String},
    city:{type: String},
    profile: {type: String}
});

export default mongoose.Model.Users || mongoose.model('User', UserSchema);