import React, { useCallback, useEffect, useState } from 'react';
import * as signalR from "@microsoft/signalr";
import Userfront from "@userfront/toolkit/react";
import Sidebar from "../Sidebar/Sidebar";
import "./Hub.css";
import Chatheader from "../ChatHeader/Chatheader";
import Footer from "../Footer/Footer";
import icon from "./img/Icon.svg";

const Hub = () => {
  
  window.onpopstate = async (e) =>{
    debugger;
    console.log(hubConnection.connection.connectionId); //не убирать!!!
    await fetch(`https://localhost:9322/api/Connection?connectionId=${hubConnection.connection.connectionId}`, {
          "method": "DELETE",
          "headers": {
            Accept: "*/*"
          }
        });
  }

  var CryptoJS = require("crypto-js");
  let AESKey = (Math.round(1000000000000000 - 0.5 + Math.random() * (999999999999999 - 1000000000000000 + 1))).toString();
  const hubConnection = new signalR.HubConnectionBuilder().withUrl("https://localhost:9322/hub")
      .build();
  var list = [];

  const Messages = (props) => {

    const [date, setDate] = useState();
    const [user, setUser] = useState();
    const getApiData = () => {
      console.log(1);
      const response = fetch(
        `https://localhost:9322/api/User?email=${Userfront.user.email}`,
         {
          method: "GET",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            }}
      ).then(response => response.json().then(response => setUser(response)));
    };
    
    useEffect(() => {
      getApiData();
      hubConnection.on("ConnectedHub", function () {
        fetch("https://localhost:9322/api/Connection", {
          "method": "POST",
          "headers": {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            connectionId: hubConnection.connection.connectionId,
            aesKey: AESKey 
          })
        });
      });
    
      hubConnection.start();

      props.HubConnection.on("sendToReact", (userName, message)  => {
        var AESKeyUtf8 = CryptoJS.enc.Utf8.parse(AESKey);
        let AESIvUtf8 = CryptoJS.enc.Utf8.parse(AESKey);
        let decryptMessage = CryptoJS.AES.decrypt(message, AESKeyUtf8,
        { 
          keySize: 128 / 8, 
          iv: AESIvUtf8, 
          mode: CryptoJS.mode.CBC, 
          padding: CryptoJS.pad.Pkcs7 
        }); 
        let dateMsg = new Date();
        console.log(userName);
        list.push({
          name: userName,
          msg: decryptMessage.toString(CryptoJS.enc.Utf8),
          date: dateMsg.getHours() + ':' + dateMsg.getMinutes() + ':' + dateMsg.getSeconds()
        });
        setDate(new Date());
      })
    }, []);
    
    return (
      <>
      {
        list.map((obj, index) => 
          <div className={`chat__item ${(user !== undefined) && (obj.name === (user.firstName + ' ' + user.lastName ))? 'chat__item--responder' : ''}`}>
            <img src={icon} alt="" className="IconImg" />
            <div className="chat__message">
              <div className="chat__message-content"> 
                {obj.msg}
              </div>
              <div className="chat__messageItemInfo">
                <div className="chat__message-name">{obj.name}</div>
                <div className="chat__message-time">{obj.date}</div>
              </div>
            </div>
          </div>
          )
      }
      </>)
  }

  const SendMessage = () => {
    const [message, setMessage] = useState("");
    const onMessageChange = (e) => {
      setMessage(e.target.value);
    }
  
    const onSendMessage = (e) => {
      if (e) {
        // Encrypt
        var AESKeyUtf8 = CryptoJS.enc.Utf8.parse(AESKey);
        let AESIvUtf8 = CryptoJS.enc.Utf8.parse(AESKey);
        let cipherMessage = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(message), AESKeyUtf8,
        { 
          keySize: 128 / 8, 
          iv: AESIvUtf8, 
          mode: CryptoJS.mode.CBC, 
          padding: CryptoJS.pad.Pkcs7 
        }); 
        fetch("https://localhost:9322/api/message", {
          "method": "POST",
          "headers": {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: cipherMessage.toString(),
            username: Userfront.user.email,
            connectionId: hubConnection.connection.connectionId
          })
        });
        setMessage("");
      }
    }

    return (
      <>
        <input className="messageInput" type='text' placeholder='Write message...' onChange={onMessageChange} value={message}/>
        <button className="buttonInput" onClick={onSendMessage}>Отправить </button>
      </>
    );
  }
  
  return (
    <div className="chats">
      <Sidebar />
      <div className="App">
        <Chatheader />
        <main>
          <div className="chat">
            <div className="chat__content">
              <Messages HubConnection={hubConnection}></Messages>
            </div> 
          </div>
        </main>
        <div className="messages">
        <SendMessage />
        </div>
        <Footer />
      </div>
    </div>
  );  
}
export default Hub;