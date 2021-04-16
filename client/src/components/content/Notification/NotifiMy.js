import React, { useEffect, useState } from "react";
import docCookies from "doc-cookies";
import { updateStatusNotify, listNotify } from "apis/notificationApi";
import axiosConfig from "apis/axios";
import { simpleDate } from "../../../helpers/FuncHelper";
import { Pagination, Tag } from "antd";
import { CheckCircleOutlined, SyncOutlined, CloseCircleOutlined } from "@ant-design/icons";
import "./notification.css";

const checkStatus = {
  "processed": {
    icon: <CheckCircleOutlined />,
    color: "success",
    tag: "Đã duyệt"
  },
  "processing": {
    icon: <SyncOutlined />,
    color: "processing",
    tag: "Đang chờ duyệt"
  },
  "canceled": {
    icon: <CloseCircleOutlined />,
    color: "error",
    tag: "Đã hủy"
  } 
}
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
    if (noti) {
      return noti.map((item) => {
        const ips = item.process.status;
        let status = "processing";
        if(item.user_id.toString() !== docCookies.getItem("user_id")) {
          for(let e of item.process.targets) {
            let checkTargetId = e.target_id.toString() === docCookies.getItem("user_id");
            if(checkTargetId && e.status === "pass") {
              status = "processed";
            } else if(checkTargetId && e.status === "reject") {
              status = "canceled";
            }
          }
        } else {
          if(ips === "processed") {
            status = "processed";
          } 
          else if(ips === "canceled") {
            status = "canceled";
          }
        }
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
              <Tag icon={checkStatus[status].icon} color={checkStatus[status].color} >
                {checkStatus[status].tag}
              </Tag>
            </td>
            <td>{item.content}</td>
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
