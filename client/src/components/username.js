import React, { useEffect } from "react";
import '../Styles/Component.css';
import {Link, useNavigate} from 'react-router-dom';
import avatar from '../assets/profile.png';
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { usernameValidate } from "../helper/validate";
import { useAuthStore } from "../store/store";
import toast from "react-hot-toast";
import { authenticate } from "../helper/helper.js";

export default function Username() {

    const navigate = useNavigate();

    const setUsername = useAuthStore(state => state.setUsername);
    const username = useAuthStore(state => state.auth.username);

    useEffect(() =>{
      console.log(username);
    })

   const formik = useFormik({
      initialValues :{
        username : ''
      },
      validate : usernameValidate,
      validateOnBlur: false,
      validateOnChange : false,
      onSubmit : async values =>{
        setUsername(values.username);
        const result = await authenticate(values.username);
      
        if (result?.error) {
          toast.error(result.error);
        } else {
          console.log("FORM SUBMITTED ✅", values);
          navigate('/password');
        }
      }
      
   })

  return (
    <div className="main-container">
      <Toaster className="Toaster" reverseOrder={false}></Toaster>
      <div className="card">

        <div className="title">
          <h4>Hello Again!</h4>
          <span>Explore More by connecting with us!</span>
        </div>

        <form className="Mainform1" onSubmit={formik.handleSubmit}>
            <div className="Mainform2">
                <img src={avatar} alt="avatar"></img>
            </div>

            <div className="Mainform3">
                <input {...formik.getFieldProps('username')} type="text" placeholder="Enter Username"></input>
                <button type="submit">Let's Go</button>
            </div>

            <div>
              <span>Not a Member? <Link className='Register' to="/register">Register Now!</Link></span>
            </div>

        </form>

      </div>
    </div>
  );
}
