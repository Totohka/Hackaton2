import {React, useLayoutEffect} from 'react';
import './Registration.css';
import Userfront from "@userfront/toolkit/react";
import SignupForm from './SignUpForm';


Userfront.init("6nzgmwpb");

const Registration = () => {
  useLayoutEffect(() => {
    document.getElementById('gray_space').style.backgroundColor = 'black';
   }, []);
    return (
      <SignupForm />
    );
}

export default Registration;