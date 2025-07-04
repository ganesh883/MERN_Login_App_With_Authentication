import axios from 'axios';

/**authenticate Function */
export async function authenticate(username){
    try {
        return await axios.post('/api/authenticate', {username});
    } catch (error) {
        return {error: "Username doesn't exist...!"}
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
            
            const {data : {msg}, status} = await axios.post(`/api/register`, Credentials);

            let {username, email} = Credentials;

            /**send Email */
            if(status === 201){
                    await axios.post('/api/registerMail', {username, userEmail : email, text: msg})
            }

            return Promise.resolve(msg);
        } catch (error) {
            return Promise.reject({error});
        }
    
}

/** Login Function */
export async function verifyPassword({username, password}){
    try {
        
        if(username){
            const { data }= await axios.post('/api/login',{username, password})
            return Promise.resolve({data});
        }

    } catch (error) {
        return Promise.reject({error: "Password doesn't match..!"});
    }
}
