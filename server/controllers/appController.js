
/**POST: http://localhost:5000/api/register */
export async function register(req,res){
    res.json('register route');
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


