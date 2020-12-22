import React, { Component } from "react";
import { Tabs, Input } from "antd";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";
import { Radio, Checkbox, Select} from 'antd';
import "./Adduser1.css";
import Date from "../CommonComponent/Date"
import Month from "../CommonComponent/Month"
import Year from "../CommonComponent/Year"
import Tabs1 from "./Tabs1"
import Tabs2 from "./Tabs2"
import Tabs3 from "./Tabs3"
import Tabs4 from "./Tabs4"
import Tabs5 from "./Tabs5"
import Tabs6 from "./Tabs6"
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
export default class Adduser1 extends Component {
  render() {
   const onChangeSex = e => {
      setValue(e.target.value);
    };
    return (
      <div>
        <h3 className="title-create">Tạo thông tin nhân viên</h3>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <div className="tabs-title">
                <div className="tabs-title-left">
                  1
                </div>
                <div className="tabs-title-right">
                  <div className="tabs-title-right-top">
                    Thông tin
                  </div>
                  <div className="tabs-title-right-bottom">
                    Thông tin cơ bản của nhân viên
                  </div>
                </div>
              </div>
            }
            key="1"
          >
            <Tabs1/>
          </TabPane>
          <TabPane
             tab={
              <div className="tabs-title">
                <div className="tabs-title-left">
                  2
                </div>
                <div className="tabs-title-right">
                  <div className="tabs-title-right-top">
                    Phòng ban
                  </div>
                  <div className="tabs-title-right-bottom">
                    Thông tin phòng ban của nhân viên
                  </div>
                </div>
              </div>
            }
            key="2"
          >
           <Tabs2/>
          </TabPane>
          <TabPane
             tab={
              <div className="tabs-title">
                <div className="tabs-title-left">
                  3
                </div>
                <div className="tabs-title-right">
                  <div className="tabs-title-right-top">
                    Lý lịch bản thân
                  </div>
                  <div className="tabs-title-right-bottom">
                    Thông tin lý lịch của nhân viên
                  </div>
                </div>
              </div>
            }
            key="3"
          >
            <Tabs3/>
          </TabPane>
          <TabPane
             tab={
              <div className="tabs-title">
                <div className="tabs-title-left">
                  4
                </div>
                <div className="tabs-title-right">
                  <div className="tabs-title-right-top">
                    Trình độ
                  </div>
                  <div className="tabs-title-right-bottom">
                    Thông tin trình độ của nhân viên
                  </div>
                </div>
              </div>
            }
            key="4"
          >
            <Tabs4/>
          </TabPane>
          <TabPane
             tab={
              <div className="tabs-title">
                <div className="tabs-title-left">
                  5
                </div>
                <div className="tabs-title-right">
                  <div className="tabs-title-right-top">
                    Đối tượng
                  </div>
                  <div className="tabs-title-right-bottom">
                    Thông tin đối tượng làm việc nhân viên
                  </div>
                </div>
              </div>
            }
            key="5"
          >
            <Tabs5/>
          </TabPane>
          <TabPane
             tab={
              <div className="tabs-title">
                <div className="tabs-title-left">
                6
                </div>
                <div className="tabs-title-right">
                  <div className="tabs-title-right-top">
                    Số thẻ nhà báo
                  </div>
                  <div className="tabs-title-right-bottom">
                    Thông tin thẻ nhà báo của nhân viên
                  </div>
                </div>
              </div>
            }
            key="6"
          >
            <Tabs6/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
