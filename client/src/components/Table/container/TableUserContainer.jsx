import { Avatar, message, Popconfirm, Space, Tag } from "antd";
import {
  listUser,
  searchUser,
  listUserDepartFilter,
  listUserDepartAndPos,
  listUserByPosition,
} from "apis/authenticationApi";
import user from "assets/images/user2.png";
import { checkVisible } from "helpers/FuncHelper";
import React, { useContext, useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import PermissionContext from "../../../context/PermissionContext";
import TableUser from "../TableUser";
import { formatDateNumber } from "../../../helpers/FuncHelper";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
const all = "Tất cả";
const TableUserContainer = ({
  idDepart,
  idPos,
  valueSearch,
  totalEmploy,
  parentCallback,
  loadingCallback,
  setIdDepart,
  setIdPos,
}) => {
  const [loading, setLoading] = useState(false);
  const [sizeOpt, setSizeOt] = useState(10);
  const { permissions } = useContext(PermissionContext);
  const { path } = useRouteMatch();
  const [dataUser, setDataUser] = useState(null);

  const nullIdDepart = idDepart !== "" && idDepart !== all;
  const nullIdPos = idPos !== all && idPos !== "";
  const allOrNullDep = idDepart === all || idDepart === "";
  const allOrNullPos = idPos === all || idPos === "";
  const orAll = idDepart === all || idPos === all;
  const orNull = idDepart === "" || idPos === "";

  // useEffect(() => {
  //   if (nullIdDepart && allOrNullPos) {
  //     fetchDataByDepart(idDepart, 1, sizeOpt);
  //   } else if (nullIdPos && allOrNullDep) {
  //     fetchDataByPos(idPos, 1, sizeOpt);
  //   } else if (idPos === "Tất cả" && allOrNullDep) {
  //     fetchData(1, sizeOpt);
  //   } else if (idDepart === "Tất cả" && idPos === "") {
  //     fetchData(1, sizeOpt);
  //   } else if (nullIdDepart && nullIdPos) {
  //     fetchDataByDepartAndPos(idDepart, idPos, 1, sizeOpt);
  //   }
  // }, [idDepart, idPos]);

  useEffect(() => {
    switch (true) {
      case nullIdDepart && allOrNullPos:
        fetchDataByDepart(idDepart, 1, sizeOpt);
        break;
      case nullIdPos && allOrNullDep:
        fetchDataByPos(idPos, 1, sizeOpt);
        break;
      case idPos === all && allOrNullDep:
        fetchData(1, sizeOpt);
        break;
      case idDepart === all && idPos === "":
        fetchData(1, sizeOpt);
        break;
      case nullIdDepart && nullIdPos:
        fetchDataByDepartAndPos(idDepart, idPos, 1, sizeOpt);
        break;
    }
  }, [idDepart, idPos]);

  // useEffect(() => {
  //   if (nullIdPos && allOrNullDep) {
  //     setLoading(true);
  //     fetchDataByPos(idPos, 1, sizeOpt);
  //   } else if (idPos === "Tất cả" && allOrNullDep) {
  //     setLoading(true);
  //     fetchData(1, sizeOpt);
  //   }
  // }, [idPos, idDepart]);

  useEffect(async () => {
    const valueIsAll = valueSearch === all;
    switch (true) {
      case valueSearch !== all:
        fetchSearch(1, sizeOpt);
        break;
      case valueIsAll && allOrNullDep && allOrNullPos:
        fetchData(1, sizeOpt);
        break;
      case valueIsAll && nullIdDepart && allOrNullPos:
        fetchDataByDepart(idDepart, 1, sizeOpt);
        break;
      case valueIsAll && nullIdPos && allOrNullDep:
        fetchDataByPos(idPos, 1, sizeOpt);
        break;
      case valueIsAll && nullIdDepart && nullIdPos:
        fetchDataByDepartAndPos(idDepart, idPos, 1, sizeOpt);
        break;
    }
  }, [valueSearch]);

  const sendData = (data) => {
    parentCallback(data);
  };

  const sendLoadingStatus = (bool) => {
    loadingCallback(bool);
  };

  const fetchData = async (page, per_page) => {
    setLoading(true);
    const res = await listUser(page, per_page);
    if (!res.err) {
      // sendData(res);
      setDataUser(res);
      totalEmploy(res.pagination.total);
      setLoading(false);
    } else {
      message.error("get list user failed");
    }
  };

  const fetchDataByDepart = async (id, page, per_page) => {
    setLoading(true);
    const res = await listUserDepartFilter(id, page, per_page);
    if (res.message === "Successfully") {
      const totalDepUser = res.pagination.total;
      if (totalDepUser > sizeOpt) {
        const data = await listUserDepartFilter(id, 1, 99);
        if (data.message === "Successfully") {
          sendData(data);
        }
      }
      setDataUser(res);
      totalEmploy(totalDepUser);
      setLoading(false);
      sendLoadingStatus(loading);
    } else {
      message.error("get list user by depart failed");
    }
  };

  const fetchDataByPos = async (id, page, per_page) => {
    setLoading(true);
    const res = await listUserByPosition(id, page, per_page);
    if (res.message === "Successfully") {
      const totalDepUser = res.pagination.total;
      if (totalDepUser > sizeOpt) {
        const data = await listUserByPosition(id, 1, 99);
        if (data.message === "Successfully") {
          sendData(data);
        }
      }
      setDataUser(res);
      totalEmploy(res.pagination.total);
      setLoading(false);
    } else {
      message.error("get list user by pos failed");
    }
  };

  const fetchDataByDepartAndPos = async (id, pos_id, page, per_page) => {
    setLoading(true);
    const res = await listUserDepartAndPos(id, pos_id, page, per_page);
    if (res.message === "Successfully") {
      const totalDepUser = res.pagination.total;
      if (totalDepUser > sizeOpt) {
        const data = await listUserDepartAndPos(id, pos_id, 1, 99);
        if (data.message === "Successfully") {
          sendData(data);
        }
      }
      setDataUser(res);
      totalEmploy(res.pagination.total);
      setLoading(false);
    } else {
      message.error("get list user by depart and pos failed");
    }
  };

  const fetchSearch = async (page, per_page) => {
    setLoading(true);
    let res = await searchUser(valueSearch, page, per_page);
    if (!res.err) {
      setDataUser(res);
      totalEmploy(res.pagination.total);
    } else {
      message.error("search fail");
    }
    setLoading(false);
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
    if (idDepart && idDepart !== all && allOrNullPos) {
      fetchDataByDepart(idDepart, page, pageSize);
    } else if (idPos && idPos !== all && allOrNullDep) {
      fetchDataByPos(idPos, page, pageSize);
    } else if (idDepart && idPos && nullIdDepart && nullIdPos) {
      fetchDataByDepartAndPos(idDepart, idPos, page, pageSize);
    } else {
      fetchData(page, pageSize);
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
          {userResource ? (
            <Avatar
              size={64}
              src={`data:image/jpeg;base64,${userResource.data.resource_content.content}`}
              alt=""
            />
          ) : (
            <Avatar shape="square" size={64} src={user} />
          )}
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
      title: "Chức danh, chức vụ",
      dataIndex: "department",
      key: "position",
      render: (department) => {
        return department && department.data
          ? `${department.data.pos_name}`
          : department && !department.data
          ? `${department.pos_name}`
          : "";
      },
    },
    {
      title: "Đơn vị công tác",
      dataIndex: "department",
      key: "department",
      render: (department) => {
        return department && department.data
          ? `${department.data.dep_name}`
          : department && !department.data
          ? `${department.dep_name}`
          : "";
      },
    },
    {
      title: "Ngày sinh",
      width: 120,
      dataIndex: "profile",
      key: "profile",
      render: (profile) =>
        `${
          profile && profile.data && profile.data.pro_birth_day !== null
            ? formatDateNumber(profile.data.pro_birth_day, dateFormatList[0])
            : "Chưa nhập"
        }`,
    },
    // moment(rew_time_from, dateFormatList[0]),
    {
      title: "Email",
      dataIndex: "email",
      key: "2",
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
