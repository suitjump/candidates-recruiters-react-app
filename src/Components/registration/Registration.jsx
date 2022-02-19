import React, { Component } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./registration.scss";
import eye from "./svg/eye.svg";
import closeeye from "./svg/closeeye.svg";
import circleCheckbox from "./svg/checkbox.svg";
import circleCheckboxCorrect from "./svg/checkboxcor.svg";
import circleCheckboxWrong from "./svg/checkboxwrong.svg";

// not done yet

const FormUser = (props) => {
  const [checkboxLatin, setCheckboxLatin] = useState(circleCheckbox);
  const [checkboxCapital, setCheckboxCapital] = useState(circleCheckbox);
  const [checkboxNumber, setCheckboxNumber] = useState(circleCheckbox);
  const [checkboxAmount, setCheckboxAmount] = useState(circleCheckbox);
  const [showSuccess, setShowSuccess] = useState("3px solid #A9A9A9") // #ee7f7f #8cda4d
  const [passwordSuccess, setPasswordSuccess] = useState("3px solid #A9A9A9");
  const passwordValidate = (e) => {
    const regLatin = /^[a-zA-Z 0-9]+$/;
    const hasUpper = (str) => /[a-z]/.test(str)
    const hasLower = (str) => /[A-Z]/.test(str)
    const hasNumber = (str) => /[0-9]/.test(str)
    const statement = (expr, hookState) => { 
    if(expr) {
      hookState(circleCheckboxCorrect)
    } else if(e.target.value === '') {
      hookState(circleCheckbox)
    }  else {
      hookState(circleCheckboxWrong)
    } 
  }
    statement(regLatin.test(e.target.value), setCheckboxLatin) 
    statement(hasUpper(e.target.value) && hasLower(e.target.value), setCheckboxCapital)
    statement(hasNumber(e.target.value), setCheckboxNumber)
    statement(e.target.value.length >= 8 && e.target.value.length <= 15, setCheckboxAmount)
    switch(true){
      case (e.target.value === props.passwordRepeat && e.target.value.length >= 1):
        setShowSuccess("3px solid #8cda4d");
      break;
      case (props.passwordRepeat === ""):
        setShowSuccess("3px solid #A9A9A9");
        break;
      default: 
        setShowSuccess("3px solid #ee7f7f");
        break;
    }
    return props.handleChange(e)
  }
  const [passwordLoaded, setIsLoading] = useState(false);
  const showPassword = () => {
    setIsLoading((current) => !current);
  };
  const passwordCheck = (e) => {
    switch(true){
      case (e.target.value === props.password && e.target.value.length >= 1):
      setShowSuccess("3px solid #8cda4d");
      break;
      case (e.target.value === ''):
        setShowSuccess("3px solid #A9A9A9");
        break;
      default:
        setShowSuccess("3px solid #ee7f7f")
        break;
    }
    return props.handleChange(e)
  }
  return (
    <div>
      <form>
        <div className="reg__wrapper_inputs">
          <input name="login" required></input>
          <label htmlFor="login">Логин</label>
          <input
            type={passwordLoaded ? "text" : "password"}
            onChange={(e) => passwordValidate(e)}
            name="password"
            style={{"border-bottom": passwordSuccess}}
            value={props.password}
            required
          ></input>
          <label htmlFor="password1">Пароль</label>
          <input
            type={passwordLoaded ? "text" : "password"}
            onChange={(e) => passwordCheck(e)}
            style={{"border-bottom": showSuccess}}
            name="password_re"
            value={props.passwordRepeat}
            required
          ></input>
          <label htmlFor="passsword2">Повторите пароль</label>
          <img
            onClick={showPassword}
            src={passwordLoaded ? eye : closeeye}
          ></img>
          <img
            onClick={showPassword}
            src={passwordLoaded ? eye : closeeye}
          ></img>
        </div>
      </form>
      <p>Создайте пароль, который:</p>
      <div className="reg__wrapper_validate">
        <div className="reg__wrapper_validate_wrap">
          <img src={checkboxLatin}></img>
          <label></label>
          <p>В котором все буквы прописаны на латинице</p>
        </div>
        <div className="reg__wrapper_validate_wrap">
          <img src={checkboxCapital}></img>
          <label></label>
          <p>Cодержит как строчные (a-z), так и прописные буквы (A-Z)</p>
        </div>
        <div className="reg__wrapper_validate_wrap">
          <img src={checkboxNumber}></img>
          <label></label>
          <p>Cодержит хотя бы одну цифру (0-9) </p>
        </div>
        <div className="reg__wrapper_validate_wrap">
          <img src={checkboxAmount}></img>
          <label></label>
          <p>Cодержит не менее 8 символов и не более 15</p>
        </div>
      </div>
    </div>
  );
};


export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      password_re: ""
    };
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <div className="reg">
        <div className="reg__wrap">
          <div className="reg__wrapper">
            <h1>Регистрация</h1>
            <FormUser handleChange={this.handleChange.bind(this)} password={this.state.password} passwordRepeat={this.state.password_re} />
            <button>Создать аккаунт</button>
            <p>
              Уже есть аккаунт? <a href="*">Войти</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
