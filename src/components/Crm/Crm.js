import React from "react";
import "../../App/App.css";
import "../Crm/Crm.css"
import HeaderLayout from "../Header/Header"
import MenuLayout from "../Menu/MenuLayout";
import RouterUrl from "../RouterULR/RouterUrl"
import RouterUrlEmployee from "../RouterULR/RouterUrlEmployee"
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout, Menu } from "antd";
import ProfileOne from "../Profile/ProfileOne"
import "../RouterULR/RouterUrl.css"
import Adduser1 from "../Adduser/Adduser1"
import AddUserBase from "../Adduser/AddUserBase"
import ContentC from "../content/ContentC";
import ContentUserBase from "../content/ContentUserBase";
import ContentUserDegree from "../content/ContentUserDegree";
import ContentUserDepartment from "../content/ContentUserDepartment";
import ContentUserJournalistCard from "../content/ContentUserJournalistCard";
import ContentUserPersonalHistory from "../content/ContentUserPersonalHistory";
import ContentUserWorkObject from "../content/ContentUserWorkObject";

import ContentUserSix from "../content/ContentSix";
import AddUserSix from "../Adduser/AddSix"
import EditSix from "../Adduser/EditSix"
import EditInfor from "../Adduser/EditSix"
import EditInforEmployee from "../Adduser/EditSixUser"

import ContentNotification from "../content/Notification/ContentNotification";
import ContentMyNotification from "../content/ContentMyNotification";
import {
  PlusOutlined
} from "@ant-design/icons";
const { Header, Sider, Content, Footer } = Layout;
export default class Crm extends React.Component {
  state = {
    collapsed: false,
  };
  collapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    return (
      <div style={{height:"100vh"}}>
        <Layout>
          <MenuLayout collapsed={this.state.collapsed} />
          <Layout>
            <HeaderLayout collapsed={this.collapsed} />
            <Route  path="/crm/admin" component = {RouterUrl}></Route>
            <Route path="/crm/employee" component = {RouterUrlEmployee}></Route>
             {/* <Route path="crm/employee/edit" component = {EditInforEmployee}></Route> */}
            <Footer style={{ textAlign: "center" }} className="layout-footer">
              Ant Design ©2020 Created by Hoai Nam
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}
