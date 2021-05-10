import React, { useEffect, useState } from "react";
import docCookies from "doc-cookies";
import { updateStatusNotify, listNotify } from "apis/notificationApi";
import axiosConfig from "apis/axios";
import { simpleDate } from "../../../helpers/FuncHelper";
import { Pagination, Select, Tabs } from "antd";

const { TabPane } = Tabs;
const { Option } = Select;
import "./notification.css";

const status = {
  all: "all",
  unconfirmed: "unconfirmed",
  confirmed: "confirmed",
};

const app_id = 99;
const slug = "profile";
const per_page = 15;

const NotifiMy = (props) => {
  const [active_key, setActiveKey] = useState("1");
  const [data, setData] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  const [totalPage2, setTotalPage2] = useState(null);
  const [totalPage3, setTotalPage3] = useState(null);
  const [notiAll, setNotiAll] = useState(null);
  const [notiUnconf, setNotiUnconf] = useState(null);
  const [notiConf, setNotiConf] = useState(null);

  useEffect(async () => {
      await fetchNotiDocument(1, 10, "all");
      await fetchNotiDocument(1, 10, "unconfirmed");
      await fetchNotiDocument(1, 10, "confirmed");
  }, []);

  const fetchNotiDocument = (page, per_page, status) => {
    const user_id = docCookies.getItem("user_id");
    axiosConfig
      .get(
        `/api/notification/list?page=${page}&per_page=${per_page}&user_id=${user_id}&status=${status}`
      )
      .then((res) => {
        if (status === "all") {
          console.log(res.data);
          setNotiAll(res.data);
          setTotalPage(res.total);
        } else if (status === "unconfirmed") {
          setNotiUnconf(res.data);
          setTotalPage2(res.total);
        } else  if (status === "confirmed") {
          setNotiConf(res.data);
          setTotalPage3(res.total);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      fetchNotify(1);
    }
  };

  const onChangePagination = (page, pageSize) => {
    
    if(active_key === "1") {
      fetchNotiDocument(page, pageSize, "all");
    } else if(active_key === "2") {
      fetchNotiDocument(page, pageSize, "unconfirmed");
    } else if(active_key === "3") {
      fetchNotiDocument(page, pageSize, "confirmed");
    }
    
  };

  const onChangeTab = (activeKey) => {
    setActiveKey(activeKey)
  }

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

  const renderNotifyItemDocument = (value) => {
    if (value) {
      //console.log(value);
      return value.map((item) => {
        return (
          <tr
            className={
              item.read_at === null ? "content-notification-unread" : ""
            }
            onClick={() => {
              changeStatusNotiDocument(
                item.id,
                item.document.document_id,
                item.process.id
              );
            }}
            // key={item.id}
          >
            <td>
              <div className="content-notification-table-btn">
                {item.document_type.display_name}
              </div>
            </td>
            <td>
              {item.from_users
                ? item.from_users[0].target_name +
                  " - " +
                  item.from_users[0].department_name
                : ""}
            </td>
            <td>{item.title}</td>
            <td>{simpleDate(item.created_at)}</td>
          </tr>
        );
      });
    }
  };

  const renderTable = (value, total) => {
    return (
      <table className="content-notification-table">
        <tbody>
          <tr>
            <th>Đơn</th>
            <th>Người gửi</th>
            <th>Nội dung</th>
            <th>Ngày</th>
          </tr>
          {renderNotifyItemDocument(value)}
        </tbody>
        <div>
          <Pagination
            total={total}
            onChange={onChangePagination}
            showSizeChanger= {true}
          />
        </div>
      </table>
    );
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
        <Tabs defaultActiveKey="1" onChange={onChangeTab}>
          <TabPane tab="Tất cả" key="1" >
            {renderTable(notiAll, totalPage)}
          </TabPane>
          <TabPane tab="Đơn chưa thực hiện" key="2">
            {renderTable(notiUnconf, totalPage2)}
          </TabPane>
          <TabPane tab="Đơn đã thực hiện" key="3">
            {renderTable(notiConf, totalPage3)}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default NotifiMy;
