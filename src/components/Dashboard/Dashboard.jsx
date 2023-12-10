import "./Dashboard.css";
import React, { useEffect, useState } from "react";
import MyBarChart from "./MyBarChart/MyBarChart";
import Sidebar from "../Sidebar/Sidebar";
import Chatheader from "../ChatHeader/Chatheader";
import Footer from "../Footer/Footer";

const Dashboard = (props) => {

  const [visits, setVisits] = useState();
  const getApiData = () => {
    const response = fetch(
      "https://localhost:9322/api/Dashboard",
       {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          }}
    ).then(response => response.json().then(response => setVisits(response)));
  };
  getApiData();
  console.log(visits);
  return (
    <div className="chats">
        <Sidebar/>
        <div className="App">
            <Chatheader/>
            <main>
                <div className="flexContainerForDashboard">
                    <div className='containerForBarChart'>
                        <div className='BarChartAndHeader'>
                        <h2>Количество посещений за сегодня</h2>
                        { visits !== undefined ? <MyBarChart data={visits.day} /> : <>Загружается...</> }
                        </div>
                    </div>
                    <div className='containerForBarChart'>
                        <div className='BarChartAndHeader'>
                        <h2>Количество посещений за месяц</h2>
                        { visits !== undefined ? <MyBarChart data={visits.month} /> : <>Загружается...</>}
                        </div>
                    </div>
                </div> 
            </main>
            
            <Footer />
        </div>
    </div>
    
  );
}

export default Dashboard;
