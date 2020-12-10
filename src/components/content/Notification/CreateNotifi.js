import React, { Component } from "react";
import { Button, Pagination } from "antd";
import "./notification.css";
import proposal from "../../../assets/images/proposal.svg";
import put from "../../../assets/images/put.svg";
import takeleave from "../../../assets/images/takeleave.svg";
import vote from "../../../assets/images/vote.svg";
export default class CreateNotifi extends Component {
  render() {
    return (
      <div className="create-notifi">
        <div className="content-background2">
          <div style={{ minHeight: "70vh" }} className="content-main">
            <div className="content-top content-top-create-notif">
              <div className="content-top-left content-notification content-notification-create-notif">
                <div className="content-top-left-sum-item">Tạo</div>
                <Button className="btn-notification" type="primary">
                  ...
                </Button>
              </div>
            </div>
            <div className="create-notifi-content">
              <ul>
                <li>
                  <img src={proposal}></img>
                  <span> Phiếu đề xuất </span>
                </li>
                <li>
                  <img src={takeleave}></img>
                  <span> Đơn xin nghỉ phép. </span>
                </li>
                <li>
                  <img src={put}></img>
                  <span> Đặt phòng họp.</span>
                </li>
                <li>
                  <img src={vote}></img>
                  <span> Bình bầu thi đua. </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="content-background2">
          <div style={{ minHeight: "70vh" }} className="content-main">
            <div className="content-top content-top-create-notif">
              <div className="content-top-left content-notification content-notification-create-notif">
                <div className="content-top-left-sum-item">Lịch sử tạo</div>
                <Button className="btn-notification" type="primary">
                  ...
                </Button>
              </div>
            </div>
            <table className="content-notification-table content-notification-table-create">
              <tbody>
                <tr>
                  <th>Tin</th>
                  <th>Nội dung</th>
                  <th>Ngày</th>
                </tr>
                <tr>
                  <td>                    
                    <img src={proposal}></img>
                  </td>
                  <td className="content-notification-unread">
                  Phiếu đề xuất, đề xuất mua máy tính mạnh Core I9, ... 
                  </td>
                  <td>09:15</td>
                </tr>
                <tr>
                  <td>
                    <img src={proposal}></img>
                  </td>
                  <td className="content-notification-unread">
                  Phiếu đề xuất, đề xuất mua Iphone, Ipad cho nhân ... 
                  </td>
                  <td>09:15</td>
                </tr>
                <tr>
                  <td>
                  <img src={takeleave}></img>
                  </td>
                  <td className="content-notification-unread">
                  Đơn xin nghĩ phép, Mộc Lan xin nghĩ phép 10 ngày ... 
                  </td>
                  <td>09:15</td>
                </tr>
                <tr>
                  <td>
                  <img src={put}></img>
                  </td>
                  <td>Đặt phòng họp, Đặt phòng hop 2B họp dự án abc ...</td>
                  <td>09:15</td>
                </tr>
                <tr>
                  <td>
                  <img src={takeleave}></img>
                  </td>
                  <td>10h</td>
                  <td>09:15</td>
                </tr>
              </tbody>
            </table>
            <div className="content-bottom">
              <Pagination defaultCurrent={1} total={50} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
