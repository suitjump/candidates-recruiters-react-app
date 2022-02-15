import React, { Component, useState, useEffect } from "react";
import styles from "./form.scss";

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pager: {},
    };
  }

  componentWillMount() {
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage);
    }
  }

  setPage(page) {
    let items = this.props.items;
    let pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    pager = this.getPager(items.length, page);

    let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
    this.setState({
      pager: pager,
    });

    this.props.onChangePage(pageOfItems);
  }

  getPager(totalItems, currentPage, pageSize) {
    currentPage = currentPage || 1;

    pageSize = pageSize || 10;

    let totalPages = Math.ceil(totalItems / pageSize);
    let startPage, endPage;

    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    let pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i
    );

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
      itemsOnPage: endIndex + 1,
    };
  }

  render() {
    let pager = this.state.pager;

    if (!pager.pages || pager.pages.length <= 1) {
      return null;
    }

    return (
      <div className="form__cand_page">
        <p className="form__cand_page_total">
          {pager.currentPage}-{pager.itemsOnPage} из {pager.totalPages}
        </p>
        <button
          className={pager.currentPage === 1 ? "disabled" : ""}
          className="form__cand_page_button"
        >
          <a onClick={() => this.setPage(pager.currentPage - 1)}>
            <i class="fas fa-angle-left"></i>
          </a>
        </button>
        <button
          className={pager.currentPage === pager.totalPages ? "disabled" : ""}
          className="form__cand_page_button"
        >
          <a onClick={() => this.setPage(pager.currentPage + 1)}>
            <i class="fas fa-angle-right"></i>
          </a>
        </button>
      </div>
    );
  }
}

class FormVisible extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      pageOfItems: [],
      infoCand: [],
      rotate: false,
      childVisible: false,
      childVisibleAnim: "0",
    };
    this.onChangePage = this.onChangePage.bind(this);
    this.visibleDiv = this.visibleDiv.bind(this);
    this.fetchData()
  }

  fetchData = () => {
    fetch("http://95.216.173.135:8001/candidates")
    .then((res) => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );
  }

  onChangePage(pageOfItems) {
    this.setState({
      pageOfItems: pageOfItems,
      rotate: false,
      childVisible: false,
    });
  }

  validatePage(pageOfItems) {
    if (pageOfItems <= 10) {
      for (let i = 0; i <= pageOfItems.length; i++) {
        return pageOfItems[i];
      }
      return <div className="form__cand_show_name"></div>;
    }
  }

  InfoCandidate(i) {
    return (
      <div
        className="form__cand_show_more_details"
        style={{ margin: this.state.childVisibleAnim }}
      >
        <div className="form__cand_show_more_details_wrap">
          <div className="form__cand_show_more_details_wrapper">
            <div className="form__cand_show_more_details_info">
              <p>Почта</p>
              <p>{i.email}</p>
            </div>
            <div className="form__cand_show_more_details_info">
              <p>Телефон</p>
              <p>{i.phoneNumber1}</p>
              <p>{i.phoneNumber2}</p>
            </div>
            <div className="form__cand_show_more_details_info">
              <p>Опыт</p>
              <p>(No API)</p>
            </div>
            <div className="form__cand_show_more_details_info">
              <p>Занятость</p>
              <p>{i.formOfEmployment}</p>
            </div>
          </div>
          <div className="form__cand_show_more_details_comment">
            <p>Комментарий</p>
            <p>{i.comment}</p>
          </div>
        </div>
      </div>
    );
  }

  visibleDiv(i) {
    this.setState({ childVisible: i, rotate: i });
    if (this.state.childVisible === i || this.state.rotate === i) {
      this.setState({ childVisibleAnim: "0", rotate: false });
      setTimeout(() => {
        this.setState({ childVisible: false });
      }, 200);
    } else {
      setTimeout(() => {
        this.setState({ childVisibleAnim: "0 0 18.875rem 0" });
      }, 50);
    }
  }
  
  updateData(config) {
    this.setState(config);
  }

  render() {
    const { error, isLoaded, items } = this.state;
    const candidates = this.state.pageOfItems.map((item, i) =>
      <div className="form__cand_show" key={item.name}>
          <input type="checkbox"></input>
          <div className="form__cand_show_name">
              <p>{item.firstName}</p>
              <p>{item.lastName}</p>
          </div>
          <div className="form__cand_show_vacancy">
            <p>{item.proposedPosition}</p>
          </div>
          <div className="form__cand_show_state">
              <p>(No API)</p>
          </div>
          <div className="form__cand_show_pay">
              <p>{item.salary}</p>
              <p>{item.salaryCurrency}</p>
          </div>
          <div className="form__cand_show_company">
              <p>{item.currentWorkingPlace}</p>
          </div>
          <div className="form__cand_show_priority">
              <p>{item.priority}</p>
          </div>
          <div className="form__cand_show_date">
              <p>(No API)</p>
          </div>
          <div>
            <button className={this.state.rotate === i ? "form__cand_show_details_active" : "form__cand_show_details"} onClick={() => {this.visibleDiv(i)}}><i class="fas fa-caret-left"></i></button>
            {
              this.state.childVisible === i
                ? this.InfoCandidate(item)
                : null
            }
          </div>
      </div>
    )
    if (error) {
      return (
        <div className="form__cand">
          <p class="form_load"> Error {error.message} </p>
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div className="form__cand">
          <p class="form_load"> Загрузка кандидатов... </p>
        </div>
      );
    } else {
      return (
        <React.Fragment>
    <Toolbar initialData={this.fetchData} items={this.state.items} update={this.updateData.bind(this)} />
    <div className="form__cand">
    {candidates}
    <Pagination items={this.state.items} onChangePage={this.onChangePage} />
</div>
    </React.Fragment>
      );
    }
  }
}

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedSort: false
    }
    this.sorted = { firstName: true, salary: true };
  }

  sort = (type, i) => {
    const { update, items } = this.props;
    this.setState({ clickedSort: i })
    if(!this.state.clickedSort === false) {
      this.setState({ clickedSort: false })
      this.props.initialData()
    }
    const isSorted = this.sorted[type];
    const sorted = [].slice.call(items).sort((a, b) => {
    if(type === 'firstName') {
      return (!b[type].length < 1) - (!a[type].length < 1) || a[type].localeCompare(b[type]);
    } else if(type === "salary") {
      return (!b[type] < 1) - (!a[type] < 1) || a[type] - b[type];
    }
  })

  this.sorted[type] = !isSorted;

  update({
    items: sorted,
    active: 0
  });
  }

  updateSort(value, text, i) {
    return (
      <React.Fragment>
          <button className={this.state.clickedSort === i ? "form_up__filter_button_active" : "form_up__filter_button"} onClick={() => this.sort(value, i)}>{text}</button>
        </React.Fragment>
    )
  }

  render() {
    const buttonSorted = [];
    for(let i = 1; i <= 3; i++) {
      let buttonValue = "";
      let buttonLabel = "";
      switch(i) {
        case 1:
          buttonValue = 'firstName';
          buttonLabel = 'По имени';
          break;
        case 2:
          buttonValue = 'salary';
          buttonLabel = 'По ЗП';
          break;
        case 3: 
          buttonValue = 'NONE'; 
          buttonLabel = 'По дате';
          break;
      }
      buttonSorted.push(this.updateSort(buttonValue, buttonLabel, i))
    }
    return (
      <div className="form_up__filter">
        {buttonSorted}
      </div>
    );
  }
}

export default class Form extends Component {


  render() {
    return (
      <div className="form">
        <div className="form_up">
            <p>Кандидаты</p>
            <a href="/buildfortesters/additioncandidates">
              <button id="AdditionButton">Добавить кандидата</button>
            </a>
          </div>
          <div className="form_up__search">
            <input placeholder="Поиск по имени"></input>
            <i class="fas fa-search"></i>
            <div className="form_up__search_buttons">
              <button>Вакансия</button>
              <button>Статус</button>
              <button>Компания</button>
              <button>Регион</button>
              <button>Приоритет</button>
            </div>
          </div>
          <div className="form_up__control">
            <div className="form_up__delete">
              <button>Редактировать</button>
              <button>Удалить</button>
            </div>
            <div className="form_up__clear">
              <button>Очистить</button>
            </div>
        </div>
        <FormVisible />
      </div>
    );
  }
}

