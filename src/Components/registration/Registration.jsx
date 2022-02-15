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
  const [passwordLoaded, setIsLoading] = useState(false);
  const showPassword = () => {
    setIsLoading((current) => !current);
  };
  return (
    <div>
      <form>
        <div className="reg__wrapper_inputs">
          <input name="login" required></input>
          <label htmlFor="login">Логин</label>
          <input
            type={passwordLoaded ? "text" : "password"}
            name="password1"
            required
          ></input>
          <label htmlFor="password1">Пароль</label>
          <input
            type={passwordLoaded ? "text" : "password"}
            name="password2"
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
          <img src={circleCheckbox}></img>
          <label></label>
          <p>В котором все буквы прописаны на латинице</p>
        </div>
        <div className="reg__wrapper_validate_wrap">
          <img src={circleCheckbox}></img>
          <label></label>
          <p>Cодержит как строчные (a-z), так и прописные буквы (A-Z)</p>
        </div>
        <div className="reg__wrapper_validate_wrap">
          <img src={circleCheckbox}></img>
          <label></label>
          <p>Cодержит хотя бы одну цифру (0-9) </p>
        </div>
        <div className="reg__wrapper_validate_wrap">
          <img src={circleCheckbox}></img>
          <label></label>
          <p>Cодержит не менее 8 символов и не более 15</p>
        </div>
      </div>
    </div>
  );
};

const initialState = {
  login: "",
  password: "",
};

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  render() {
    return (
      <div className="reg">
        <div className="reg__wrap">
          <div className="reg__wrapper">
            <h1>Регистрация</h1>
            <FormUser />
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
