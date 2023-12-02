import React, { useEffect, useState } from 'react';
import * as signalR from "@microsoft/signalr";
import Userfront from "@userfront/toolkit/react";


const Hub = () => {

  console.log(Userfront);
  var CryptoJS = require("crypto-js");

  const hubConnection = new signalR.HubConnectionBuilder().withUrl("http://localhost:5064/hub")
  .build();
  
  hubConnection.on("Notify", function (message) {
    console.log(message); //здесь инфа, кто подключился
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
        var cipherMessage = CryptoJS.AES.encrypt(message, 'secret key').toString();
        fetch("http://localhost:5064/api/message", {
          "method": "POST",
          "headers": {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: cipherMessage,
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