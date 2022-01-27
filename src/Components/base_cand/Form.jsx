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
    var items = this.props.items;
    var pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    pager = this.getPager(items.length, page);

    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
    this.setState({
      pager: pager,
    });

    this.props.onChangePage(pageOfItems);
  }

  getPager(totalItems, currentPage, pageSize) {
    currentPage = currentPage || 1;

    pageSize = pageSize || 10;

    var totalPages = Math.ceil(totalItems / pageSize);
    var startPage, endPage;

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

    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    var pages = [...Array(endPage + 1 - startPage).keys()].map(
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
    var pager = this.state.pager;

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
  }
  
  componentDidMount() {
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

  InfoCandidate(i, props) {
    return (
      <div
        className="form__cand_show_more_details"
        style={{ margin: props.childVisibleAnim }}
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

  render() {
    const { error, isLoaded, items } = this.state;
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
        <SortCandidates
          setSortType={this.sortByName}
          onChangePage={this.onChangePage}
          childVisibleAnim={this.state.childVisibleAnim}
          rotate={this.state.rotate}
          visibleDiv={this.visibleDiv}
          InfoCandidate={this.InfoCandidate}
          childVisible={this.state.childVisible}
          pageOfItems={this.state.pageOfItems}
          items={this.state.items}
        />
      );
    }
  }
}

// sort is not ready yet
function SortCandidates(props) {

  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState("albums");

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        name: "name",
        payment: "payment",
        date: "releasedOn",
      };
      const sortProperty = types[type];
      const sorted = [...props.pageOfItems].sort(
        (a, b) => b[sortProperty] - a[sortProperty]
      );
      setData(sorted);
    };
    sortArray(sortType);
  }, [sortType]);

  return (
    <div className="form__cand">
      {props.pageOfItems.map((item, i) => (
        <div
          className="form__cand_show"
          onClick={() => props.visibleDiv(i)}
          key={item.name}
        >
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
            <button
              className={
                props.rotate === i
                  ? "form__cand_show_details_active"
                  : "form__cand_show_details"
              }
            >
              <i class="fas fa-caret-left"></i>
            </button>
            {props.childVisible === i ? props.InfoCandidate(item, props) : null}
          </div>
        </div>
      ))}
      <Pagination items={props.items} onChangePage={props.onChangePage} />
    </div>
  );
}

export default class Form extends Component {


  render() {
    return (
      <div className="form">
        <div className="form_up">
          <div className="form_up__name">
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
          <div className="form_up__filter">
            <button>По имени</button>
            <button>По зп</button>
            <button>По дате</button>
          </div>
        </div>
        <FormVisible />
      </div>
    );
  }
}

