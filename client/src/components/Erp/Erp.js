import React from "react";
import "../../App/App.css";
import HeaderLayout from "../Header/Header"
import MenuLayout from "../Menu/MenuLayout";
import RouterUrl from "../RouterULR/RouterUrl"
import RouterUrlEmployee from "../RouterULR/RouterUrlEmployee"
import { Route } from 'react-router-dom';
import { Layout } from "antd";
import "../RouterULR/RouterUrl.css"

const { Footer } = Layout;
export default class Erp extends React.Component {
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
      <div >
        <Layout>
          <MenuLayout collapsed={this.state.collapsed} />
          <Layout>
            <HeaderLayout collapsed={this.collapsed} />
            <Route path="/" component = {RouterUrl}></Route>
            {/* <Route path="/" component = {RouterUrlEmployee}></Route> */}
       
           
             {/* <Route path="erp/employee/edit" component = {EditInforEmployee}></Route> */}
            <Footer style={{ textAlign: "center" }} className="layout-footer">
              Ant Design ©2020 Created by TuoiTre
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}
