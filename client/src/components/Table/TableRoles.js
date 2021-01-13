import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import lodash from "lodash";
import "../../App/App.css";
import "../Crm/Crm.css";
import "./Table.css";
import * as uiActions from "../../actions/ui";
import { Layout } from "antd";
import { Table, Space, Tag } from "antd";
import { Popconfirm, message } from "antd";
import { Input, Modal } from "antd";
import axiosConfig from "../../apis/axios";
import { Select, Tree } from "antd";
import { Transfer, Checkbox } from "antd";
const { Option } = Select;
const { Content } = Layout;
import { Button } from "antd";
class TableRoles extends Component {
    state = {
        modalAssign: false,
        id: "",
        idRole: "",
        app_id: "99",
        name: "",
        status: 1,
        data: null,
        dataPermission: null,
        dataAction: [],
        mockData: [],
        targetKeys: [],
        moveKeys: [],
        arrCheckedAction: [],
    };
    componentDidMount = () => {
        this.fetchData();
    };
    fetchData = async () => {
        this.props.uiActionCreators.showLoading();
        await axiosConfig
            .get("/api/role?page=1")
            .then((res) => {
                this.setState({
                    data: res,
                });
            })
            .catch((err) => {
                console.log(err);
            });
        await axiosConfig.get("/api/action").then((res) => {
            this.setState({
                dataAction: res.data,
            });
        });
        this.props.uiActionCreators.hideLoading();
    };
    getMock = async (id) => {
        this.props.uiActionCreators.showLoading();
        const targetKeys = [];
        const mockData = [];
        await axiosConfig
            .get("/api/permission")
            .then((res) => {
                this.setState({
                    dataPermission: res.data,
                });
            })
            .catch((err) => {
                console.log(err);
            });
        let dataRight = [];
        await axiosConfig.get(`/api/role/permission/${id}`).then((res) => {
            dataRight = res;
        });
        var arrAll = this.state.dataAction.map((obj) => ({
            key: Math.random(),
            id: obj.id,
            title: obj.name,
        }));
        var arrRight = dataRight.map((obj) => ({
            key: Math.random(),
            id: obj.id,
            title: obj.actions.map((objChild) => ({
                title: objChild,
                key: Math.random(),
                parentId: obj.id,
            })),
        }));
        console.log(arrAll);
        console.log(arrRight);
        for (let i = 0; i < this.state.dataPermission.length; i++) {
            const data = {
                key: `${this.state.dataPermission[i].id}`,
                title: `${this.state.dataPermission[i].name}`,
                id: `${this.state.dataPermission[i].id}`,
                children: arrAll,
            };

            for (let j = 0; j < dataRight.length; j++) {
                if (dataRight[j].id == this.state.dataPermission[i].id) {
                    let arrRightAction = [];
                    for (const value of arrRight) {
                        if (value.id === dataRight[j].id) {
                            arrRightAction = lodash.intersectionBy(
                                data.children,
                                value.title,
                                "title",
                            );
                        }
                    }
                    console.log(arrRightAction);
                    let dataClone = {
                        key: `${this.state.dataPermission[i].id} clone`,
                        title: `${this.state.dataPermission[i].name}`,
                        id: `${this.state.dataPermission[i].id}`,
                        children: arrRightAction,
                    };
                    targetKeys.push(dataClone.key);
                    mockData.push(dataClone);
                }
            }
            // format child Action left
            for (let j = 0; j < dataRight.length; j++) {
                if (dataRight[j].id == this.state.dataPermission[i].id) {
                    for (const value of arrRight) {
                        if (value.id === dataRight[j].id) {
                            const arrTemp = lodash.differenceBy(
                                data.children,
                                value.title,
                                "title",
                            );
                            data.children = arrTemp;
                        }
                    }
                }
            }
            mockData.push(data);
        }
        console.log(mockData);
        console.log(targetKeys);
        this.setState({ mockData, targetKeys });
        this.props.uiActionCreators.hideLoading();
    };
    onSelect = (selectedKeys, info) => {
        console.log("selected", selectedKeys, info);
    };

    onCheck = (checkedKeys, info) => {
        console.log("onCheck", checkedKeys, info);
        let arrCheckedById = [];
        for (let value of info.checkedNodes) {
            if (typeof value.id === "number") arrCheckedById.push(value.id);
        }
        this.setState({
            arrCheckedAction: arrCheckedById,
        });
    };
    renderItem = (item) => {
        let treeData = [];
        treeData.push(item);
        const customLabel = (
            <div>
                <span className="custom-item">
                    <Tree
                        className="tree-transfer"
                        checkable
                        onSelect={this.onSelect}
                        onCheck={this.onCheck}
                        treeData={treeData}
                    />
                    {/* <Checkbox>Checkbox</Checkbox>
          <Checkbox>Checkbox</Checkbox> */}
                </span>
            </div>
        );

        return {
            label: customLabel, // for displayed item
            // value: item.title, // for title and filter matching
        };
    };
    hideModal = () => {
        this.props.hideModal();
    };
    showModal = (id) => {
        let role = this.state.data.data.filter((item) => {
            return item.id == id;
        });
        this.setState({
            id: role[0].id,
            name: role[0].name,
            status: role[0].status,
        });
        this.props.showModal();
    };
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    onSubmit = () => {
        if (this.state.id === "") {
            let params = {
                app_id: this.state.app_id,
                name: this.state.name,
                status: this.state.status,
            };
            this.hideModal();
            axiosConfig
                .post("/api/role", params)
                .then((res) => {
                    if (res.message === "Success!. Stored") {
                        message.success("Thêm role thành công");
                        this.fetchData();
                    }
                })
                .catch((err) => {
                    message.error("đăng ký user thất bại");
                    console.log(err);
                });
        } else {
            let params = {
                app_id: this.state.app_id,
                name: this.state.name,
                status: this.state.status,
            };
            this.hideModal();
            axiosConfig
                .put(`/api/role/${this.state.id}`, params)
                .then((res) => {
                    if (res.message === "Success!. Updated") {
                        message.success("Update role thành công");
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
    handleChange = (targetKeys, direction, moveKeys) => {
        console.log(moveKeys);
        let res = moveKeys[0].replace(" clone", "");
        if (direction === "right") {
            const params = {
                permission_id: res,
                actions: this.state.arrCheckedAction,
            };
            axiosConfig
                .post(`/api/role/permission/${this.state.idRole}`, params)
                .then((res) => {
                    if (res.message === "Success!. Stored") {
                        this.getMock(this.state.idRole);
                        message.success("Bạn đã gán quyền thành công");
                    } else {
                        message.error("Lỗi rồi");
                    }
                })
                .catch((err) => {
                    console.log("err" + err);
                });
        } else {
            const params = {
                permission_id: res,
                actions: this.state.arrCheckedAction,
            };
            console.log(params);
            axiosConfig
                .post(`/api/role/permissiond/${this.state.idRole}`, params)
                .then((res) => {
                    if (res.message === "Success!. Removed") {
                        this.getMock(this.state.idRole);
                        message.success("bạn đã gỡ quyền thành công");
                    } else {
                        message.error("lỗi rồi !!!");
                    }
                })
                .catch((err) => {});
        }
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
    showModalAssign = (id) => {
        this.setState({
            modalAssign: true,
            idRole: id,
        });
        this.getMock(id);
    };
    handleCancel = () => {
        this.setState({
            modalAssign: false,
        });
    };
    onChangeCheckBoxAction = (checkedValues) => {
        this.setState({
            checkedValues: checkedValues,
        });
    };
    handlePagination = async (pagination) => {
        this.props.uiActionCreators.showLoading();
        try {
            const data = await axiosConfig.get(`/api/role?page=${pagination}`);
            this.setState({
                data: data,
            });
        } catch (error) {
            console.log("False to load API", error);
        } finally {
            this.props.uiActionCreators.hideLoading();
        }
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
                title: "Tên Role",
                width: 200,
                dataIndex: "name",
                key: "name",
                fixed: "left",
            },
            {
                title: "Mô tả",
                dataIndex: "name",
                key: "name",
            },
            {
                title: "Trạng thái",
                dataIndex: "status",
                key: "status",
                render: (text) => {
                    if (text == 1)
                        return (
                            <Tag color="geekblue" className="table-action">
                                ACTIVE
                            </Tag>
                        );
                    return (
                        <Tag color="geekblue" className="table-action">
                            HIDE
                        </Tag>
                    );
                },
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
                        <Tag
                            onClick={() => this.showModalAssign(text)}
                            color="geekblue"
                            className="table-action"
                        >
                            Phân quyền
                        </Tag>
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
                    title="Tạo roles mới"
                    visible={this.props.showModalRoles}
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
                        onSubmit={this.onSubmit}
                        method="post"
                    >
                        <ul style={{ marginLeft: "23px" }}>
                            <li className="tabs-main-left-li">
                                <span className="tabs-user-infor-top">Tên roles</span>
                                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal ">
                                    <Input
                                        value={this.state.name}
                                        name="name"
                                        onChange={this.onChange}
                                    />
                                </div>
                            </li>
                            <li className="tabs-main-left-li">
                                <span className="tabs-user-infor-top">Trạng thái</span>
                                <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                                    <Select defaultValue="1" style={{ width: 120 }}>
                                        <Option value="1">Action</Option>
                                    </Select>
                                </div>
                            </li>
                        </ul>
                    </form>
                </Modal>
                <Modal
                    width={800}
                    title="assign permission to role"
                    visible={this.state.modalAssign}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    className="modal-transfer-grant-permission"
                >
                    <Transfer
                        dataSource={this.state.mockData}
                        listStyle={{
                            width: 400,
                            height: 400,
                        }}
                        targetKeys={this.state.targetKeys}
                        onChange={this.handleChange}
                        render={this.renderItem}
                    />
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    listUserSix: state.userSixReducer,
});
const mapDispatchToProps = (dispatch) => ({
    uiActionCreators: bindActionCreators(uiActions, dispatch),
});
export default connect(null, mapDispatchToProps)(TableRoles);
