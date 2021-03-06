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
          {pager.currentPage}-{pager.itemsOnPage} ???? {pager.totalPages}
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
      clickedSort: false,
      searchValue: ""
    };
    this.onChangePage = this.onChangePage.bind(this);
    this.visibleDiv = this.visibleDiv.bind(this);
    this.sorted = { firstName: true, salary: true };
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
  clearSort() {
    this.setState({ clickedSort: false })
    this.fetchData()
  }
  sortType = (type, i) => {
    const { items } = this.state;
    this.setState({ clickedSort: i })
    if(!this.state.clickedSort === false) {
      this.setState({ clickedSort: false })
      this.fetchData()
    }
    const isSorted = this.sorted[type];
    const sorted = [].slice.call(items).sort((a, b) => {
    if(type === 'firstName') {
      return (!b[type].length < 1) - (!a[type].length < 1) || a[type].localeCompare(b[type]);
    } else if(type === "salary") {
      return (!b[type] < 1) - (!a[type] < 1) || a[type] - b[type];
    }
  })

  console.log(sorted)

  this.sorted[type] = !isSorted;

  this.updateData({
    items: sorted,
    active: 0
  });
  }
  updateSort(value, text, i) {
    return (
      <React.Fragment>
          <button className={this.state.clickedSort === i ? "form_up__filter_button_active" : "form_up__filter_button"} onClick={() => this.sortType(value, i)}>{text}</button>
        </React.Fragment>
    )
  }

  InfoCandidate = (i) => {
    return (
      <div
        className="form__cand_show_more_details"
        style={{ margin: this.state.childVisibleAnim }}
      >
        <div className="form__cand_show_more_details_wrap">
          <div className="form__cand_show_more_details_wrapper">
            <div className="form__cand_show_more_details_info">
              <p>??????????</p>
              <p>{i.email}</p>
            </div>
            <div className="form__cand_show_more_details_info">
              <p>??????????????</p>
              <p>{i.phoneNumber1}</p>
              <p>{i.phoneNumber2}</p>
            </div>
            <div className="form__cand_show_more_details_info">
              <p>????????</p>
              <p>(No API)</p>
            </div>
            <div className="form__cand_show_more_details_info">
              <p>??????????????????</p>
              <p>{i.formOfEmployment}</p>
            </div>
          </div>
          <div className="form__cand_show_more_details_comment">
            <p>??????????????????????</p>
            <p>{i.comment}</p>
          </div>
        </div>
      </div>
    );
  }

  searchCandidatesValue(e) {
    this.setState({searchValue: e.target.value});
  }
  searchCandidates() {
    this.state.searchValue.match(/^\s*$/) // if searchValue has empty value
    ? this.fetchData() 
    : this.setState({items: this.state.items.filter(cand => {
    return cand.firstName.toLowerCase().includes(this.state.searchValue.toLowerCase())})})
  }

  clearReturn() {
    this.setState({searchValue: '', clickedSort: false});
    this.fetchData()
  }

  render() {
    const { error, isLoaded } = this.state;
    const buttonSorted = [];
    for(let i = 1; i <= 3; i++) {
      let buttonValue = "";
      let buttonLabel = "";
      switch(i) {
        case 1:
          buttonValue = 'firstName';
          buttonLabel = '???? ??????????';
          break;
        case 2:
          buttonValue = 'salary';
          buttonLabel = '???? ????';
          break;
        case 3: 
          buttonValue = 'NONE'; 
          buttonLabel = '???? ????????';
          break;
      }
      buttonSorted.push(this.updateSort(buttonValue, buttonLabel, i))
    }
    if (error) {
      return (
        <div className="form__cand">
          <p class="form_load"> Error {error.message} </p>
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div className="form__cand">
          <p class="form_load"> ???????????????? ????????????????????... </p>
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <div className="form_up__search">
            <input onChange={(e) => this.searchCandidatesValue(e)} onKeyDown={(e) => {if(e.keyCode === 13) this.searchCandidates()}} value={this.state.searchValue} placeholder="?????????? ???? ??????????"></input>
            <button className="form_up__search_button"> <i onClick={this.searchCandidates.bind(this)} class="fas fa-search"></i></button>
            <div className="form_up__search_buttons">
              <button>????????????????</button>
              <button>????????????</button>
              <button>????????????????</button>
              <button>????????????</button>
              <button>??????????????????</button>
            </div>
          </div>
          <div className="form_up__control">
            <div className="form_up__delete">
              <button>??????????????????????????</button>
              <button>??????????????</button>
            </div>
            <div className="form_up__clear">
              <button onClick={this.clearReturn.bind(this)}>????????????????</button>
            </div>
        </div>
      <div className="form_up__filter">
        {buttonSorted}
      </div>
    <div className="form__cand">
    {this.state.pageOfItems.map((item, i) =>
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
  )}
    <Pagination items={this.state.items} onChangePage={this.onChangePage} />
</div>
    </React.Fragment>
      );
    }
  }
}


export default class Form extends Component {

  render() {
    return (
      <div className="form">
        <div className="form_up">
            <p>??????????????????</p>
            <a href="/buildfortesters/additioncandidates">
              <button id="AdditionButton">???????????????? ??????????????????</button>
            </a>
          </div>
        <FormVisible />
      </div>
    );
  }
}

