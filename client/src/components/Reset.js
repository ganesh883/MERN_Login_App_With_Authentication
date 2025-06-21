import React from "react";
import '../Styles/Component.css';
import {Link} from 'react-router-dom';
import avatar from '../assets/profile.png';
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import {  resetPasswordValidation } from "../helper/validate";

export default function Reset() {

   const formik = useFormik({
      initialValues :{
        password : '',
        confirm_password : ''
      },
      validate : resetPasswordValidation,
      validateOnBlur: false,
      validateOnChange : false,
      onSubmit : async values =>{
        console.log(values);
      }
   })

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
