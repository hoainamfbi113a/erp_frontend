import React, { Component } from "react";
import { Input } from "antd";
import { Button, Pagination, DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { Radio } from "antd";
export default class PersonalHistory extends Component {
  render() {
    return (
      <div className="edit-infor-form">
        <div className="tabs-main personal-history">
          <div className="personal-history-title">
            Quá trình học tập và làm việc
          </div>
          <div>
          <div className="edit-infr-vertical-line">

          </div>
            <ul>
              <li>
                <div className="personal-history-time">
                  05/09/1990 - 10/05/1995
                </div>
                <p className="personal-history-content">Học sinh Trường Tiểu Học Nguyễn Hữu A</p>
              </li>
              <li>
                <div className="personal-history-time">
                  05/09/1990 - 10/05/1995
                </div>
                <p className="personal-history-content">Học sinh Trường Tiểu Học Nguyễn Hữu A</p>
              </li>
              <li>
                <div className="personal-history-time">
                  05/09/1990 - 10/05/1995
                </div>
                <p className="personal-history-content">Học sinh Trường Tiểu Học Nguyễn Hữu A</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
