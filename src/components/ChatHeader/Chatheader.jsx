import icon from "./img/Icon.svg";
import "./Chatheader.css";
import search from "./img/search.svg";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";

const Chatheader = () => {

  const [users, setUsers] = useState();
  const getApiData = () => {
    const response = fetch(
      "https://localhost:9322/api/Connection",
       {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          }}
    ).then(response => response.json().then(response => setUsers(response)));
  };

  getApiData();
  return (
    <header className="App-header">
        <div className="header_wrapper">
          <div className="header_block">
            <img src={icon} alt="" className="IconImg" />
            <p>Чат пользователей</p>
            <div className="lineHeader"></div>
            <p>
              {
                users !== undefined ? <span>{users.count} онлайн</span> : <span>Загрузка...</span>
              } 
            </p>
          </div>
          <div className="header_block2">
            <form className="search">
              <button type="submit">
                <img src={search} alt="" />
              </button>
              <input type="text" placeholder="Поиск" />
            </form>
          </div>
        </div>
      </header>
  );
};
export default Chatheader;
