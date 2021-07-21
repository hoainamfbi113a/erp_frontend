import { Avatar, message, Popconfirm, Space, Tag } from "antd";
import {
  listUser,
  searchUser,
  listUserDepartFilter,
  listUserDepartAndPos
} from "apis/authenticationApi";
import user from "assets/images/user2.png";
import { checkVisible } from "helpers/FuncHelper";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { eraseHistory } from "reduxToolkit/features/userProfile/historySlice";
import { eraseHistory2 } from "../../../reduxToolkit/features/userProfile/historySlice2";
import { eraseFamily } from "reduxToolkit/features/userProfile/familySlice";
import { eraseKinship } from "reduxToolkit/features/userProfile/kinshipSlice";
import { eraseSocial } from "reduxToolkit/features/userProfile/socialSlice";
import { eraseTraining } from "reduxToolkit/features/userProfile/trainingSlice";
import { eraseTraining2 } from "reduxToolkit/features/userProfile/training2Slice";
import { eraseOrganize } from "reduxToolkit/features/userProfile/organizeSlice";
import { eraseOrganize2 } from "reduxToolkit/features/userProfile/organize2Slice";
import { eraseAbroad } from "../../../reduxToolkit/features/userProfile/abroadSlice";
import PermissionContext from "../../../context/PermissionContext";
import TableUser from "../TableUser";
import { formatDateNumber } from "../../../helpers/FuncHelper";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
const TableUserContainer = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [sizeOpt, setSizeOt] = useState(10);
  const { permissions } = useContext(PermissionContext);
  const { path } = useRouteMatch();
  const [dataUser, setDataUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    // props.setValueSearch("");
    if (props.idDepart && props.idDepart !== "all") {
      fetchDataByDepart(props.idDepart, 1, sizeOpt);
    } else if (props.idDepart === "all") {
      fetchData(1, sizeOpt);
    }
  }, [props.idDepart]);

  useEffect(() => {
    
    if(props.idDepart !== "all" && props.idDepart !== "" && props.idPos !== "all" && props.idPos !== "") {
      setLoading(true);
      fetchDataByDepartAndPos(props.idDepart, props.idPos, 1, sizeOpt);
    }
  }, [props.idPos]);

  const sendData = (data) => {
    props.parentCallback(data);
  };

  useEffect(async () => {
    setLoading(true);
    if (props.valueSearch !== "allinone") {
      fetchSearch(1, sizeOpt);
    } else {
      fetchData(1, sizeOpt);
    }
  }, [props.valueSearch]);

  const fetchData = async (page, per_page) => {
    const res = await listUser(page, per_page);
    if (!res.err) {
      setDataUser(res);
      props.totalEmploy(res.pagination.total);
      setLoading(false);
    } else {
      message.error("get list user failed");
    }
  };

  const fetchDataByDepart = async (id, page, per_page) => {
    const res = await listUserDepartFilter(id, page, per_page);
    if (res.message === "Successfully") {
      sendData(res);
      setDataUser(res);
      props.totalEmploy(res.pagination.total);
      setLoading(false);
    } else {
      message.error("get list user by depart failed");
    }
  };

  const fetchDataByDepartAndPos = async (id, pos_id, page, per_page) => {
    const res = await listUserDepartAndPos(id, pos_id, page, per_page);
    if(res.message === "Successfully") {
      sendData(res);
      setDataUser(res);
      props.totalEmploy(res.pagination.total);
      setLoading(false);
    } else {
      message.error("get list user by depart and pos failed");
    }
  }

  const fetchSearch = async (page, per_page) => {
    let res = await searchUser(props.valueSearch, page, per_page);
    if (!res.err) {
      setDataUser(res);
      props.totalEmploy(res.pagination.total);

      // setTimeout(() => {
      // },500)
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
    setLoading(true);
    if (props.idDepart && props.idDepart !== "all") {
      fetchDataByDepart(props.idDepart, page, pageSize);
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
