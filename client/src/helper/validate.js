import toast from "react-hot-toast";
import { authenticate } from "./helper";

/** validate login page username */
export async function usernameValidate(values){
    const errors = usernameVerify({},values);

    if(values.username){
        //check user exist or not
        const { status, error } = await authenticate(values.username);

        console.log(status);

        if(status !== 200 && status!==201){
            errors.exist = toast.error('User does not exist...!');  
        }
    }

    return errors;
}

/** validate Password Page */
export async function passwordValidate(values){
    const errors = passwordVerify({},values);

    return errors;
}

/** Validate Register form */
export async function registerValidation(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors,values);

    return errors;
}

/** Validate profile page */
export async function profileValidation(values){
    const errors = emailVerify({}, values);
    return errors;
}


/**validate E-mail */
function emailVerify(error={}, values){
    if(!values.email){
        error.email = toast.error("Email Required...!");
    }
    else if(values.email.includes(" ")){
        error.email = toast.error("Wrong E-mail...");
    }
    else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/.test(values.email)
      ) {
        error.email = toast.error("Invalid E-mail address...!");
      }
}

/** Validate reset password */
export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_password){
        errors.exist = toast.error("Password not match..!");
    }
}

/** validate Password */
function passwordVerify(errors={},values){

    const specialChars = /[!@#$%^&*()_\-+=\[\]{}|\\:;"'<>,.?/]/;

    if(!values.password){
        errors.password = toast.error("Password Required..!");
    }
    else if(values.password.includes(" ")){
        errors.password = toast.error("Wrong Password..!");
    }
    else if(values.password.length <4){
        errors.password = toast.error("Password characters must be more than 4 characters");
    }
    else if(!specialChars.test(values.password)){
        errors.password = toast.error("Password must have special character..!")
    }

    return errors;
}

/** validate Username */
function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error('Username Required...!');
    }
    else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username...!');
    }

    return error;
} 