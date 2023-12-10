import { React, useLayoutEffect, useState } from "react";
import Userfront from "@userfront/toolkit/react";
import Sidebar from "../Sidebar/Sidebar";
import "./Menu.css";
import Footer from "../Footer/Footer";
import Ipheader from "./../Ipheader/Ipheader";

Userfront.init("6nzgmwpb");

const Menu = () => {
  const [connections, setConnections] = useState();
  const getApiData = () => {
    const response = fetch(
      "https://localhost:9322/api/Connection/All",
       {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          }}
    ).then(response => response.json().then(response => setConnections(response.connections)));
  };

  getApiData();
  var usList;

  if (1) {
    usList = <div className="UserList">
    <h1>Список клиентов сервера localhost:9322</h1>
    <ul>
      {connections}
    </ul> 
  </div>
  } else usList = <div className="img"></div>  
  return (
    <div className="chats">
      <Sidebar />
      <div className="App">
        <Ipheader/>
        {Userfront.user.hasRole("admin") ? usList : <></>}
        <Footer />
      </div>
    </div>
  );
};

export default Menu;
