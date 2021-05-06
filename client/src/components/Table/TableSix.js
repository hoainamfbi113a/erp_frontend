import React, { useEffect, useState, useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../../App/App.css";
import "./Table.css";
import { Layout, Table, Space, Tag, Avatar, Popconfirm, message } from "antd";
import user from "assets/images/user2.png";
import { listUser, listUserDepartFilter } from "apis/authenticationApi";
import { getListIdDepartment } from "apis/departmentApi";
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
import usePrevious from "../../hooks/usePrevious";
import { checkVisible } from "helpers/FuncHelper";
import { checkPermission } from "../../apis/checkPermission";
import PermissionContext from "../../context/PermissionContext";
const { Content } = Layout;

const TableSix = (props) => {
  const dispatch = useDispatch();
  const { permissions } = useContext(PermissionContext);
  const { path } = useRouteMatch();
  const lastValue = usePrevious(props.valueSearch);
  const [dataUser, setDataUser] = useState(null);
  const [dataDepart, setDataDepart] = useState([
    {
      text: "",
      value: "",
    },
  ]);
  const [dataPos, setDataPos] = useState([
    {
      text: "",
      value: "",
    },
  ]);

  useEffect(async () => {
    let departUserFilter = await listUserDepartFilter(329, 1);
    console.log(departUserFilter.data);
  }, []);

  useEffect(async () => {
    //async function searchValue() {
    if (props.valueSearch !== lastValue) {
      dispatch(showLoading());
      let resListUser = await listUser("all");
      let listUserSearch = resListUser.data.filter((user) => {
        return (
          user.full_name
            .toLowerCase()
            .indexOf(props.valueSearch.toLowerCase()) !== -1
        );
      });
      let obj = {
        pagination: listUserSearch.length,
        data: listUserSearch,
      };
      setDataUser(obj);
      props.totalEmploy(obj.pagination);
      dispatch(hideLoading());
    }
  }, [props.valueSearch]);

  const confirm = (e) => {
    const { userSixActionCreators } = props;
    const { deleteUserSix } = userSixActionCreators;
    deleteUserSix(e);
  };

  const cancel = (e) => {
    message.error("Không ẩn");
  };

  const handlePagination = async (pagination) => {
    dispatch(showLoading());
    let resListUser = await listUser(pagination);
    if (!resListUser.err) {
      setDataUser(resListUser);
    } else {
      message.error("get user failed");
    }
    dispatch(hideLoading());
  };

  const columns = [
    {
      title: "Ảnh đại diện",
      width: 150,
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
      title: "Chức vụ",
      dataIndex: "department",
      key: "position",
      filters: dataPos,
      render: (department) => {
        return department ? `${department.data.pos_name}` : "";
      },
      //ilteredValue: filter ? filter.department : null,
      onFilter: (value, record) => {
        return record.department
          ? record.department.data.pos_name.includes(value)
          : "";
      },
      // onFilter: (value, record) =>
      //   record.department.data.pos_name.includes(value),
      // sorter: (a, b) => a.full_name.length - b.full_name.length,
    },
    {
      title: "Phòng ban",
      dataIndex: "department",
      key: "department",
      filters: dataDepart,
      // render: (department) => `${department.data.dep_name}`,
      render: (department) => {
        return department ? `${department.data.dep_name}` : "";
      },
      //filteredValue: filter ? filter.department : null,
      onFilter: (value, record) => {
        return record.department
          ? record.department.data.dep_name.includes(value)
          : "";
      },

      // onFilter: (value, record) =>
      //   record.department.data.dep_name.includes(value),
      // sorter: (a, b) => a.full_name.length - b.full_name.length,
    },
    {
      title: "Ngày sinh",
      width: 120,
      dataIndex: "profile",
      key: "profile",
      render: (profile) => `${profile && profile.data.pro_birth_day}`,
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
            title="Bạn có muốn ẩn không?"
            onConfirm={() => confirm(text)}
            onCancel={cancel}
            okText="Có"
            cancelText="Không"
          >
            <Tag color="volcano" className="table-action">
              Ẩn
            </Tag>
          </Popconfirm>
          {checkVisible(permissions, "update", "api/profiles/{profile}") && (
            <Link to={`${path}/update/${text}`}>
              <Tag color="geekblue" className="table-action">
                Sửa và duyệt
              </Tag>
            </Link>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Content>
        <div className="layout-content">
          <div style={{ padding: 24, minHeight: 200 }}>
            {checkVisible(permissions, "list", "api/profiles") ? (
              <Table
                columns={columns}
                dataSource={dataUser ? dataUser.data : []}
                className="table-content"
                rowKey="id"
                pagination={{
                  onChange: handlePagination,
                  pageSize: 15,
                  total: dataUser ? dataUser.pagination.total : 0,
                }}
              />
            ) : ""}
          </div>
        </div>
      </Content>
    </div>
  );
};
export default TableSix;
