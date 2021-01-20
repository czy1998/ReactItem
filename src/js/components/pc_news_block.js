import React from "react";
import { Card } from "antd";
import { Router, Route, Link, browserHistory } from "react-router";

export default class PCNewsBlock extends React.Component {
  constructor() {
    super();
    this.state = {
      news: "",
    };
  }
  componentWillMount() {
    const myFetchOptions = {
      method: "GET",
    };
    fetch(
      "http://v.juhe.cn/toutiao/index?type=" +this.props.type +"&key=b942c74e8c2f36161f431dbc4d17e936",myFetchOptions)
      .then((response) => response.json())
      .then((json) => this.setState({ news: json.result.data }));
      
  }
  render() {
    const {news} = this.state;
    const newsList = news.length
      ? news.map((newsItem, index) => { 
        if(index<10){ 
          return(
          <li key={index}>
            <Link to={`details/${newsItem.uniquekey}`} target="_blank">
              {newsItem.title}
            </Link>
          </li>)}
        })
      : "没加载到数据";
    return (
      <div className="topNewsLits">
        <Card>
          <ul>{newsList}</ul>
        </Card>
      </div>
    );
  }
}
