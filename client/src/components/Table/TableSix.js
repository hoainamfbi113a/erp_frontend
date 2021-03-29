import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../../App/App.css";
import "./Table.css";
import { Layout, Table, Space, Tag, Avatar, Popconfirm, message } from "antd";
import user from "assets/images/user2.png";
import { listUser } from "apis/authenticationApi";
//import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
import usePrevious from "../../hooks/usePrevious";
const { Content } = Layout;
const TableSix = (props) => {

  const lastValue = usePrevious(props.valueSearch);
  const [dataUser, setDataUser] = useState(null);

  useEffect(async() => {
    let data = await listUser(1);
    setDataUser(data)
    props.totalEmploy(data.meta.pagination.total);
  }, []);

  useEffect(async() => {
    if (props.valueSearch !== lastValue) {
      let resListUser = await listUser("all");
      let listUserSearch = resListUser.data.filter((user) => {
        return (
          user.full_name
            .toLowerCase()
            .indexOf(props.valueSearch.toLowerCase()) !== -1
        );
      });
      let obj = {
        meta: {
          pagination: listUserSearch.length,
        },
        data: listUserSearch,
      };
      setDataUser(obj);
      props.totalEmploy(obj.meta.pagination)
    }
  });

  const confirm = (e) => {
    const { userSixActionCreators } = props;
    const { deleteUserSix } = userSixActionCreators;
    deleteUserSix(e);
  };

  const cancel = (e) => {
    message.error("Không ẩn");
  };

  const handlePagination = async (pagination) => {
    let resListUser = await listUser(pagination);
    if (!resListUser.err) {
      setDataUser(resListUser)
    } else {
      message.error("get user failed");
    }
  };

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
      title: "Chức vụ",
      dataIndex: "full_name",
      key: "full_name",
      // sorter: (a, b) => a.full_name.length - b.full_name.length,
    },
    {
      title: "Phòng ban",
      dataIndex: "dep_name",
      key: "dep_name",
      // sorter: (a, b) => a.full_name.length - b.full_name.length,
    },
    {
      title: "Ngày sinh",
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
          <Link to={`/edituser/${text}`}>
            <Tag
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
        <div className="layout-content">
          {console.log(dataUser)}
          <div style={{ padding: 24, minHeight: 200 }}>
            <Table
              columns={columns}
              dataSource={dataUser ? dataUser.data : []}
              className="table-content"
              rowKey="id"
              pagination={{
                onChange: handlePagination,
                pageSize: 15,
                total: dataUser ? dataUser.meta.pagination.total : 0,
              }}
            />
          </div>
        </div>
      </Content>
    </div>
  );
}
export default TableSix;
