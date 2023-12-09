import React, { useEffect, useState } from 'react';
import * as signalR from "@microsoft/signalr";
import Userfront from "@userfront/toolkit/react";
// var CryptoJS = require("crypto-js");

let AESKey = '8080808080808080';

const Hub = () => {
  var CryptoJS = require("crypto-js");
  const hubConnection = new signalR.HubConnectionBuilder().withUrl("https://localhost:7114/hub")
  .build();
  hubConnection.on("Notify", function (message) {
    
    // publicKey = message;
    console.log("Я подключён!"); //здесь инфа, кто подключился
  });

  hubConnection.start();

  var list = [];

  const Messages = (props) => {

    const [date, setDate] = useState();

    useEffect(() => {
      props.HubConnection.on("sendToReact", message => {
        list.push(message);
        setDate(new Date());
      })
    }, []);

    return <>{list.map((message, index) => <p key={`message${index}`}>{message}</p>)}</>
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

        fetch("https://localhost:7114/api/message", {
          "method": "POST",
          "headers": {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: cipherMessage.toString(),
            username: Userfront.user.email
          })
        });
        setMessage("");
      }
    }

    return (
      <>
        <input type='text' placeholder='Write message' onChange={onMessageChange} value={message}/>
        <button onClick={onSendMessage}>Отправить </button>
      </>
    );
  }
  

  return (
    <div className="App">
      <SendMessage />
      <Messages HubConnection={hubConnection}></Messages>
    </div>
  );
}
export default Hub;