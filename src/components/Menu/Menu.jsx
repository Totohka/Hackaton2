import {React, useLayoutEffect} from 'react';
import Userfront from "@userfront/toolkit/react";
import { NavLink } from 'react-router-dom';

Userfront.init("6nzgmwpb");

const Menu = () => {
  useLayoutEffect(() => {
    //ajax request to server from Asp.Net Core
    //return data about ip-connection (request need return localhost)
   }, []);
    return (
      <div>
         <NavLink to='/hub'>Подключиться к localhost</NavLink>
      </div>
    );
}

export default Menu;