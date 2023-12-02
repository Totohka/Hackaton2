import Userfront from "@userfront/core";
import React from "react";
import "./Auth.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';


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
        <button className="g-button" onClick={this.handleClick}>
          <FontAwesomeIcon size="2xl" icon={faGoogle} style={{color: "aqua", marginTop: "5px", marginLeft: "5px"}} />
          <p className="g-text">Войти с помощью Google</p>
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
      <div className="form_auth" >
        <form onSubmit={this.handleSubmit}>
        <div className="title_auth">С возвращением!</div>
          <div className="input-container ic1">
            <input id="email" className="input" 
                  name="emailOrUsername"
                  type="text"
                  value={this.state.emailOrUsername}
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
            <div className="cut cut-short"></div>
            <label for="password" className="placeholder">Пароль</label>
          </div>
          <button className="submit" type="submit">Войти</button>
        </form>
        <div className="form-or">
          ИЛИ 
        </div>
        <div>
          <SSOButton provider="google"/>
        </div>
      </div>
    );
  }
}

export default LoginForm;