import React, { Component } from "react";
import { Button, Pagination } from "antd";
import { Popconfirm, Space, Tag } from "antd";
import "./notification.css";
import proposal from "assets/images/proposal.svg";
import put from "assets/images/put.svg";
import takeleave from "assets/images/takeleave.svg";
import vote from "assets/images/vote.svg";
import ProposalForm from "components/Modal/ProposalForm";
import axios from "axios";
import { Collapse } from "antd";

const { Panel } = Collapse;
import { Tree } from "antd";
export default class CreateNotifi extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      title: "",
      dataDocumentType: null,
      dataDocumentUser: null,
      treeData: null,
    };
  }
  showModal = (value) => {
    this.setState({
      visible: true,
      title: value,
    });
  };
  hideModal = () => {
    this.setState({
      visible: false,
    });
  };
  getDataDocumentType = () =>{
    axios
    .get("https://document.tuoitre.vn/api/document-type/get-document-types")
    .then((res) => {
      this.setState({
        dataDocumentType: res.data,
      });
      let treeData = [];
      for (let item of this.state.dataDocumentType) {
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
        treeData.push(treeNode);
      }
      this.setState({
        treeData,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }
  getDataDocumentListUser = () =>{
    axios
    .get(
      "https://document.tuoitre.vn/api/document/list?page=1&per_page=1000&user_id=1"
    )
    .then((res) => {
      this.setState({
        dataDocumentUser: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }
  componentDidMount = () => {
    this.getDataDocumentType()
    this.getDataDocumentListUser();
  };
  onSelect = (id) => {
    if (id) {
      axios
        .get(
          `https://document.tuoitre.vn/api/document-template/get?type_id=${id}`
        )
        .then((data) => {
          if (data.data === "") {
            alert("Template chưa được tạo");
          } else {
            this.props.history.push(`/form-document/${id}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  };
  confirm = (id) => {
    axios
      .delete(`https://document.tuoitre.vn/api/document/delete/${id}`)
      .then((res) => {
        console.log(res)
        if (res.data.message === "success") {
          alert("Xoá tài liệu thành công");
          this.getDataDocumentListUser();
        }
      })
      .catch((err) => {
        alert("Xoá tài liệu thất bại");
        console.log(err);
      });
  };
  handleViewDocument = (id) => {
    this.props.history.push(`/form-document-view/${id}`);
  };
  renderPanel = () =>{
    let dataDocumentType = this.state.dataDocumentType
    if(dataDocumentType){
      return dataDocumentType.map((item)=>{
        return (
          <Panel header={item.display_name} key={item.id}>
                {item.children.map((itemChild)=>{
                  return (
                    <p onClick ={()=>this.onSelect(itemChild.id)}>{itemChild.display_name}</p>
                  )
                })}
          </Panel>
        )
      })
    }
  }
  renderHistoryCreate = () => {
    let data = this.state.dataDocumentUser;
    if (data) {
      return data.map((item) => {
        return (
          <tr>
            <td>
              <img src={proposal}></img>
            </td>
            <td
              onClick={() => {
                this.handleViewDocument(item.id);
              }}
              className="content-notification-unread"
            >
              {item.document_type.display_name}
            </td>
            <td>{item.updated_at}</td>
            {/* <td>
              <Space size="middle">
                <Popconfirm
                  onConfirm={() => this.confirm(item.id)}
                  title="Are you sure hide this user?"
                  okText="Yes"
                  cancelText="No"
                >
                  <Tag color="volcano" className="table-action">
                    Xoá
                  </Tag>
                </Popconfirm>
                <Tag
                  color="geekblue"
                  className="table-action"
                  onClick={() => this.handleViewDocument(item.id)}
                >
                  Update
                </Tag>
              </Space>
            </td> */}
          </tr>
        );
      });
    }
  };
  callback = (key) => {
    console.log(key);
  }
  render() {
    let treeData = this.state.treeData;
    return (
      <div className="create-notifi">
        <div className="content-background2">
          <div style={{ minHeight: "70vh" }} className="content-main">
            <div className="content-top content-top-create-notif">
              <div className="content-top-left content-notification content-notification-create-notif">
                <div className="content-top-left-sum-item">
                  Tạo loại tài liệu
                </div>
                <Button className="btn-notification" type="primary">
                  ...
                </Button>
              </div>
            </div>
            {/* <Tree
              treeData={treeData}
              // height={233}
              defaultExpandAll
              onSelect={this.onSelect}
            /> */}
            <Collapse className="create-notification-collapse" onChange={this.callback}>
              {this.renderPanel()}
            </Collapse>
            <div className="create-notifi-content"></div>
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
                {this.renderHistoryCreate()}
                {/* <tr>
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
                </tr> */}
              </tbody>
            </table>
            <div className="content-bottom-pagination">
              <Pagination defaultCurrent={1} total={50} />
            </div>
          </div>
        </div>
        <ProposalForm
          title={this.state.title}
          showProposal={this.state.visible}
          hideModal={this.hideModal}
        ></ProposalForm>
      </div>
    );
  }
}
