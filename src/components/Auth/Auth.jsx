import { React, useLayoutEffect } from 'react';
import './Auth.css';
import Userfront from "@userfront/toolkit/react";
import LoginForm from './LoginForm';

const Auth = () => {

  Userfront.init("6nzgmwpb");

    return (
      <LoginForm />
    );
}

export default Auth;