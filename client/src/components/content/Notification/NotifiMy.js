import React, { useEffect, useState } from "react";
import docCookies from "doc-cookies";
import { updateStatusNotify, listNotify } from "apis/notificationApi";
import axiosConfig from "apis/axios";
import { simpleDate } from "../../../helpers/FuncHelper";
import { Pagination, Tag } from "antd";
import { CheckCircleOutlined, SyncOutlined } from "@ant-design/icons";
import "./notification.css";
const app_id = 99;
const slug = "profile";
const per_page = 15;

const NotifiMy = (props) => {
  const [data, setData] = useState(null);
  const [pagination, setPage] = useState(1);
  const [noti, setNoti] = useState(null);

  useEffect(() => {
    const user_id = docCookies.getItem("user_id");
    axiosConfig
      .get(`/api/notification/list?user_id=${user_id}`)
      .then((res) => {
        console.log(res);
        setNoti(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fetchNotify = async (value) => {
    const user_id = docCookies.getItem("user_id");
    const params = {
      app_id,
      slug,
      user_id,
      per_page,
      page: value,
    };
    let resListNotify = await listNotify(params);
    if (!resListNotify.err) {
      setData(resListNotify);
    }
  };

  const changeStatusNotify = async (id) => {
    const params = {
      status: "2",
    };
    let resUpdateStatusNotify = await updateStatusNotify(id, params);
    if (resUpdateStatusNotify.message === "Success!. Updated") {
      fetchNotify(pagination);
    }
  };

  const onChangePagination = (page) => {
    setPage(page);
    fetchNotify(page);
  };

  const changeStatusNotiDocument = (item_id, document_id, process_id) => {
    axiosConfig
      .get(`/api/notification/mark-as-read/${item_id}`)
      .then((res) => {})
      .catch((err) => {
        console.log("err", err);
      });
    axiosConfig
      .get(`/api/document-process/get?id=${process_id}`)
      .then((res) => {
        let arrTarget = res.targets;
        let userLogin = docCookies.getItem("user_id");
        for (let item of arrTarget) {
          if (item.target_id == userLogin) {
            let body = {
              process_id: +process_id,
              user_id: +userLogin,
              status: "view",
            };
            axiosConfig
              .post("/api/document-process/process", body)
              .then((res) => {})
              .catch((err) => {
                console.log("loi roi");
                console.log(err);
              });
            break;
          }
        }
      })
      .catch((err) => {
        console.log("erraaaa");
      });
    props.history.push(`/form-document-view/${document_id}/${process_id}`);
  };

  const renderNotifyItemDocument = () => {
    // let dataNotify = noti;
    if (dataNotify) {
      return dataNotify.map((item) => {
        let bi = item.process.status;
        let status = false;
        if(item.user_id.toString() !== docCookies.getItem("user_id")) {
          for(let e of item.process.targets) {
            console.log(e.status);
            if(e.target_id.toString() === docCookies.getItem("user_id") && e.status === "pass") {
              status = true;
            }
          }
        } else {
          if(bi === "processed") {
            status = true;
          }
        }
        // if(bi === "processed" && item.user_id.toString() === docCookies.getItem("user_id")) {
        //   status = true;
        // } else status = false;
        //const status = item.process.status === "processed";
        return (
          <tr
            className={
              item.read_at === null ? "content-notification-unread" : ""
            }
            onClick={() => {
              changeStatusNotiDocument(
                item.id,
                item.process.document_id,
                item.process.id
              );
            }}
            key={item.id}
          >
            <td>
              <div className="content-notification-table-btn">
                {item.document_type.display_name}
              </div>
            </td>
            <td>{item.user_name}</td>
            <td>{item.department_name}</td>
            <td>
              {item.document_type.display_name}
            </td>
            <td>
              <Tag
                icon={status ? <CheckCircleOutlined /> : <SyncOutlined spin />}
                color={status ? "success" : "processing"}
              >
                {status ? `Đã duyệt` : `Đang chờ duyệt`}
              </Tag>
            </td>
            {/* {console.log()} */}
            <td>{simpleDate(item.created_at)}</td>
          </tr>
        );
      });
    }
  };

  const renderNotifyItem = () => {
    let dataNotifyDocument = data;
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
                changeStatusNotify(item.id);
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

  return (
    <div className="content-background2">
      <div style={{ minHeight: "70vh" }} className="content-main">
        <div className="content-top">
          <div className="content-top-left content-notification">
            <div className="content-top-left-sum-item">Thông báo của tôi</div>
          </div>
        </div>
        <table className="content-notification-table">
          <tbody>
            <tr>
              <th>Đơn</th>
              <th>Người gửi</th>
              <th>Phòng ban</th>
              <th>Nội dung</th>
              <th>Trạng thái</th>
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
            {renderNotifyItem()}
            {renderNotifyItemDocument()}
          </tbody>
        </table>
        <div>
          <Pagination
            defaultCurrent={1}
            total={50}
            onChange={onChangePagination}
          />
        </div>
      </div>
    </div>
  );
};

export default NotifiMy;
