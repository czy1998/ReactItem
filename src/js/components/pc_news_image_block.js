import React from "react";
import { Card } from "antd";
import { Router, Route, Link, browserHistory } from "react-router";

export default class PCNewsImageBlock extends React.Component {
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
    const styleImage={
      display:'block',
      width: this.props.imageWidth,
      height:'90px'
    }
    const styeH3={
      width: this.props.imageWidth,
      whiteSpace:'nowrap',//文本不进行换行
      overflow:'hidden',//超出范围的内容进行隐藏
      textOverflow:'ellipsis'// ellipsis 显示省略符号来代表被修剪的文本
    }
    const {news} = this.state;
    const newsList = news.length
      ? news.map((newsItem, index) => (
          <div key={index} className='imageblock'>
            <Link to={`details/${newsItem.uniquekey}`} target="_blank">
              <div className='custom-image'>
                <img alt='' style={styleImage} src={newsItem.thumbnail_pic_s}/>
              </div>
              <div className='custom-card'>
                <h3 style={styeH3}>{newsItem.title}</h3>
                <p>{newsItem.author_name}</p>
              </div>
            </Link>
          </div>
        ))
      : "没加载到数据";
    return (
      <div className="topNewsList">
        <Card title={this.props.cartTitle} bordered={true} style={{width:this.props.width}}>
          {newsList}
        </Card>
      </div>
    );
  }
}
