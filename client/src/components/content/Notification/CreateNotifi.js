import React, { useEffect, useState } from "react";
import { Button, Pagination, Space, Popconfirm, Tag } from "antd";
import "./notification.css";
import history from "assets/images/history.png";
import ProposalForm from "components/Modal/ProposalForm";
import docCookies from "doc-cookies";
import axios from "axios";
import { Collapse, message, Tabs } from "antd";
import { useSelector } from "react-redux";
import { simpleDate } from "../../../helpers/FuncHelper";
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const checkStatus = {
  processed: {
    icon: <CheckCircleOutlined />,
    color: "success",
    tag: "Đã duyệt",
  },
  processing: {
    icon: <SyncOutlined />,
    color: "processing",
    tag: "Đang chờ duyệt",
  },
  canceled: {
    icon: <CloseCircleOutlined />,
    color: "error",
    tag: "Đã hủy",
  },
};

const { TabPane } = Tabs;
const { Panel } = Collapse;
const CreateNotifi = (props) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [dataDocumentType, setDataDocuType] = useState(null);
  const [dataDocumentUser, setDataDocuUser] = useState(null);
  const [treeData, setTreeData] = useState(null);
  const [arrPermission, setArrPermission] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const permissionUser = useSelector((state) => state.permission);

  const showModal = (value) => {
    setVisible(true);
    setTitle(value);
  };

  const hideModal = () => {
    setVisible(false);
  };

  useEffect(() => {
    getDataDocumentType();
    getDataDocumentListUser(1);
    let arr = [];
    for (const property in permissionUser) {
      for (const item of permissionUser[property].groups) {
        for (const itemChild of item.permissions) {
          arr.push(itemChild.id);
        }
      }
    }
    setArrPermission(arr);
  }, []);

  const getDataDocumentType = () => {
    axios
      .get("/api/document-type/get-document-types")
      .then((res) => {
        setDataDocuType(res.data);
        let data = [];
        for (let item of dataDocumentType) {
          let treeDataStudent = [];
          for (let itemChild of item.children) {
            const treeNodeChild = {
              title: itemChild.display_name,
              key: itemChild.id,
              id: itemChild.id,
              template_id: itemChild.template_id,
            };
            treeDataStudent.push(treeNodeChild);
          }
          const treeNode = {
            title: item.display_name,
            key: item.id,
            children: treeDataStudent,
          };
          data.push(treeNode);
        }
        setTreeData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDataDocumentListUser = (page) => {
    axios
      .get(
        `/api/document/list?page=${page}&per_page=10&user_id=${docCookies.getItem(
          "user_id"
        )}`
      )
      .then((res) => {
        console.log(res.data.data);
        setDataDocuUser(res.data.data);
        setTotalPage(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePagination = (pagination) => {
    getDataDocumentListUser(pagination);
  };

  const checkPermissionUser = (idPermission) => {
    for (let item of arrPermission) {
      if (item == idPermission) {
        return true;
      }
    }
    return false;
  };
  const onSelect = (id) => {
    if (id) {
      axios
        .get(`/api/document-template/get?type_id=${id}`)
        .then((data) => {
          if (data.data === "") {
            message.info("Template chưa được tạo");
          } else {
            props.history.push(`/form-document/${id}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  };

  const confirm = (id) => {
    axios
      .post(`/api/document/delete`, { id })
      .then((res) => {
        console.log(res);
        if (res.data.message === "success") {
          message.success("Xoá tài liệu thành công");
          getDataDocumentListUser(1);
        }
      })
      .catch((err) => {
        message.error("Xóa tài liệu thất bại");
        console.log(err);
      });
  };
  const handleViewDocument = (id) => {
    props.history.push(`/form-document-view/${id}`);
  };

  const renderPanel = () => {
    if (dataDocumentType) {
      return dataDocumentType.map((item) => {
        return (
          <Panel header={item.display_name} key={item.id}>
            {item.children.map((itemChild) => {
              if (checkPermissionUser(itemChild.permission)) {
                return (
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => onSelect(itemChild.id)}
                  >
                    {itemChild.display_name}
                  </p>
                );
              }
              return;
            })}
          </Panel>
        );
      });
    }
  };

  const renderHistoryCreate = () => {
    if (dataDocumentUser) {
      return dataDocumentUser.map((item) => {
        return (
          <tr>
            <td
              onClick={() => {
                handleViewDocument(item.id);
              }}
              className="content-notification-unread"
            >
              {item.document_type.display_name}
            </td>
            <td>
              {!item.eviction ? (
                <Tag
                  icon={checkStatus[item.process.status].icon}
                  color={checkStatus[item.process.status].color}
                >
                  {checkStatus[item.process.status].tag}
                </Tag>
              ) : (
                <Tag icon={<ClockCircleOutlined />} color="warning">
                  Chưa xem
                </Tag>
              )}
            </td>
            <td>{simpleDate(item.updated_at)}</td>
            <td>
              {item.eviction ? (
                <Space size="middle">
                  <Popconfirm
                    onConfirm={() => confirm(item.id)}
                    title="Bạn có muốn thu hồi không?"
                    okText="Có"
                    cancelText="Không"
                  >
                    <Tag
                      visible="false"
                      color="volcano"
                      className="table-action"
                    >
                      Thu hồi
                    </Tag>
                  </Popconfirm>
                </Space>
              ) : (
                ""
              )}
            </td>
          </tr>
        );
      });
    }
  };

  return (
    <div className="create-notifi">
      <div
        className="content-background2-left"
        style={{
          margin: "0",
          marginTop: "10px",
          padding: "0",
          paddingTop: "20px",
        }}
      >
        <div style={{ minHeight: "70vh" }} className="content-main">
          <div className="content-top content-top-create-notif">
            <div className="content-top-left content-notification content-notification-create-notif">
              <div
                className="content-top-left-sum-item"
                style={{ marginLeft: "0" }}
              >
                Lịch sử tạo
              </div>
            </div>
          </div>

          <Tabs defaultActiveKey="1">
            <TabPane tab="Tất cả" key="1">
              <table
                className="content-notification-table content-notification-table-create"
                style={{ marginTop: "0" }}
              >
                <tbody>
                  <tr>
                    <th>Nội dung</th>
                    <th>Trạng thái</th>
                    <th>Ngày</th>
                    <th>Hành động</th>
                  </tr>
                  {renderHistoryCreate()}
                </tbody>
              </table>
            </TabPane>
            <TabPane tab="Đơn chưa duyệt" key="2">
              Đơn chưa duyệt
            </TabPane>
            <TabPane tab="Đơn đã duyệt" key="3">
              Đơn đã duyệt
            </TabPane>
            <TabPane tab="Đơn chưa xem" key="4">
              Đơn chưa xem
            </TabPane>
          </Tabs>

          <div className="content-bottom-pagination">
            <Pagination onChange={handlePagination} total={totalPage} />
          </div>
        </div>
      </div>
      <div
        className="content-background2-right"
        style={{
          margin: "0",
          marginTop: "10px",
          padding: "0",
          paddingTop: "20px",
        }}
      >
        <div style={{ minHeight: "70vh" }} className="content-main">
          <div className="content-top content-top-create-notif">
            <div className="content-top-left content-notification content-notification-create-notif">
              <div className="content-top-left-sum-item">Tạo loại tài liệu</div>
            </div>
          </div>
          {/* <Tree
            treeData={treeData}
            // height={233}
            defaultExpandAll
            onSelect={this.onSelect}
          /> */}
          <Collapse
            className="create-notification-collapse"
            //onChange={this.callback}
          >
            {renderPanel()}
          </Collapse>
          <div className="create-notifi-content"></div>
        </div>
      </div>
      <ProposalForm
        title={title}
        showProposal={visible}
        hideModal={hideModal}
      ></ProposalForm>
    </div>
  );
};
export default CreateNotifi;
