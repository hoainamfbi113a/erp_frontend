import React from "react";
import "../../App/App.css";
import "../Crm/Crm.css"
import HeaderLayout from "../Header/Header"
import MenuLayout from "../Menu/MenuLayout";
import RouterUrl from "../RouterULR/RouterUrl"
import RouterUrlEmployee from "../RouterULR/RouterUrlEmployee"
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout, Menu } from "antd";
import "../RouterULR/RouterUrl.css"

const { Footer } = Layout;
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
              Ant Design ©2020 Created by TuoiTre
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}
