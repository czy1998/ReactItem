import React from "react";
import { Row, Col } from "antd";
import { Menu, Icon, Tabs, message, Form, Input, Button, Checkbox, Modal } from "antd";
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import {Router, Route, Link, browserHistory} from 'react-router'
class PCHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      current: "top", //用于绑定全局的tab，第一个选项
      modalVisible: false, //模态框是否显示
      action: "login", //指示按钮是用来做登录还是注册
      hasLogined: false, //标记是否已经登录
      userNickName: "",
      userid: 0,
    };
  }

  componentWillMount(){
		if (localStorage.userid!='') {
			this.setState({hasLogined:true});
			this.setState({userNickName:localStorage.userNickName,userid:localStorage.userid});
		}
  };
  
  setModalVisible(value){
    this.setState({
      modalVisible:value
    })
  }
  handleClick(e){
    if(e.key==='register'){
      this.setState({current:'register'})
      this.setModalVisible(true)
    }else{
      this.setState({current:e.key})
    }
  }
  handleSubmit(e){
    //页面开始向API进行提交数据
    e.preventDefault()
    var myFetchOptions={
      method:'GET'
    }
    var formData=this.props.form.getFieldsValue()
    console.log(formData)
    fetch("http://rap2api.taobao.org/app/mock/253519/"+this.state.action+"/?username="+formData.userName+"&password="+formData.password+"&r_username="+formData.r_userName+"&r_password="+formData.r_password+"&r_confirmpassword="+formData.r_confirmpassword,myFetchOptions).
		then(response=>response.json()).then(json=>{
      //console.log(json)
      this.setState({userNickName:json.NickUserName,userid:json.UserId});
      localStorage.userid= json.UserId;
			localStorage.userNickName = json.NickUserName;
    });
    if (this.state.action=="login") {
      this.setState({hasLogined:true});
      //console.log(1,localStorage.userNickName)
		}
		message.success("请求成功！");
		this.setModalVisible(false);
  }
  callback(key) {
		if (key == 1) {
			this.setState({action: 'login'});
		} else if (key == 2) {
			this.setState({action: 'register'});
		}
	}
  logout(){
		localStorage.userid= '';
		localStorage.userNickName = '';
		this.setState({hasLogined:false});
	};
  render() {
    let { getFieldDecorator } = this.props.form; //用于接受页面的一些参数
    const userShow = this.state.hasLogined  
      ? <Menu.Item key="logout" className="register">{/* htmlType说是submit还是普通的button */}
          <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
          &nbsp;&nbsp;
          <Link target="_blank">          {/* _blank是在新页面打开 */}
            <Button type="dashed" htmlType="button">个人中心</Button>
          </Link>
          &nbsp;&nbsp;
          <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
        </Menu.Item>
      : <Menu.Item key="register" className="register">
        <Icon type="appstore"/>注册/登录
      </Menu.Item>
    ;
    return (
      <header>
        <Row>
          <Col span={2}></Col>
          <Col span={4}>
            <a href="/" className="logo">
              <img src="./src/images/logo.png" alt="logo" />
              <span>ReactNews</span>
            </a>
          </Col>
          <Col span={16}>
            <Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
              <Menu.Item key="top">
                <Icon type="appstore" />
                头条
              </Menu.Item>
              <Menu.Item key="shehui">
                <Icon type="appstore" />
                社会
              </Menu.Item>
              <Menu.Item key="guonei">
                <Icon type="appstore" />
                国内
              </Menu.Item>
              <Menu.Item key="guoji">
                <Icon type="appstore" />
                国际
              </Menu.Item>
              <Menu.Item key="yule">
                <Icon type="appstore" />
                娱乐
              </Menu.Item>
              <Menu.Item key="tiyu">
                <Icon type="appstore" />
                体育
              </Menu.Item>
              <Menu.Item key="keji">
                <Icon type="appstore" />
                科技
              </Menu.Item>
              <Menu.Item key="shishang">
                <Icon type="appstore" />
                时尚
              </Menu.Item>
              {userShow}
            </Menu>
            <Modal
              title="用户中心"
              visible={this.state.modalVisible}
              onCancel={() => this.setModalVisible(false)}
              onOk={() => this.setModalVisible(false)}
              okText="关闭"
            >
              <Tabs type='line' onChange={this.callback.bind(this)}>
                <TabPane tab='登陆' key='1'>
                    <Form layout='horizontal' onSubmit={this.handleSubmit.bind(this)}>
                      <FormItem label='账户'>
                        {getFieldDecorator('userName')(<Input placeholder='请输入您的账号'/>)}
                      </FormItem>
                      <FormItem label='密码'>
                        {getFieldDecorator('password')(<Input type='password' placeholder='请输入您的密码'/>)}
                      </FormItem>
                      <Button type='primary' htmlType='submit'>登录</Button>
                    </Form>
                </TabPane>
                <TabPane tab='注册' key='2'>
                  <Form  onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label='账户'>
                       {getFieldDecorator('r_userName')(<Input placeholder='请输入您的账号'/>)}
                    </FormItem>
                    <FormItem label='密码'>
                       {getFieldDecorator('r_password')(<Input type='password' placeholder='请输入您的密码'/>)}
                    </FormItem>
                    <FormItem label='确认密码'>
                       {getFieldDecorator('r_confirmpassword')(<Input type='password' placeholder='请再次输入您的密码'/>)}
                    </FormItem>
                    <Button type='primary' htmlType='submit'>注册</Button>
                  </Form>
                </TabPane>
              </Tabs>
            </Modal>
          </Col>
          <Col span={2}></Col>
        </Row>
      </header>
    );
  }
}
export default PCHeader = Form.create({})(PCHeader);
