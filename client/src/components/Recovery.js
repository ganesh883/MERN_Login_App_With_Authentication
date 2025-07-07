import React, { use, useEffect, useState } from "react";
import '../Styles/Component.css';
import {Link, useNavigate} from 'react-router-dom';
import avatar from '../assets/profile.png';
import toast, {Toaster} from 'react-hot-toast';
import { useAuthStore } from "../store/store";
import { generateOTP, verifyOTP } from "../helper/helper";
import { useNavigate } from "react-router-dom";

export default function Recovery() {

  const {username} = useAuthStore(state => state.auth);
  const [OTP, setOTP] = useState();
  const Navigate = useNavigate();

  useEffect(() => {
    generateOTP(username).then((OTP) =>{
      console.log(OTP);
      if(OTP) return toast.success('OTP has been send to your email')
        return toast.error('Problem while generating OTP..!');
    })
  },[username]);

  async function onSubmit(e){

    e.preventDefault();

    try {
      let {status} = await  verifyOTP({ username, code : OTP});
      if(status===201){
        toast.success('Verified Successfully!!');
        return Navigate('/reset');
      }
    } catch (error) {
      return toast.error('Wrong OTP! Check E-mail again!')
    }    
  }


  //handler of resend OTP
  function resendOTP(){
    let sendPromise = generateOTP(username);  

    toast.promise(sendPromise,{
      loading : 'Sending..',
      success : <b> OTP has been send to your E-mail</b>,
      error   : <b> Could not send it</b>

    });

    sendPromise.then(OTP =>{
      console.log(OTP);
    })
  }

  return (
    <div className="main-container">
      <Toaster className="Toaster" reverseOrder={false}></Toaster>
      <div className="card">

        <div className="title">
          <h4>Recovery</h4>
          <span>Enter OTP to recover password</span>
        </div>

        <form className="Mainform1" onSubmit={onSubmit}>
            <div className="Mainform3">
              <span> Enter 6 digit OTP sent to your email address</span>
                <input onChange={(e) => setOTP(e.target.value) }type="text" placeholder="Enter OTP"></input>
                <button type="submit">Recover</button>
            </div>

            <div>
              <span>Can't get OTP? <button onClick={resendOTP} className="resendbtn">Resend</button></span>
            </div>

        </form>

      </div>
    </div>
  );
}
