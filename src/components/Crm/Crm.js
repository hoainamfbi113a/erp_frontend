import React from "react";
import "../../App/App.css";
import "../Crm/Crm.css"
import HeaderLayout from "../Header/Header"
import MenuLayout from "../Menu/MenuLayout";
import RouterUrl from "../RouterULR/RouterUrl"
// import ContentC from "../content/ContentC";
import { Layout, Menu } from "antd";

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
            <RouterUrl/>

            <Footer style={{ textAlign: "center" }} className="layout-footer">
              Ant Design ©2020 Created by Hoai Nam
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}
