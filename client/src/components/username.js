import React from "react";
import '../Styles/username.css';
import {Link} from 'react-router-dom';
import avatar from '../assets/profile.png';
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';


export default function username() {

   const formik = useFormik({
      initialValues :{
        username : ''
      },
      validateOnBlur: false,
      validateOnBlur : false,
      onSubmit : async values =>{
        console.log(values);
      }
   })







  return (
    <div className="main-container">
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
                <input {...formik.getFieldProps('username')} type="text" placeholder="Username"></input>
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
