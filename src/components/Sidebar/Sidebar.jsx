import UserInfo from "../UserInfo/UserInfo";
import './Sidebar.css';
import logo from './img/logo.svg';
import logout from './img/Logout.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";
import Userfront from "@userfront/toolkit";
import { useEffect, useState } from "react";

const Sidebar = () =>{

    Userfront.init("6nzgmwpb");
    const [reg, setReg] = useState(false);
    const [user, setUser] = useState();
    const getApiData = () => {
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
    }, []);
    var admin;
    let btn;
    if (window.location.pathname=="/dashboard"){
        btn = <NavLink to="/menu" style={{ textDecoration: 'none' }}><button className="DashboardBtn">Назад</button></NavLink>
    }
    else btn = <NavLink to="/dashboard" style={{ textDecoration: 'none' }}><button className="DashboardBtn">Анализ чата</button></NavLink>
    if (Userfront.user.hasRole("admin")){
        admin = <div className='admin'>Админ</div>;
    }
    else admin = <p></p>;
    return (
        <div>
            <div className="sidebar">
                <div className='Logo'>
                    <img src={logo}></img>
                </div>
                <div className="separator"></div>
                <div className="sidebar-text">
                    <div>Пользователь:</div>
                    {admin}
                </div>
                {
                    user !== undefined ? <UserInfo info={user} res="Фамилия"></UserInfo> : <div>Загружается...</div>
                }
                <div className="separator"></div>
                {Userfront.user.hasRole("admin") ? btn : <></>}
                <div className="goOut">
                    <div className="goOut-frame"><FontAwesomeIcon icon={faUser} style={{color: "#603cff",}} /></div>
                    {
                        user !== undefined ? <div className="div">{user.firstName} {user.lastName}</div> : <div>Загружается...</div>
                    }
                    <button onClick={() => {Userfront.logout({ redirect: '/login' }); setReg(!reg);}}>
                        <img src={logout} className="logout"/>
                    </button>
                    
                    {/* <NavLink to="/login" style={{ textDecoration: 'none' }}><img src={logout} className="logout"/></NavLink> */}
                </div>
            </div>
        </div>
    );
}
export default Sidebar;