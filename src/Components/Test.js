import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./test.css";

//This data would normally come from an api
const products = [
  { attributes: [{ option: "size 1" }] },
  { attributes: [{ option: "size 2" }] },
  { attributes: [{ option: "size 3" }] },
  { attributes: [{ option: "size 4" }] },
  { attributes: [{ option: "size 5" }] }
];

export default class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oddSelected: null,
      evenSelected: null,
      evenArray: [],
      oddArray: []
    };
  }

  handleSelectL1(id, i) {
    this.setState({
      oddSelected: i
    });
  }

  handleSelectL2(id, i) {
    this.setState({
      evenSelected: i
    });
  }
  componentDidMount() {
    const evenArray = [];
    const oddArray = [];

    products.map((product, i) => {
      if (i % 2 === 0) {
        evenArray.push(products[i]);
      } else {
        oddArray.push(products[i]);
      }
    });
    this.setState({
      evenArray,
      oddArray
    });
  }

  render() {
    return (
      <div>
        <div style={{ margin: "0 auto", width: "569px", height: "100%" }}>
          <div style={{ display: "inline-block" }}>
            {this.state.evenArray.map((p, i) => {
              return (
                <div
                  key={i}
                  className={
                    this.state.oddSelected === i
                      ? "selectedRBox"
                      : "selectorRBox"
                  }
                  onClick={e => this.handleSelectL1(e, i)}
                >
                  <h1 className="selectorTextL">{p.attributes[0].option}</h1>
                </div>
              );
            })}
          </div>

          <div
            style={{ width: "16px", height: "100%", display: "inline-block" }}
          />

          <div style={{ display: "inline-block", verticalAlign: "top" }}>
            {this.state.oddArray.map((p, i) => {
              return (
                <div
                  key={i}
                  className={
                    this.state.evenSelected === i
                      ? "selectedRBox"
                      : "selectorRBox"
                  }
                  onClick={e => this.handleSelectL2(e, i)}
                >
                  <h1 className="selectorTextL">{p.attributes[0].option}</h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}