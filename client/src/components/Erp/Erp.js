import React from "react";
import "../../App/App.css";
import HeaderLayout from "../Header/Header"
import MenuLayout from "../Menu/MenuLayout";
import RouterUrl from "../RouterULR/RouterUrl"
import { Route } from 'react-router-dom';
import { Layout } from "antd";
import "../RouterULR/RouterUrl.css"
import "./Erp.css"
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
    const style = {
      textAlign: "center",
      width: "100%",
      bottom: "0",
      "margin-top": "auto",
      "z-index": "2",
      padding: "26px",
    }
    return (
      <div >
        <Layout>
          <MenuLayout collapsed={this.state.collapsed} />
          <Layout>
            <HeaderLayout collapsed={this.collapsed} />
            <Route path="/" component = {RouterUrl}></Route>
            <Footer style={style} className="layout-footer">
              Ant Design ©2020 Created by TuoiTre
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}
