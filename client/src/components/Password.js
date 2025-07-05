import React from "react";
import '../Styles/Component.css';
import {Link, useNavigate} from 'react-router-dom';
import avatar from '../assets/profile.png';
import toast, {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { passwordValidate } from "../helper/validate";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store";
import { verifyPassword } from "../helper/helper";

export default function Password() {

  const navigate = useNavigate();

  const {username} = useAuthStore(state => state.auth);
  const fetchQuery = username ? `user/${username}` : null;
  const[ { isLoading, apiData, serverError }] = useFetch(fetchQuery);

   const formik = useFormik({
      initialValues :{
        password : 'admin@123'
      },
      validate : passwordValidate,
      validateOnBlur: false,
      validateOnChange : false,
      onSubmit : async values =>{
        
        let loginPromise = verifyPassword({username, password:values.password});

        toast.promise(loginPromise,{
          loading : 'checking..',
          success : <b> Login Successfully Done...!</b>,
          error : <b>Password Not Match!</b>
        });

        loginPromise.then(res =>{
          let { token } = res.data;
          localStorage.setItem('token', token);
          navigate('/profile');
        })

      }
   })

   if(isLoading) return <h1>isLoading</h1>
   if(serverError) return <h1>{serverError.message}</h1>

  return (
    <div className="main-container">
      <Toaster className="Toaster" reverseOrder={false}></Toaster>
      <div className="card">

        <div className="title">
          <h4>Hello {apiData?.firstName || apiData?.username}</h4>
          <span>Explore More by connecting with us!</span>
        </div>

        <form className="Mainform1" onSubmit={formik.handleSubmit}>
            <div className="Mainform2">
                <img src={apiData?.profile || avatar} alt="avatar"></img>
            </div>

            <div className="Mainform3">
                <input {...formik.getFieldProps('password')} type="text" placeholder="Enter Password"></input>
                <button type="submit">Sign In</button>
            </div>

            <div>
              <span>Forgot Password? <Link className='Register' to="/Recovery">Recover Password</Link></span>
            </div>

        </form>

      </div>
    </div>
  );
}
