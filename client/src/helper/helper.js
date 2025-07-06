import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
console.log("Loaded Base URL =>", axios.defaults.baseURL); 


/**authenticate Function */
export async function authenticate(username) {
    try {
      const response = await axios.post('/api/authenticate', { username });
      return {
        status: response.status,
        data: response.data
      };
    } catch (error) {
      return {
        status: error.response?.status || 500,
        error: error.response?.data?.error || "Username doesn't exist...!"
      };
    }
  }
  

/** get user deatils */
export async function getUser({username}){
    try {
        const {data} = await axios.get(`/api/user/${username}`);
        return {data};
    } catch (error) {
        return { error: "Password doesn't match"}
    }
}

/**register user function */
export async function registerUser(Credentials){
    try {
        console.log("Image size (characters):", Credentials.profile.length);
        
        const response = await axios.post(`/api/register`, Credentials);
        const { msg } = response.data;
        const { status } = response;

        const { username, email } = Credentials;

        // Send mail only if registered successfully
        if(status === 201){
            await axios.post('/api/registerMail', {
                username,
                userEmail: email,
                text: msg
            });
        }

        return Promise.resolve(msg);

    } catch (error) {
        // ✅ Clean readable error message
        const errMsg = error?.response?.data?.error || "Registration failed!";
        return Promise.reject(new Error(errMsg));
    }
}

  

/** Login Function */
export async function verifyPassword({ username, password }) {
    try {
      const response = await axios.post('/api/login', { username, password });
      return { data: response.data }; 
    } catch (error) {
      const errMsg =
        error.response?.data?.error || error.message || "Password doesn't match!";
      throw new Error(errMsg);
    }
  }
  

/**Update User Profile Function */
export async function updateUser(response){
    try {
        
        const token = await localStorage.getItem('token');
        const data  = await axios.put('/api/updateuser', response, {headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({data});
    } catch (error) {
        return Promise.reject({ error: "Couldn't Update Profile..!"});
    }
}

/**Generate OTP */
export async function generateOTP(username){

    try {
        
        const {data: {code}, status } = await axios.get('/api/generateOTP', {params : {username}});

        //Send mail with OTP
        if(status === 201){
            let {data: {email}} = await getUser({ username });
            let text = `Your password recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/api/registerMail',{username,userEmail:email, text, subject: "Password Recovery OTP"});
        }

        return Promise.resolve(code);

    } catch (error) {
        return Promise.reject({error});
    }
}

/** Verify OTP */
export async function verifyOTP(username, code){
    try {

        const {data,status} = await axios.get('/api/verifyOTP', {params : {username, code}});
        return {data, status};
        
    } catch (error) {
        return Promise.reject(error);
    }
}

/** Reset  Password */
export async function resetPassword({username, password}){
    try {

        const {data, status} =  await axios.put('/api/resetPassword', {username, password});
        return Promise.resolve({data, status});

    } catch (error) {
        return Promise.reject({error});
    }
}
