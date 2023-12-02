import Userfront from "@userfront/core";
import React from "react";
import "./Registration.css";
import axios from "axios";

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
    axios.post('/user', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email
    })
  }

  render() {
    return (
        <form className="form_registration" onSubmit={this.handleSubmit}>
        <div className="title_registration">Добро пожаловать!</div>
        <div className="input-container ic1">
          <input id="firstname" className="input" 
                name="firstName"
                type="text"
                value={this.state.firstName}
                onChange={this.handleInputChange} 
                placeholder=" " />
            <div className="cut cut-short"></div>
          <label for="firstname" className="placeholder">Имя</label>
        </div>
        <div className="input-container ic2">
          <input id="lastname" className="input" 
                name="lastName"
                type="text"
                value={this.state.lastName}
                onChange={this.handleInputChange} placeholder=" " />
          <div className="cut "></div>
          <label for="lastname" className="placeholder">Фамилия</label>
        </div>
        <div className="input-container ic2">
          <input id="email" className="input" 
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleInputChange} 
          placeholder=" " />
          <div className="cut cut-short"></div>
          <label for="email" className="placeholder">Email</label>
        </div>
        <div className="input-container ic2">
          <input id="password" className="input" 
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                placeholder=" " />
          <div className="cut "></div>
          <label for="password" className="placeholder">Пароль</label>
        </div>
        <button type="submit" className="submit">Регистрация</button>
      </form>
    );
  }
}

export default SignupForm;