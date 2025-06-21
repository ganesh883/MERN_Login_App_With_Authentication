import React from "react";
import '../Styles/Component.css';
import {Link} from 'react-router-dom';
import avatar from '../assets/profile.png';
import {Toaster} from 'react-hot-toast';

export default function Recovery() {

  return (
    <div className="main-container">
      <Toaster className="Toaster" reverseOrder={false}></Toaster>
      <div className="card">

        <div className="title">
          <h4>Recovery</h4>
          <span>Enter OTP to recover password</span>
        </div>

        <form className="Mainform1">
            <div className="Mainform3">
              <span> Enter 6 digit OTP sent to your email address</span>
                <input type="text" placeholder="Enter OTP"></input>
                <button type="submit">Recover</button>
            </div>

            <div>
              <span>Can't get OTP? <button className="resendbtn">Resend</button></span>
            </div>

        </form>

      </div>
    </div>
  );
}
