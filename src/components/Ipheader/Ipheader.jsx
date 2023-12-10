import icon from "./img/Icon.svg";
import "./ipheader.css";
import search from "./img/search.svg";
import Footer from "../Footer/Footer";
import { render } from "@testing-library/react";
import { useNavigate } from "react-router-dom";

const Ipheader = () => {
    const navigate = useNavigate();
    const onClick = () =>{
        var inp = document.getElementById("input").value.toLowerCase();
        if (inp == "localhost" || inp == "https//localhost"){
          navigate("/hub");
        }
        else alert("Несуществующий адрес сервера! Попробуйте снова");
    }
  return (
    <>
    <header className="App-header">
        <div className="header_wrapper">
          <div className="header_block">
            <img src={icon} alt="" className="IconImg" />
            <p>Подключиться к чату</p>
            <div className="IpLink">
                <input id="input"type="text" placeholder="Введите ip адрес..." className="LinkInput"/>
                <button className="LinkBtn" onClick={onClick}>Подключиться</button>
            </div>
          </div>
        </div>
    </header>
    </>
  );
};
export default Ipheader;
