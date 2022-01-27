import React, { Component } from "react";
import { useState } from "react";
import axios from "axios";
import "./addition.scss";
import back_arrow from "./svg/back_arrow.svg";
import vector from "./svg/vector.svg";
import error from "./svg/error.svg";
import success from "./svg/success.svg";
import close from "./svg/close.svg";

const initialState = {
  lastName: "",
  firstName: "",
  phoneNumber1: "",
  phoneNumber2: "",
  email: "",
  cityOfResidence: "",
  citiesToWork: "",
  proposedPosition: "",
  formOfEmployment: "Постоянная",
  salary: "",
  salaryCurrency: "",
  currentWorkingPlace: "",
  educationByVacancy: "Высшее",
  priority: "Удаленно",
  comment: "",
};

class ValidateContacts extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.timerId = null;
    this.errors = {
      emailError: "",
      phoneError: "",
      borderNumber: "",
      borderEmail: "",
      success: false,
      error: false,
    };
  }

  clearForm() {
    this.setState(initialState);
  }

  handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let emailError = "";
    let phoneError = "";
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      phoneError = "";
      emailError = "";
      let submitState = Object.assign({}, this.state);
      ['error', 'emailError', 'phoneError', 'success', 'borderEmail', 'borderNumber'].forEach(e => delete submitState[e]);
      this.setState({ success: true, error: false });
      this.resetMessage();
      this.setState(initialState); // clear form
      this.resetMessage();
      event.preventDefault();
      this.setState({ [event.target.name]: event.target.value });
      axios
        .post("http://95.216.173.135:8000/candidates", submitState)
        .then((res) => {});
    }
    if (emailError || phoneError) {
      this.setState({ emailError, phoneError });
      return false;
    } else {
      return true;
    }
  };
  saveCandidate() {
    return (
      <div>
        <div className="addition__submit_success">
          <img class="addition__submit_success_img" src={success}></img>
          <p>Кандидат успешно добавлен</p>
          <img
            class="addition__submit_success_close"
            src={close}
            onClick={() => this.setState({ success: false, error: false })}
          ></img>
        </div>
      </div>
    );
  }
  saveErrorCandidate() {
    return (
      <div>
        <div className="addition__submit_error">
          <img class="addition__submit_success_img" src={error}></img>
          <p>Кандидат не добавлен</p>
          <img
            class="addition__submit_success_close"
            src={close}
            onClick={() => this.setState({ success: false, error: false })}
          ></img>
        </div>
      </div>
    );
  }

  validate = () => {
    let emailError = "";
    let phoneError = "";

    if (!this.state.email.includes("@") || !this.state.email.includes(".")) {
      emailError = "Неправильная почта";
      this.setState({ borderEmail: "1px solid red" });
    } else {
      this.setState({ borderEmail: "" });
    }
    if (
      !this.state.phoneNumber1.includes("+") ||
      this.state.phoneNumber1.includes("+").length >= 2
    ) {
      phoneError = "Неправильный номер";
      this.setState({ borderNumber: "1px solid red" });
    } else {
      this.setState({ borderNumber: "" });
    }

    if (emailError || phoneError) {
      this.setState({ emailError, phoneError, error: true });
      return false;
    }
    this.setState({ emailError: "", phoneError: "", error: false });
    return true;
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  contactSubmit = (e) => {
    e.preventDefault();

    this.form.validateFields();

    if (!this.form.isValid()) {
      console.log("form is invalid: do not submit");
    } else {
      console.log("form is valid: submit");
    }
  };
  setValue() {
    const forPhone = this.useState;
  }
  setHandle() {
    const forHandle = this.handleChange();
  }
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  validateName = (e) => {
    const re = /^[a-z а-яёЁЇїІіЄєҐґ ,.'-]+$/i;
    if (e.target.value === "" || re.test(e.target.value))
      this.setState({ firstName: e.target.value });
    return this.handleChange;
  };
  validateSurname = (e) => {
    const re = /^[a-z а-яёЁЇїІіЄєҐґ ,.'-]+$/i;
    if (e.target.value === "" || re.test(e.target.value))
      this.setState({ lastName: e.target.value });
    return this.handleChange;
  };
  validateNumber = (e) => {
    const re = /^[\+\d]*$/;
    if (e.target.value === "" || re.test(e.target.value))
      this.setState({ phoneNumber1: e.target.value });
    return this.handleChange;
  };
  validateNumberSec = (e) => {
    const re = /^[\+\d]*$/;
    if (e.target.value === "" || re.test(e.target.value))
      this.setState({ phoneNumber2: e.target.value });
    return this.handleChange;
  };
  validateEmail = (e) => {
    const re = /^[a-z 1-9 .@-_]+$/i;
    if (e.target.value === "" || re.test(e.target.value))
      this.setState({ email: e.target.value });
    return this.handleChange;
  };
  validateSalary = (e) => {
    const re = /^[\d]*$/;
    if (e.target.value === "" || re.test(e.target.value))
      this.setState({ salary: e.target.value });
    return this.handleChange;
  };
  resetMessage() {
    this.timerId = setTimeout(() => {
      this.setState({ success: false });
      this.timerId = null;
    }, 5000);
  }
  render() {
    return (
      <div class="addition">
        <form id="my-form" onSubmit={this.handleSubmit}>
          {this.state.success ? this.saveCandidate() : null}
          {this.state.error ? this.saveErrorCandidate() : null}
          <div class="addition__info">
            <div class="addition__contacts">
              <p>Контактная информация</p>
              <div class="addition__contacts_wrapper">
                <div class="addition__contacts_wrapped">
                  <div class="addition__contacts_wrap">
                    <label fpr="name">Имя</label>
                    <div className="addition__contacts_error_wrap">
                      <input
                        type="text"
                        name="firstName"
                        maxLength={20}
                        onChange={this.validateName}
                        value={this.Capitalize(this.state.firstName)}
                      />
                    </div>
                    <label for="surname">Фамилия</label>
                    <div className="addition__contacts_error_wrap">
                      <input
                        type="text"
                        name="lastName"
                        maxLength={20}
                        required
                        onChange={this.validateSurname}
                        value={this.Capitalize(this.state.lastName)}
                      />
                    </div>
                  </div>
                  <div class="addition__contacts_wrap">
                    <label for="number1">Телефон 1</label>
                    <div className="addition__contacts_error_wrap">
                      <input
                        type="tel"
                        name="phoneNumber1"
                        style={{ border: this.state.borderNumber }}
                        placeholder="+38 (___) ___-__-__"
                        maxLength="13"
                        onChange={this.validateNumber}
                        value={this.state.phoneNumber1}
                        required="true"
                      />
                      <div className="addition__contacts_error">
                        {this.state.phoneError}
                      </div>
                    </div>
                    <label for="email">Почта</label>
                    <div className="addition__contacts_error_wrap">
                      <input
                        type="text"
                        name="email"
                        style={{ border: this.state.borderEmail }}
                        onChange={this.validateEmail}
                        value={this.state.email}
                        required
                      />
                      <div className="addition__contacts_error">
                        {this.state.emailError}
                      </div>
                    </div>
                  </div>
                  <div class="addition__contacts_wrap">
                    <label>Телефон 2</label>
                    <input
                      type="tel"
                      name="phoneNumber2"
                      placeholder="+38 (___) ___-__-__"
                      maxLength="13"
                      onChange={this.validateNumberSec}
                      value={this.state.phoneNumber2}
                    />
                    <label>Образование</label>
                    <select
                      name="educationByVacancy"
                      onChange={this.handleChange}
                      value={this.state.educationByVacancy}
                    >
                      <option value="Высшее">Высшее</option>
                      <option value="Курсы">Курсы</option>
                      <option value="Стажировка">Стажировка</option>
                      <option value="Другое">Другое</option>
                    </select>
                  </div>

                  <div class="addition__contacts_wrap">
                    <label>Город проживания</label>
                    <input
                      type="text"
                      name="cityOfResidence"
                      maxLength={30}
                      onChange={this.handleChange}
                      value={this.Capitalize(this.state.cityOfResidence)}
                    />
                    <label>Текущее место работы</label>
                    <input
                      type="text"
                      name="currentWorkingPlace"
                      onChange={this.handleChange}
                      value={this.state.currentWorkingPlace}
                    />
                  </div>
                </div>
                <div className="addition__contacts_resume">
                  <div class="addition__contacts_resume_wrap">
                    <label>Подбираем на вакансию</label>
                    <input type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div class="addition__stage">
              <p>Стадии рек процесса</p>
              <div class="addition__stage_wrap">
                <div className="addition__stage_wrap_elem">
                  Скрининг Заказчика
                  <input type="checkbox" name="screaning" />
                  <label></label>
                </div>
                <div className="addition__stage_wrap_elem">
                  Интервью с заказчиком
                  <input type="checkbox" name="interviewcust" />
                  <label></label>
                </div>
                <div className="addition__stage_wrap_elem">
                  Создать оффер (+испыт.срок)
                  <input type="checkbox" name="createoffer" />
                  <label></label>
                </div>
                <div className="addition__stage_wrap_elem">
                  Отправить офер+список
                  <input type="checkbox" name="sendoffer" />
                  <label></label>
                </div>
                <div className="addition__stage_wrap_elem">
                  Офер подписан кандидатом
                  <input type="checkbox" name="offersigned" />
                  <label></label>
                </div>
                <div className="addition__stage_wrap_elem">
                  Отправить док-ты Бухгалтер
                  <input type="checkbox" name="senddocs" />
                  <label></label>
                </div>
                <div className="addition__stage_wrap_elem">
                  Отказ
                  <input type="checkbox" name="refusal" />
                  <label></label>
                </div>
              </div>
            </div>
          </div>
          <div class="addition__job">
            <div className="addition__work_title">
              <h2>
                <span>Работа</span>
              </h2>
            </div>
            <div class="addition__work">
              <div class="addition__work_wrapped">
                <div class="addition__work_wrap">
                  <label>Форма занятости</label>
                  <select
                    maxLength={30}
                    name="formOfEmployment"
                    onChange={this.handleChange}
                    value={this.state.formOfEmployment}
                  >
                    <option value="Постоянная">Постоянная</option>
                    <option value="По контракту">По контракту</option>
                    <option value="Совмещение">Совмещение</option>
                    <option value="Консультация">Консультация</option>
                  </select>
                  <label>Приоритет</label>
                  <select
                    name="educationByVacancy"
                    name="priority"
                    onChange={this.handleChange}
                    value={this.state.priority}
                  >
                    <option value="Удаленно">Удаленно</option>
                    <option value="Офис">Офис</option>
                    <option value="Гибридно">Гибридно</option>
                  </select>
                </div>
                <div class="addition__work_wrap">
                  <label>Претендуемая должность</label>
                  <input
                    type="text"
                    name="proposedPosition"
                    onChange={this.handleChange}
                    value={this.state.proposedPosition}
                    required
                  />
                  <label>Город(а), где согласен работать</label>
                  <input
                    type="text"
                    name="citiesToWork"
                    onChange={this.handleChange}
                    value={this.Capitalize(this.state.citiesToWork)}
                  />
                </div>
              </div>
              <div class="addition__work_payment">
                <label>Зп</label>
                <input
                  type="text"
                  name="salary"
                  maxLength={9}
                  onChange={this.validateSalary}
                  value={this.state.salary}
                />
                <label>Валюта зарплаты</label>
                <select
                  name="salaryCurrency"
                  onChange={this.handleChange}
                  value={this.state.salaryCurrency}
                >
                  <option value=""></option>
                  <option value="ГРН">ГРН</option>
                  <option value="USD">USD</option>
                  <option value="EURO">EURO</option>
                  <option value="PLN">PLN</option>
                  <option value="RUB">RUB</option>
                </select>
              </div>
            </div>
            <div class="addition__comment">
              <div class="addition__comment_wrap">
                <label>Комментарий</label>
                <textarea
                  maxLength={300}
                  name="comment"
                  onChange={this.handleChange}
                  value={this.state.comment}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default class AdditionCandidates extends Component {
  constructor() {
    super();
    this.state = {
      changeColor: false,
      checked: false,
    };
  }
  automaticCheckedBox() {
    this.setState({ changeColor: !this.state.changeColor });
    this.setState({ checked: !this.state.checked });
  }
  InputChecked(hi) {
    let change_div = this.state.changeColor
      ? "addition__stage_wrap_elem_checked"
      : "addition__stage_wrap_elem";
    return (
      <div className={change_div} onClick={() => this.automaticCheckedBox()}>
        {hi}
        <input
          type="checkbox"
          name="hrinterview"
          checked={this.state.checked}
        />
        <label></label>
      </div>
    );
  }
  clearForm() {
    this.clear.clearForm();
  }
  saveCandidat;
  render() {
    return (
      <React.Fragment>
        <div class="addition_whole">
          <div class="back">
            <div className="back__wrap">
              <a href="/buildfortesters/candidates">
                <button class="addition_back">
                  <img src={back_arrow} />
                </button>
              </a>
              <p>Добавить кандидата</p>
            </div>
            <div class="back__buttons_wrap">
              <button form="my-form" type="submit" class="back__buttons_add">
                Сохранить кандидата
              </button>
              <button
                onClick={this.clearForm.bind(this)}
                class="back__buttons_clear"
              >
                Очистить
              </button>
            </div>
          </div>
          <ValidateContacts ref={(clear) => (this.clear = clear)} />
          <div className="addition__vacancies">
            <div className="addition__vacancies_title">
              <h2>
                <span>Подбираем на вакансию</span>
              </h2>
            </div>
            <div className="addition__vacancies_selection">
              <div className="addition__vacancies_selection_up">
                <div className="addition__vacancies_text">
                  <p>Вакансия</p>
                </div>
                <div className="addition__vacancies_text">
                  <p>Заказчик</p>
                </div>
                <div className="addition__vacancies_text">
                  <p>Контактное лицо</p>
                </div>
                <div className="addition__vacancies_text">
                  <p>Телефон заказчика</p>
                </div>
                <div className="addition__vacancies_text">
                  <p>Статус</p>
                </div>
                <div className="addition__vacancies_text">
                  <p>Дата закрытия</p>
                </div>
              </div>
              <div className="addition__vacancies_selection_wrap">
                <div className="addition__vacancies_selection_text">
                  <p>Java Программист</p>
                </div>
                <div className="addition__vacancies_selection_text">
                  <p>Start IT</p>
                </div>
                <div className="addition__vacancies_selection_text">
                  <p>Николай Соболев</p>
                </div>
                <div className="addition__vacancies_selection_text">
                  <p>066 123456</p>
                </div>
                <div className="addition__vacancies_selection_text">
                  <p>Одобрен заказчиком</p>
                </div>
                <div className="addition__vacancies_selection_text">
                  <p>01.01.2022</p>
                </div>
              </div>
              <div className="addition__vacancies_selection_wrap">
                <div className="addition__vacancies_selection_text">
                  <p>Java Программист</p>
                </div>
                <div className="addition__vacancies_selection_text">
                  <p>Start IT</p>
                </div>
                <div className="addition__vacancies_selection_text">
                  <p>Николай Соболев</p>
                </div>
                <div className="addition__vacancies_selection_text">
                  <p>066 123456</p>
                </div>
                <div className="addition__vacancies_selection_text">
                  <p>Одобрен заказчиком</p>
                </div>
                <div className="addition__vacancies_selection_text">
                  <p>01.01.2022</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
