import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import GrantRole from "components/Modal/GrantRole";
import "../../App/App.css";
import "./Table.css";
import { Layout } from "antd";
import { Table, Space, Tag, Avatar } from "antd";
import { Popconfirm, message } from "antd";
import user from "assets/images/user2.png";
import { listUser } from "apis/authenticationApi";
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
import { bindActionCreators } from "redux";
const { Content } = Layout;
class TableSix extends Component {
  state = {
    collapsed: false,
    visibleModify: false,
    visibleAdduser: false,
    showModalGrantRole: false,
    selectedRowKeys: [],
    roleAndPermissionUser: null,
    loading: false,
    current_user_id: "4",
    app_id: "99",
    full_name: "",
    email: "",
    phone: "",
    idGrantRole: "",
    dataUser: null,
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  componentDidMount() {
    this.fetData();
  }
  componentDidUpdate = async (prevProps, prevState) => {
    if (this.props.valueSearch !== prevProps.valueSearch) {
      let resListUser = await listUser("all");
      // console.log(resListUser);
      let listUserSearch = resListUser.data.filter((user) => {
        return (
          user.full_name
            .toLowerCase()
            .indexOf(this.props.valueSearch.toLowerCase()) !== -1
        );
      });
      let obj = {
        meta: {
          pagination: listUserSearch.length,
        },
        data: listUserSearch,
      };
      // console.log(obj)
      this.setState({
        dataUser: obj,
      });
    }
  };

  fetData = async () => {
    this.props.uiActionCreatorsS();
    let resListUser = await listUser(1);
    if (!resListUser.err) {
      this.setState({
        dataUser: resListUser,
      });
    } else {
      message.error("get user failed");
    }
    this.props.uiActionCreatorsH();
  };
  confirm = (e) => {
    const { userSixActionCreators } = this.props;
    const { deleteUserSix } = userSixActionCreators;
    deleteUserSix(e);
  };

  cancel = (e) => {
    message.error("Không ẩn");
  };
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  handleOkGrantRole = () => {
    this.setState({
      showModalGrantRole: false,
    });
  };
  handleCancelGrantRole = () => {
    this.setState({
      showModalGrantRole: false,
    });
  };
  handlePagination = async (pagination) => {
    let resListUser = await listUser(pagination);
    if (!resListUser.err) {
      this.setState({
        dataUser: resListUser,
      });
    } else {
      message.error("get user failed");
    }
  };
  render() {
    let data = [];
    let total = 0;
    if (this.state.dataUser) {
      data = this.state.dataUser.data;
      total = this.state.dataUser.meta.pagination.total;
    }

    const columns = [
      {
        title: "Ảnh đại diện",
        width: 200,
        dataIndex: "userImg",
        key: "userImg",
        fixed: "left",
        render: () => (
          <div>
            <Avatar
              shape="square"
              size={64}
              style={{ marginRight: "3px" }}
              src={user}
            />
          </div>
        ),
      },
      {
        title: "Họ và tên",
        dataIndex: "full_name",
        key: "full_name",
        // sorter: (a, b) => a.full_name.length - b.full_name.length,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "2",
        // sorter: (a, b) => a.pro_name.length - b.pro_name.length,
      },
      {
        title: "Số điện thoại",
        dataIndex: "phone",
        key: "sex",
        sorter: (a, b) => a.phone - b.phone,
      },

      {
        title: "Hành động",
        key: "operation",
        dataIndex: "id",
        fixed: "right",
        // width: 300,
        render: (text, row) => (
          <Space size="middle">
            <Popconfirm
              title="Are you sure hide this user?"
              onConfirm={() => this.confirm(text)}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <Tag color="volcano" className="table-action">
                Ẩn
              </Tag>
            </Popconfirm>
            <Link to={`/edituser/${text}`}>
              <Tag
                // onClick={() => {
                //   this.updateUser(text);/admin/edituser/${id}
                // }}
                color="geekblue"
                className="table-action"
              >
                Sửa và duyệt
              </Tag>
            </Link>
          </Space>
        ),
      },
    ];
    return (
      <div>
        <Content>
          {/* <div style={{ height: "calc(100vh - 139px)" }} className="layout-content"> */}
          <div className="layout-content">
            <div style={{ padding: 24, minHeight: 200 }}>
              <Table
                columns={columns}
                dataSource={data}
                className="table-content"
                rowKey="id"
                pagination={{
                  onChange: this.handlePagination,
                  pageSize: 15,
                  total: total,
                }}
              />
            </div>
          </div>
        </Content>
        <GrantRole
          idGrant={this.state.idGrantRole}
          handleOk={this.handleOkGrantRole}
          handleCancel={this.handleCancelGrantRole}
          visible={this.state.showModalGrantRole}
          roleAndPermissionUser={this.state.roleAndPermissionUser}
        ></GrantRole>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  uiActionCreatorsS: bindActionCreators(showLoading, dispatch),
  uiActionCreatorsH: bindActionCreators(hideLoading, dispatch),
});
export default connect(null, mapDispatchToProps)(TableSix);
