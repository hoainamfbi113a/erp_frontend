import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../App/App.css";
import "../Crm/Crm.css";
import "./Table.css";
import * as userSixActions from "../../actions/userSix";
import { Layout } from "antd";
import { Table, Space, Tag, Avatar } from "antd";
import { Popconfirm, message } from "antd";
import { Input, Modal } from "antd";
import axiosConfig from "../../apis/axios";
import { Select } from "antd";
const { Option } = Select;
const { Content } = Layout;
class TablePermission extends Component {
    state = {
        collapsed: false,
        data: null,
        loading: false,
        id: "",
        app_id: "99",
        feature_id: "1",
        dep_name: "",
        dep_address: "",
        dep_phone: "",
        dep_note: "",
        status: 1,
    };
    componentDidMount = () => {
        this.fetchData();
    };
    fetchData = () => {
        axiosConfig
            .get("/api/departments?page=1")
            .then((res) => {
                this.setState({
                    data: res,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    onSubmit = () => {
        if (this.state.id === "") {
            let params = {
                dep_name: this.state.dep_name,
                dep_address: this.state.dep_address,
                dep_phone: this.state.dep_phone,
                dep_note: this.state.dep_note,
            };
            axiosConfig
                .post("/api/departments", params)
                .then((res) => {
                    if (res.message === "Success!. Stored") {
                        message.success("Thêm phòng ban thành công");
                        this.fetchData();
                    } else {
                        message.error("Thêm phòng ban thất bại");
                    }
                })
                .catch((err) => {
                    message.error("Thêm phòng ban thất bại");
                    console.log(err);
                });
            this.hideModal();
        } else {
            let params = {
                dep_name: this.state.dep_name,
                dep_address: this.state.dep_address,
                dep_phone: this.state.dep_phone,
                dep_note: this.state.dep_note,
            };
            this.hideModal();
            axiosConfig
                .put(`/api/departments/${this.state.id}`, params)
                .then((res) => {
                    console.log(res);
                    if (res.message === "Success!. Updated") {
                        message.success("Update permission thành công");
                        this.setState({
                            id: "",
                        });
                        this.fetchData();
                    }
                })
                .catch((err) => {
                    this.setState({
                        id: "",
                    });
                    message.error("Update permission thất bại");
                    console.log(err);
                });
        }
    };
    hideModal = () => {
        this.props.hideModal();
    };
    showModal = (id) => {
        let department = this.state.data.data.filter((item) => {
            return item.id == id;
        });
        this.setState({
            id: department[0].id,
            dep_name: department[0].dep_name,
            dep_address: department[0].dep_address,
            dep_phone: department[0].dep_phone,
            dep_note: department[0].dep_note,
        });
        this.props.showModal();
    };
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    confirm = (id) => {
        const params = {
            id,
        };
        axiosConfig
            .post(`/api/departments/delete`, params)
            .then((res) => {
                if (res.message === "Success!. Deleted") {
                    this.fetchData();
                    message.success("Xoá phòng ban thành công");
                } else {
                    message.error("Xoá phòng ban thất bại");
                }
            })
            .catch((err) => {
                message.error("Xoá phòng ban thất bại");
                console.log(err);
            });
    };

    cancel = (e) => {
        message.error("Không ẩn");
    };
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    };
    handleChangeFeature = (value) => {
        this.setState({
            feature_id: value,
        });
    };
    handlePagination = async (pagination) => {
        try {
            const data = await axiosConfig.get(`/api/departments?page=${pagination}`);
            this.setState({
                data: data,
            });
        } catch (error) {}
    };
    render() {
        let data = "";
        let total = 0;
        if (this.state.data) {
            data = this.state.data.data;
            total = this.state.data.meta.pagination.total;
        }
        const columns = [
            {
                title: "Tên phòng ban",
                dataIndex: "dep_name",
                key: "dep_name",
            },
            {
                title: "Ghi chú phòng ban",
                dataIndex: "dep_note",
                key: "dep_note",
            },
            {
                title: "Địa chỉ",
                dataIndex: "dep_address",
                key: "dep_address",
            },
            {
                title: "Số điện thoại",
                dataIndex: "dep_phone",
                key: "dep_phone",
            },
            {
                title: "Ngày tạo",
                dataIndex: "created_at",
                key: "created_at",
            },

            {
                title: "Hành động",
                key: "operation",
                dataIndex: "id",
                fixed: "right",
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
                        <Tag
                            onClick={() => this.showModal(text)}
                            color="geekblue"
                            className="table-action"
                        >
                            Cập nhật
                        </Tag>
                        {/* <Link to={`/crm/admin/edituser/${text}`}>
              <Tag color="geekblue" className="table-action">
                Phân quyền
              </Tag>
            </Link> */}
                    </Space>
                ),
            },
        ];
        return (
            <div>
                <Content>
                    <div className="layout-content">
                        <div style={{ padding: 24, minHeight: 200 }}>
                            <Table
                                style={{ minHeight: "70vh" }}
                                dataSource={data}
                                columns={columns}
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
                <Modal
                    title="Tạo phòng ban"
                    visible={this.props.showModalDepartment}
                    onOk={this.onSubmit}
                    onCancel={this.hideModal}
                    okText="OK"
                    cancelText="Cancel"
                    width={600}
                >
                    <form
                        style={{ width: "100%" }}
                        className="tabs-main tabs-main-modal"
                        noValidate
                        // onSubmit={this.onSubmit}
                        method="post"
                    >
                        <ul style={{ marginLeft: "23px" }}>
                            <li className="tabs-main-left-li">
                                <span className="tabs-user-infor-top">Tên phòng ban</span>
                                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                                    <Input
                                        value={this.state.dep_name}
                                        name="dep_name"
                                        onChange={this.onChange}
                                    />
                                </div>
                            </li>
                            <li className="tabs-main-left-li">
                                <span className="tabs-user-infor-top">Địa chỉ phòng ban</span>
                                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                                    <Input
                                        value={this.state.dep_address}
                                        name="dep_address"
                                        onChange={this.onChange}
                                    />
                                </div>
                            </li>
                            <li className="tabs-main-left-li">
                                <span className="tabs-user-infor-top">Số điện thoại phòng ban</span>
                                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                                    <Input
                                        value={this.state.dep_phone}
                                        name="dep_phone"
                                        onChange={this.onChange}
                                    />
                                </div>
                            </li>
                            <li className="tabs-main-left-li">
                                <span className="tabs-user-infor-top">Ghi chú phòng ban</span>
                                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                                    <Input
                                        value={this.state.dep_note}
                                        name="dep_note"
                                        onChange={this.onChange}
                                    />
                                </div>
                            </li>
                        </ul>
                    </form>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    listUserSix: state.userSixReducer,
});
const mapDispatchToProps = (dispatch) => ({
    userSixActionCreators: bindActionCreators(userSixActions, dispatch),
});
export default connect(null, null)(TablePermission);
