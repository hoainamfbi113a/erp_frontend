import React, { useEffect, useState } from "react";
import { Button, Pagination, Space, Popconfirm, Tag } from "antd";
import "./notification.css";
import history from "assets/images/history.png";
import ProposalForm from "components/Modal/ProposalForm";
import docCookies from "doc-cookies";
import axios from "axios";
import { Collapse, message } from "antd";
import { useSelector } from "react-redux";
import { simpleDate } from "../../../helpers/FuncHelper";

const { Panel } = Collapse;
const CreateNotifi = (props) => {

  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [dataDocumentType, setDataDocuType] = useState(null);
  const [dataDocumentUser, setDataDocuUser] = useState(null);
  const [treeData, setTreeData] = useState(null);
  const [arrPermission, setArrPermission] = useState([]);
  const permissionUser = useSelector(state => state.permission);

  const showModal = (value) => {
    setVisible(true);
    setTitle(value);
  };
  const hideModal = () => {
    setVisible(false);
  };
  useEffect(() => {
    getDataDocumentType();
    getDataDocumentListUser();
    let arr = []
    for (const property in permissionUser) {
      for (const item of permissionUser[property].groups) {
        for (const itemChild of item.permissions) {
          arr.push(itemChild.id);
        }
      }
    }
    setArrPermission(arr);
  }, [])
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
  const getDataDocumentListUser = () => {
    axios
      .get(
        `/api/document/list?page=1&per_page=1000&user_id=${docCookies.getItem(
          "user_id"
        )}`
      )
      .then((res) => {
        setDataDocuUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const checkPermissionUser = (idPermission) =>{
    for(let item of arrPermission) {
      if(item == idPermission){
        return true;
      }
    }
    return false
  }
  const onSelect = (id) => {
    if (id) {
      axios
        .get(`/api/document-template/get?type_id=${id}`)
        .then((data) => {
          if (data.data === "") {
            message.info("Template chưa được tạo")
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
      .post(`/api/document/delete`,{id})
      .then((res) => {
        if (res.data.message === "success") {
          message.success("Xoá tài liệu thành công")
          this.getDataDocumentListUser();
        }
      })
      .catch((err) => {
        message.error("Xóa tài liệu thất bại")
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
              if(checkPermissionUser(itemChild.permission)){
                return (
                  <p style={{cursor:"pointer"}} onClick={() => onSelect(itemChild.id)}>
                    {itemChild.display_name}
                  </p>
                );
              }
              return ;
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
            <td>
              <img style={{width:"29px"}} src={history}></img>
            </td>
            <td
              onClick={() => {
              handleViewDocument(item.id);
              }}
              className="content-notification-unread"
            >
              {item.document_type.display_name}
            </td>
            <td>{simpleDate(item.updated_at)}</td>
            <td>
              <Space size="middle">
                <Popconfirm
                  onConfirm={() => confirm(item.id)}
                  title="Bạn có muốn thu hồi không?"
                  okText="Có"
                  cancelText="Không"
                >
                  <Tag color="volcano" className="table-action">
                    Thu hồi
                  </Tag>
                </Popconfirm>
                <Tag
                  color="geekblue"
                  className="table-action"
                  onClick={() => this.handleViewDocument(item.id)}
                >
                  Sửa
                </Tag>
              </Space>
            </td>
          </tr>
        );
      });
    }
  };
  return (
    <div className="create-notifi">
      <div className="content-background2">
        <div style={{ minHeight: "70vh" }} className="content-main">
          <div className="content-top content-top-create-notif">
            <div className="content-top-left content-notification content-notification-create-notif">
              <div className="content-top-left-sum-item">
                Tạo loại tài liệu
              </div>
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
      <div className="content-background2">
        <div style={{ minHeight: "70vh" }} className="content-main">
          <div className="content-top content-top-create-notif">
            <div className="content-top-left content-notification content-notification-create-notif">
              <div className="content-top-left-sum-item">Lịch sử tạo</div>
            </div>
          </div>
          <table className="content-notification-table content-notification-table-create">
            <tbody>
              <tr>
                <th>Tin</th>
                <th>Nội dung</th>
                <th>Ngày</th>
                <th>Hành động</th>
              </tr>
              {renderHistoryCreate()}
            </tbody>
          </table>
          <div className="content-bottom-pagination">
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </div>
      <ProposalForm
        title={title}
        showProposal={visible}
        hideModal={hideModal}
      ></ProposalForm>
    </div>
  );
}
export default CreateNotifi;