import React, { useEffect, useState } from "react";
import { Button, Pagination, Space, Popconfirm, Tag } from "antd";
import "./notification.css";
import history from "assets/images/history.png";
import ProposalForm from "components/Modal/ProposalForm";
import docCookies from "doc-cookies";
import axios from "axios";
import { Collapse, message, Tabs, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { simpleDate } from "../../../helpers/FuncHelper";
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";

const { Option } = Select;

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
  const dispatch = useDispatch();
  const [sizeOpt, setSizeOt] = useState(10);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [dataDocumentType, setDataDocuType] = useState(null);
  const [dataDocumentUser, setDataDocuUser] = useState(null);
  const [treeData, setTreeData] = useState(null);
  const [arrPermission, setArrPermission] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [pageType, setPageType] = useState("all");
  const [pagi, setPagi] = useState({
    all: {
      page: 1,
    },
    processing: {
      page: 1,
    },
    processed: {
      page: 1,
    },
    canceled: {
      page: 1,
    },
    evicted: {
      page: 1,
    },
  });
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
    getDataDocumentListUser(1, 10, "all");
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

  const getDataDocumentListUser = (page, per_page, status) => {
    dispatch(showLoading());
    axios
      .get(
        `/api/document/list?page=${page}&per_page=${per_page}&user_id=${docCookies.getItem(
          "user_id"
        )}&status=${status}`
      )
      .then((res) => {
        console.log(res.data);
        setDataDocuUser(res.data.data);
        setTotalPage(res.data.total);
        setPagi({ ...pagi, [status]: { page: res.data.page } });
        dispatch(hideLoading());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePagination = (page, pageSize) => {
    setSizeOt(pageSize);
    getDataDocumentListUser(page, pageSize, pageType);
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
    dispatch(showLoading());
    axios
      .post(`/api/document/delete`, { id })
      .then((res) => {
        if (res.data.message === "success") {
          message.success("Xoá tài liệu thành công");
          setTimeout(() => {
            console.log(pageType);
            getDataDocumentListUser(1, sizeOpt, pageType);
          }, 1000);
          dispatch(hideLoading());
        }
      })
      .catch((err) => {
        message.error("Xóa tài liệu thất bại");
        console.log(err);
      });
  };
  const handleViewDocument = (doc_id, process_id) => {
    props.history.push(`/form-document-view/${doc_id}/${process_id}`);
  };
  const formatDataDocumentType = (dataDocumentType) => {
    let arr = [];
    if (dataDocumentType) {
      for (let item of dataDocumentType) {
        let arrChild = [];
        for (let itemChild of item.children) {
          if (checkPermissionUser(itemChild.permission)) {
            let objChild = {
              id: itemChild.id,
              display_name: itemChild.display_name,
            };
            arrChild.push(objChild);
          }
        }
        if (arrChild.length !== 0) {
          let obj = {
            children: arrChild,
            id: item.id,
            display_name: item.display_name,
          };
          arr.push(obj);
        }
      }
    }
    return arr;
  };
  const renderPanel = () => {
    let arr = formatDataDocumentType(dataDocumentType);
    return arr.map((item) => {
      return (
        <Panel header={item.display_name} key={item.id}>
          {item.children.map((itemChild) => {
            return (
              <p
                style={{ cursor: "pointer" }}
                onClick={() => onSelect(itemChild.id)}
              >
                {itemChild.display_name}
              </p>
            );
          })}
        </Panel>
      );
    });
    // }
  };

  const renderHistoryCreate = () => {
    if (dataDocumentUser) {
      return dataDocumentUser.map((item) => {
        return (
          <tr className="zA">
            <td
              onClick={() => {
                handleViewDocument(item.id, item.process.id);
              }}
            >
              {item.document_type.display_name}
            </td>
            <td
              onClick={() => {
                handleViewDocument(item.id, item.process.id);
              }}
            >
              {!item.eviction && item.deleted_at === null ? (
                <Tag
                  icon={checkStatus[item.process.status].icon}
                  color={checkStatus[item.process.status].color}
                >
                  {checkStatus[item.process.status].tag}
                </Tag>
              ) : item.deleted_at === null ? (
                <Tag icon={<ClockCircleOutlined />} color="warning">
                  Chưa xem
                </Tag>
              ) : (
                <Tag icon={<ClockCircleOutlined />} color="purple">
                  Đã thu hồi
                </Tag>
              )}
            </td>
            <td
              onClick={() => {
                handleViewDocument(item.id, item.process.id);
              }}
            >
              {simpleDate(item.updated_at)}
            </td>
            <td className="zX">
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

  const handleChangeFilter = (value) => {
    getDataDocumentListUser(
      pagi[value].page ? pagi[value].page : 1,
      sizeOpt,
      value
    );
    //setCurrentPage(null);
    setPageType(value);
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
          <Select
            defaultValue="Tất cả"
            style={{ width: 200 }}
            onChange={handleChangeFilter}
          >
            <Option value="all">Tất cả</Option>
            <Option value="processing">Đơn chưa duyệt</Option>
            <Option value="processed">Đơn đã duyệt</Option>
            <Option value="canceled">Đơn đã hủy</Option>
            <Option value="evicted">Đơn thu hồi</Option>
          </Select>
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
          {/* <Tabs defaultActiveKey="1">
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
          </Tabs> */}

          <div className="content-bottom-pagination">
            <Pagination
              onChange={handlePagination}
              current={pagi[pageType].page}
              total={totalPage}
              showSizeChanger={true}
            />
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
