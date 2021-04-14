import React from "react";
import "../../App/App.css";
import HeaderLayout from "../Header/Header"
import MenuLayout from "../Menu/MenuLayout";
import RouterUrl from "../RouterULR/RouterUrl"
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
      marginTop: "auto",
      zIndex : "2",
    }
    return (
      <div >
        <Layout>
          <MenuLayout collapsed={this.state.collapsed} />
          <Layout>
            <HeaderLayout collapsed={this.collapsed} />
            <RouterUrl />
            <Footer style={style} className="layout-footer">
              Ant Design ©2020 Created by TuoiTre
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}
