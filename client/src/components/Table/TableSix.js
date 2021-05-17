import React, { useEffect, useState, useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../../App/App.css";
import "./Table.css";
import { Layout, Table, Space, Tag, Avatar, Popconfirm, message } from "antd";
import user from "assets/images/user2.png";
import { listUser, listUserDepartFilter } from "apis/authenticationApi";
import { getListIdDepartment } from "apis/departmentApi";
import usePrevious from "../../hooks/usePrevious";
import { checkVisible } from "helpers/FuncHelper";
import { checkPermission } from "../../apis/checkPermission";
import PermissionContext from "../../context/PermissionContext";
import { searchUser } from "../../apis/authenticationApi";
const { Content } = Layout;

const TableSix = (props) => {
  const [loading, setLoading] = useState(false);
  const [sizeOpt, setSizeOt] = useState(10);
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

  // useEffect(async () => {
  //   let departUserFilter = await listUserDepartFilter(329, 1);
  //   console.log(departUserFilter.data);
  // }, []);

  useEffect(async () => {
    setLoading(true);
    if (props.valueSearch !== "") {
      fetchSearch(1, sizeOpt);
    } else {
      fetchData(1, sizeOpt);
    }
  }, [props.valueSearch]);

  const fetchData = async (page, per_page) => {
    let res = await listUser(page, per_page);
    if (!res.err) {
      setDataUser(res);
      props.totalEmploy(res.pagination.total);
      setLoading(false);
    } else {
      message.error("get list parts failed");
    }
  };

  const fetchSearch = async (page, per_page) => {
    let res = await searchUser(props.valueSearch, page, per_page);
    if (!res.err) {
      setDataUser(res);
      props.totalEmploy(res.pagination.total);
      setLoading(false);
    } else {
      message.error("search fail");
    }
  };

  const confirm = (e) => {
    const { userSixActionCreators } = props;
    const { deleteUserSix } = userSixActionCreators;
    deleteUserSix(e);
  };

  const cancel = (e) => {
    message.error("Không ẩn");
  };

  const handlePagination = async (page, pageSize) => {
    setSizeOt(pageSize)
    setLoading(true);
    if(props.valueSearch === "") {
      fetchData(page, pageSize);
    } else {
      fetchSearch(page, pageSize)
    }
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
                loading={loading}
                columns={columns}
                dataSource={dataUser ? dataUser.data : []}
                className="table-content"
                rowKey="id"
                pagination={{
                  onChange: handlePagination,
                  current: dataUser ? dataUser.pagination.current_page : 1,
                  total: dataUser ? dataUser.pagination.total : 0,
                  showSizeChanger: true
                }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </Content>
    </div>
  );
};
export default TableSix;
