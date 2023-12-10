import Userfront from "@userfront/core";
import React from "react";
import "./Auth.css";
import logo from './img/logo.svg'; // with import
import { NavLink } from "react-router-dom";

Userfront.init("6nzgmwpb");

if (
  document.location.search.includes("token=") &&
  document.location.search.includes("uuid=")
) {
  Userfront.login({ method: "link" });
}

  class SSOButton extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick(event) {
      event.preventDefault();
      
      Userfront.login({ method: this.props.provider });
    }
  
    render() {
      return (
        <button className='EnterGoogleBtn' onClick={this.handleClick}> 
          Войти с помощью Google
        </button>
      );
    }
  }

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailOrUsername: "",
      password: "",
      alertMessage: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setAlertMessage = this.setAlertMessage.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault();
    this.setAlertMessage();
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    Userfront.login({
      method: "password",
      emailOrUsername: this.state.emailOrUsername,
      password: this.state.password,
    }).catch((error) => {
        alert(error.message);
        this.setAlertMessage(error.message);
      });
  }

  setAlertMessage(message) {
    this.setState({ alertMessage: message });
  }

  render() {
    return (
      <div className="App" >
        <div className='RegistrationForm'>
          
          <div className='Logo'>
            <img src={logo}></img>
          </div>
          <h1>Авторизация</h1>
          <form className='AutthorizationForm' onSubmit={this.handleSubmit}>
              <input id="email"
                    name="emailOrUsername"
                    type="text"
                    value={this.state.emailOrUsername}
                    onChange={this.handleInputChange} 
                    placeholder='Email'/>
              <input id="password" 
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleInputChange} 
                  placeholder='Пароль'/>
            <button className='EnterBtn' type="submit">Войти</button>
          </form>
          <div className='AutthorizationForm'>
            <SSOButton provider="google"/>
          </div>
          <NavLink to='/registration'className='RegisterText'style={{ textDecoration: 'none' }}>Зарегистрироваться</NavLink>
          </div>
      </div>
    );
  }
}

export default LoginForm;