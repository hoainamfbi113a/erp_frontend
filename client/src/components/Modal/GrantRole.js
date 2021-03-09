import React, { Component } from "react";
import { Modal, Space, message, Popconfirm,Tag,Button } from "antd";
import { Select } from "antd";
import axiosConfig from "apis/axios";
import { connect } from "react-redux";
const { Option } = Select;
class GrantRole extends Component {
  state = {
    roleOfUser: "",
    listRole: [],
    roleAndPermissionUser:null
  };
  async componentDidMount() {
    await this.fetchData()
  }
  fetchData = async () => {
    axiosConfig
      .get(`/api/role`)
      .then((res) => {
        this.setState({
          listRole: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleOk = async () => {
    await this.onSubmit();
    this.props.handleOk();
  };
  handleCancel = () => {
    this.props.handleCancel();
  };
  onChange = (value) => {
    this.setState({
      roleOfUser: value,
    });
  };
  onSubmit = () => {
    // console.log(this.props.idGrant);
    if (this.state.value == "") {
      message.error("Bạn chưa chọn nhóm quyền");
    } else {
      const params = {
        role_id: this.state.roleOfUser,
      };
      axiosConfig
        .post(`/api/user/role/${this.props.idGrant}`, params)
        .then((res) => {
          if (res.message === "Success!. Stored") {
            message.success("gán nhóm quyền cho user thành công");
          } else {
            message.error("gán quyền cho user thất bại rồi hihi");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  renderOption = () => {
    // return this.state.listRole.map((item) => {
    //   return (
    //     <Option key={item.id} value={item.id}>
    //       {item.name}
    //     </Option>
    //   );
    // });
  };
  renderRole = () =>{
    if(this.props.roleAndPermissionUser && this.props.roleAndPermissionUser.role){
      // return this.props.roleAndPermissionUser.permissions.map((item)=>{
      //   return (
      //     <li key={item.id} style ={{display:'flex', justifyContent:'center'}}>
      //     <div className="personal-history-time" style={{padding:'10px', paddingTop:'0px', width:'200px'}}>
      //       {item.name}
      //     </div>
      //     <Space size="middle">
      //       <Popconfirm
      //         title="Are you sure hide this user?"
      //         onConfirm={()=>this.handleDeleteRoleUser(this.props.idGrant, item.id)}
      //         // onCancel={this.cancel}
      //         okText="Yes"
      //         cancelText="No"
      //       >
      //         <Tag color="volcano" className="table-action">
      //           Xoá
      //         </Tag>
      //       </Popconfirm>
      //     </Space>
  
      //   </li>
      //   )
      // })
    }
  
  }
  handleDeleteRoleUser = (idUser,idRole) =>{
    const params = {
      role_id:idRole
    }
    axiosConfig.post(`/api/user/role-user/${idUser}`,params)
    .then((res)=>{
      if(res.message === "Success!. Removed"){
        message.success("delete role of user success");
        this.props.handleCancel()

      } else {
        message.error("delete role of user failed");
      }
    })
    .catch((error)=>{
      console.log(error);
      message.error("delete role of user failed");
    })
  }
  render() {
    return (
      <div>
        <Modal
          title="Basic Modal"
          visible={this.props.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <form
            style={{ width: "100%" }}
            className="tabs-main tabs-main-modal"
            noValidate
            onSubmit={this.onSubmit}
            method="post"
          >
            <ul style={{ marginLeft: "23px" }}>
              <li className="tabs-main-left-li">
                <span className="tabs-user-infor-top">Gán quyền (role) cho nhân viên</span>
                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal ">
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a role"
                    onChange={this.onChange}
                  >
                    {this.renderOption()}
                  </Select>
                </div>
              </li>
            </ul>
          </form>
          <div className="personal-history-title" style= {{textAlign:'center'}} >
            Tất cả các role của nhân viên
          </div>
          <div>
            <div className="edit-infr-vertical-line"></div>
            <ul className="personal-history-list">
             {this.renderRole()}
            </ul>
          </div>
        </Modal>
      </div>
    );
  }
}
export default connect(null, null)(GrantRole);
