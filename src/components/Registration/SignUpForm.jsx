import Userfront from "@userfront/core";
import React from "react";
import "./Registration.css";
import axios from "axios";
import logo from '../Auth/img/logo.svg';
import { NavLink } from "react-router-dom";

Userfront.init("6nzgmwpb");


// Define the Signup form component
class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordVerify: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  // Whenever an input changes value, change the corresponding state variable
  handleInputChange(event) {
    event.preventDefault();

    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  }

  // Handle the form submission by calling Userfront.signup()
  handleSubmit(event) {
    event.preventDefault();
    
    Userfront.signup({
      method: "password",
      name: this.state.firstName + " " + this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      data: {
      }
    });
    fetch("https://localhost:9322/api/User", {
      "method": "POST",
      "headers": {
        Accept: "*/*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email
      })
    });
  }

  render() {
    return (
      <div className="App">
      <div className='RegistrationForm'>
      <div className='Logo'>
          <img src={logo}></img>
      </div>
      <h1>Регистрация</h1>
      <form className='AutthorizationForm' onSubmit={this.handleSubmit}>
          <input id="firstname" 
                name="firstName"
                type="text"
                value={this.state.firstName}
                onChange={this.handleInputChange} 
                placeholder="Ваше имя" />
          <input id="lastname" 
                name="lastName"
                type="text"
                value={this.state.lastName}
                onChange={this.handleInputChange} placeholder="Фамилия" />
          <input id="email" 
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleInputChange} 
          placeholder="Email" />
        
          <input id="password" 
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                placeholder="Пароль" />
        <button type="submit" className='RegistrationBtn'>Регистрация</button>
    </form>
    <NavLink className='RegisterText' to='/login' style={{ textDecoration: 'none' }}>Войти</NavLink>
    </div>
    </div>
    );
  }
}

export default SignupForm;