import React, { Component } from "react";
import { Button, Pagination } from "antd";
import "./notification.css";
import proposal from "assets/images/proposal.svg";
import put from "assets/images/put.svg";
import takeleave from "assets/images/takeleave.svg";
import vote from "assets/images/vote.svg";
import ProposalForm from "components/Modal/ProposalForm"
import axios from "axios";
import { Tree } from 'antd';
export default class CreateNotifi extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      title:"",
      dataDocumentType:null,
      treeData:null,
    };
  }
  showModal = (value) => {
    this.setState({
      visible:true,
      title:value
    })
  }
  hideModal =() => {
    this.setState({
      visible:false
    })
  }
  componentDidMount = () =>{
    axios.get("https://document.tuoitre.vn/api/document-type/get-document-types")
    .then((res)=>{
      // console.log(res.data)
      this.setState({
        dataDocumentType:res.data
      })
      let treeData = []
      for(let item of this.state.dataDocumentType) {
        let treeDataStudent = [];
        for (let itemChild of item.children ) {
          const treeNodeChild = {
            title:itemChild.display_name,
            key:itemChild.id,
            id:itemChild.id
          }
          treeDataStudent.push(treeNodeChild)
        }
        const treeNode = {
          title:item.display_name,
          key:item.id,
          children:treeDataStudent
        }
        treeData.push(treeNode)
      }
      this.setState({
        treeData
      })
    })
    .catch(err=>{
      console.log(err)
    })
  }
  onSelect = (selectedKeys, info) => {
    let id = info.node.id;
    if(id){
      axios.get(`https://document.tuoitre.vn/api/document-template/get?type_id=${id}`)
      .then((data) => {
        if(data.data.inputs.length === 0) {
          alert("Template chưa được tạo")
        } else {
          this.props.history.push(`/form-document/${id}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      return ;
    }
  };
  render() {
    let treeData = this.state.treeData;
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
            <Tree treeData={treeData} height={233} defaultExpandAll onSelect={this.onSelect} />
            <div className="create-notifi-content">
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
            <div className="content-bottom-pagination">
              <Pagination defaultCurrent={1} total={50} />
            </div>
          </div>
        </div>
        <ProposalForm title={this.state.title} showProposal={this.state.visible} hideModal={this.hideModal}></ProposalForm>
      </div>
    );
  }
}
