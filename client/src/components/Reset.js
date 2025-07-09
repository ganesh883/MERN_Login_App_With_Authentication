import React from "react";
import '../Styles/Component.css';
import toast, {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import {  resetPasswordValidation } from "../helper/validate";
import { resetPassword } from "../helper/helper";  
import { useAuthStore } from "../store/store";
import { useNavigate, Navigate } from "react-router-dom";
import useFetch from "../hooks/fetch.hook";
import { useEffect } from "react";

export default function Reset() {

  const {username} = useAuthStore(state => state.auth);
  const navigate = useNavigate();
  const [{isLoading, apiData, status, serverError}] = useFetch('createResetSession')

    useEffect(()=>{
      console.log(apiData)
    })


   const formik = useFormik({
      initialValues :{
        password : '',
        confirm_password : ''
      },
      validate : resetPasswordValidation,
      validateOnBlur: false,
      validateOnChange : false,
      onSubmit : async values =>{
       
       let resetPromise =  resetPassword({username , password: values.password})

       toast.promise(resetPromise,{
        loading : 'Updating...',
        success : <b>Reset Successfully..</b>,
        error   : <b>Could not Reset!</b>
       });

       resetPromise.then(function() { navigate('/password')});
       
      }
   })

   if(isLoading) return <h1>isLoading</h1>
   if(serverError) return <h1>{serverError.message}</h1>
   if(status && status!== 201) return <Navigate to={'/password'} replace={true}></Navigate>

  return (
    <div className="main-container">
      <Toaster className="Toaster" reverseOrder={false}></Toaster>
      <div className="card">

        <div className="title">
          <h4>Reset Password</h4>
          <span>Enter New Password</span>
        </div>

        <form className="Mainform1" onSubmit={formik.handleSubmit}>
            <div className="Mainform3">
                <input {...formik.getFieldProps('password')} type="text" placeholder="New Password"></input>
                <input {...formik.getFieldProps('confirm_password')} type="text" placeholder="Repeat Password"></input>
                <button type="submit">Reset</button>
            </div>
        </form>

      </div>
    </div>
  );
}
