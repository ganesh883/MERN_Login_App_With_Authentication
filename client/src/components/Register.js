import React, { useState } from "react";
import '../Styles/Component.css';
import {Link, useNavigate} from 'react-router-dom';
import avatar from '../assets/profile.png';
import toast , {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { registerValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";
import { registerUser } from "../helper/helper";


export default function Register() {

  const navigate = useNavigate(); 

  const [file, setFile] = useState();

   const formik = useFormik({
      initialValues :{
        email: 'sample@gmail.com',
        username: 'example123',
        password : 'admin@123'
      },
      validate : registerValidation,
      validateOnBlur: false,
      validateOnChange : false,
      onSubmit : async values =>{
        values = await Object.assign(values,{profile : file || ''})
        let registerPromise = registerUser(values);
        toast.promise(registerPromise,{
          loading : 'Creating...',
          success : <b>Register Successfully Done...!</b>,
          error : <b>Could not Register.</b>
        });

        registerPromise.then(function(){navigate('/')});
      }
   })


   const onUpload = async e=>{
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
   
   }

  return (
    <div className="main-container">
      <Toaster className="Toaster" reverseOrder={false}></Toaster>
      <div className="card">

        <div className="title">
          <h4>Register!</h4>
          <span>Happy to join you!</span>
        </div>

        <form className="Mainform1" onSubmit={formik.handleSubmit}>
            <div className="Mainform2">
              <label htmlFor="profile">   <img src={file || avatar} alt="avatar"></img></label>
              <input onChange={onUpload} type="file" id="profile" name="profile"/>
             
            </div>

            <div className="Mainform3">
                <input {...formik.getFieldProps('email')} type="text" placeholder="Email*"></input>
                <input {...formik.getFieldProps('username')} type="text" placeholder="Username*"></input>
                <input {...formik.getFieldProps('password')} type="text" placeholder="Password*"></input>
                <button type="submit">Register</button>
            </div>

            <div>
              <span>Already Registered? <Link className='Register' to="/">Login Now</Link></span>
            </div>

        </form>

      </div>
    </div>
  );
}
