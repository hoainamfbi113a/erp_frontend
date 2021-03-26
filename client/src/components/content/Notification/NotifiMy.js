import React, { Component } from "react";
import { Button, notification, Pagination } from "antd";
import docCookies from "doc-cookies";
import { updateStatusNotify, listNotify } from "apis/notificationApi";
import axiosConfig from "apis/axios";
import "./notification.css";
const app_id = 99;
const slug = "profile";
const per_page = 15;
export default class NotifiMy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      paginationPage: 1,
      notification:null
    };
  }
  componentDidMount = () => {
    const user_id = docCookies.getItem("user_id");
    axiosConfig.get(`/api/notification/list?user_id=${user_id}`)
    .then(res=>{
      console.log(res)
      this.setState({
        notification:res.data
      })
    })
    .catch(err=>{
      console.log("err")
    })
    // this.fetchNotify(1);
  };
  fetchNotify = async (value) => {
    const user_id = docCookies.getItem("user_id");
    const params = {
      app_id,
      slug,
      user_id,
      per_page,
      page: value,
    };
    let resListNotify = await listNotify(params);
    console.log("resListNotify", resListNotify)
    if(!resListNotify.err){
      this.setState({
        data: resListNotify,
      });
    }
  };

  changeStatusNotify = async (id) => {
    const params = {
      status: "2",
    };
    let resUpdateStatusNotify = await updateStatusNotify(id, params);
    if (resUpdateStatusNotify.message === "Success!. Updated") {
      this.fetchNotify(this.state.paginationPage);
    }
  };
  onChangePagination = (page) => {
    this.setState({
      paginationPage: page,
    });
    this.fetchNotify(page);
  };
  changeStatusNotiDocument = (item_id, document_id, process_id) =>{
    axiosConfig.get(`/api/notification/mark-as-read/${item_id}`)
    .then(res=>{
      let body = {
            "process_id": +process_id,
            "user_id":  +docCookies.getItem("user_id"),
            "status": "view"
          }
        axiosConfig.post("/api/document-process/process",body)
        .then(res=>{
          console.log("123")
          this.props.history.push(`/form-document-view/${document_id}/${process_id}`);
        })
        .catch(err=>{
          console.log("err")
          alert("Lỗi rồi")
        })
      
    })
    .catch(err=>{
      console.log("err", err)
    })
  }
   renderNotifyItemDocument = () => {
    let dataNotify = this.state.notification;
    if (!!dataNotify) {
      return dataNotify.map((item) => {
        return (
          <tr key={item.id}>
            <td>
              <div className="content-notification-table-btn">
                {!!item.serviceManagement === true
                  ? item.serviceManagement.data.slug
                  : ""}
              </div>
            </td>
            <td
              className={item.status === 1 ? "content-notification-unread" : ""}
              onClick={() => {
                this.changeStatusNotiDocument(item.id,item.process.document_id, item.process.id)
              }}
            >
              {item.content}
            </td>
            <td>{item.created_at}</td>
          </tr>
        );
      });
    }
  };

  renderNotifyItem = () => {
    let dataNotifyDocument = this.state.data;
    if (!!dataNotifyDocument) {
      return dataNotifyDocument.data.map((item) => {
        return (
          <tr key={item.id}>
            <td>
              <div className="content-notification-table-btn">
                {!!item.serviceManagement === true
                  ? item.serviceManagement.data.slug
                  : ""}
              </div>
            </td>
            <td
              className={item.status === 1 ? "content-notification-unread" : ""}
              onClick={() => {
                this.changeStatusNotify(item.id);
              }}
            >
              {item.content}
            </td>
            <td>{item.created_at}</td>
          </tr>
        );
      });
    }
  };

  render() {
    return (
      <div className="content-background2">
        <div style={{ minHeight: "70vh" }} className="content-main">
          <div className="content-top">
            <div className="content-top-left content-notification">
              <div className="content-top-left-sum-item">Thông báo của tôi</div>
              <Button className="btn-notification" type="primary">
                ...
              </Button>
            </div>
          </div>
          <table className="content-notification-table">
            <tbody>
              <tr>
                <th>Tin</th>
                <th>Nội dung</th>
                <th>Ngày</th>
              </tr>
              {/* <tr>
                <td>
                  <div className="content-notification-table-btn content-notification-table-btn__paycheck">
                    Phiếu lương
                  </div>
                </td>
                <td className="content-notification-unread">
                  Gửi Vinh, Phiếu lương tháng 11/2020...
                </td>
                <td>09:15</td>
              </tr>
              <tr>
                <td>
                  <div className="content-notification-table-btn">Họp</div>
                </td>
                <td className="content-notification-unread">
                  Gửi Vinh, Họp phòng CNTT...
                </td>
                <td>09:15</td>
              </tr>
              <tr>
                <td>
                  <div className="content-notification-table-btn">Họp</div>
                </td>
                <td className="content-notification-unread">
                  Gửi Vinh, Họp chi đoàn tòa soạn.
                </td>
                <td>09:15</td>
              </tr>
              <tr>
                <td>
                  <div className="content-notification-table-btn">Họp</div>
                </td>
                <td>
                  Gửi các bạn phòng CNTT, 2:00 PM Phòng CNTT sẽ có cuộc hơp về
                  dự án A với sự miêu tả của anh B. Mong các bạn đến đúng
                  giờ....
                </td>
                <td>09:15</td>
              </tr>
              <tr>
                <td>
                  <div className="content-notification-table-btn">Họp</div>
                </td>
                <td>
                  Gửi các bạn phòng CNTT, 2:00 PM Phòng CNTT sẽ có cuộc hơp về
                  dự án A với sự miêu tả của anh B. Mong các bạn đến đúng
                  giờ....
                </td>
                <td>09:15</td>
              </tr> */}
              {this.renderNotifyItem()}
              {this.renderNotifyItemDocument()}
            </tbody>
          </table>
          <div>
            <Pagination
              defaultCurrent={1}
              total={50}
              onChange={this.onChangePagination}
            />
          </div>
        </div>
      </div>
    );
  }
}
