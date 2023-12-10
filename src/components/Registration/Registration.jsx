import {React, useLayoutEffect} from 'react';
import './Registration.css';
import Userfront from "@userfront/toolkit/react";
import SignupForm from './SignUpForm';


Userfront.init("6nzgmwpb");

const Registration = () => {
    return (
      <SignupForm />
    );
}

export default Registration;