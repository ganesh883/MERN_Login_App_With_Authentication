import React, { useState } from "react";
import '../Styles/Component.css';
import {Link} from 'react-router-dom';
import avatar from '../assets/profile.png';
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { profileValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";
import useFetch from '../hooks/fetch.hook'
import { useAuthStore } from "../store/store";

export default function Profile() {

  const [file, setFile] = useState();
  const {username} = useAuthStore(state => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(`user/${username}`);
  console.log( apiData)
   const formik = useFormik({
      enableReinitialize: true,
     
      initialValues :{
        firstName: apiData?.firstName || '',
        lastName: apiData?.lastName || '',
        mobile: apiData?.mobile || '',
        email: apiData?.email ||  '',
        address: apiData?.address || '',
        city: apiData?.city || '' 
      }
      ,
      validate : profileValidation,
      validateOnBlur: false,
      validateOnChange : false,
      onSubmit : async values =>{
        values = await Object.assign(values,{profile : file || ''})
        console.log(values);
      }
   })

   
   if(isLoading) return <h1>isLoading</h1>
   if(serverError) return <h1>{serverError.message}</h1>


   const onUpload = async e=>{
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
   }

  return (
    <div className="main-container">
      <Toaster className="Toaster" reverseOrder={false}></Toaster>
      <div className="card">

        <div className="title">
          <h4>Profile</h4>
          <span>You can update the details...!</span>
        </div>

        <form className="Mainform1" onSubmit={formik.handleSubmit}>
            <div className="Mainform2">
              <label htmlFor="profile">   <img src={apiData?.Profile || file || avatar} alt="avatar"></img></label>
              <input onChange={onUpload} type="file" id="profile" name="profile"/>
            </div>
            <div className="Mainform3">
                    <div className="form-row">
                      <input {...formik.getFieldProps('firstName')} type="text" placeholder="First Name" />
                      <input {...formik.getFieldProps('lastName')} type="text" placeholder="Last Name" />
                    </div>

                    <div className="form-row">
                      <input {...formik.getFieldProps('mobile')} type="text" placeholder="Mobile Number" />
                      <input {...formik.getFieldProps('email')} type="text" placeholder="Email*" />
                    </div>

                    <div className="form-row">
                      <input {...formik.getFieldProps('address')} type="text" placeholder="Address" />
                      <input {...formik.getFieldProps('city')} type="text" placeholder="City" />
                    </div>

                    <button type="submit" className="submit-button"> Update </button>
            </div>



            <div>
              <span>Comeback Later? <Link className='Register' to="/">Logout</Link></span>
            </div>

        </form>

      </div>
    </div>
  );
}
