import { Avatar, message, Popconfirm, Space, Tag } from "antd";
import { listUser, searchUser } from "apis/authenticationApi";
import user from "assets/images/user2.png";
import { checkVisible } from "helpers/FuncHelper";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { eraseFamily } from "reduxToolkit/features/userProfile/familySlice";
import { eraseHistory } from "reduxToolkit/features/userProfile/historySlice";
import { eraseKinship } from "reduxToolkit/features/userProfile/kinshipSlice";
import { eraseSocial } from "reduxToolkit/features/userProfile/socialSlice";
import { eraseTraining } from "reduxToolkit/features/userProfile/trainingSlice";
import { eraseTraining2 } from "reduxToolkit/features/userProfile/training2Slice";
import { eraseOrganize } from "reduxToolkit/features/userProfile/organizeSlice";
import { eraseOrganize2 } from "reduxToolkit/features/userProfile/organize2Slice";
import PermissionContext from "../../../context/PermissionContext";
import TableUser from "../TableUser";

const TableUserContainer = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [keySearch, setKeySearch] = useState("");
  const [autoSuggest, setAutoSuggest] = useState([]);
  const [sizeOpt, setSizeOt] = useState(10);
  const { permissions } = useContext(PermissionContext);
  const { path } = useRouteMatch();
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
  useEffect(() => {
    dispatch(eraseHistory());
    dispatch(eraseFamily());
    dispatch(eraseKinship());
    dispatch(eraseSocial());
    dispatch(eraseTraining());
    dispatch(eraseTraining2());
    dispatch(eraseOrganize());
    dispatch(eraseOrganize2());
  }, []);

  useEffect(async () => {
    setLoading(true);
    if (props.valueSearch !== "") {
      //fetchSearch(1, sizeOpt);
      //suggestSearch(1, sizeOpt);
      // fetch(props.valueSearch, (autoSuggest) => {
      //   setAutoSuggest(autoSuggest)
      //   console.log(autoSuggest);
      // });
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

  const suggestSearch = async (page, per_page) => {
    let res = await searchUser(props.valueSearch, page, per_page);
    if (!res.err) {
      res.data.map((item) => console.log(item.full_name));
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
    setSizeOt(pageSize);
    setLoading(true);
    if (props.valueSearch === "") {
      fetchData(page, pageSize);
    } else {
      fetchSearch(page, pageSize);
    }
  };

  const columns = [
    {
      title: "Ảnh đại diện",
      width: 150,
      dataIndex: "userResource",
      key: "userResource",
      fixed: "left",
      render: (userResource) => (
        <div>
          {userResource ? <Avatar size={64} 
            src={`data:image/jpeg;base64,${userResource.data.resource_content.content}`}
            alt=""
          />: 
          <Avatar
          shape="square"
          size={64}
          src={user}
        />}
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
      <TableUser
        permissions={permissions}
        loading={loading}
        columns={columns}
        dataUser={dataUser}
        handlePagination={handlePagination}
      />
    </div>
  );
};
export default TableUserContainer;
