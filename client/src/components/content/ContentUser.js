import React, { useState, useContext, useEffect } from "react";
import { Select, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, useRouteMatch } from "react-router-dom";
import TableUserContainer from "../Table/container/TableUserContainer";
import "./Content.css";
import withRoute from "../RouterULR/route/withRoute";
import PermissionContext from "../../context/PermissionContext";
import { checkVisible } from "../../helpers/FuncHelper";
import { getListDepartment } from "apis/departmentApi";
import { listUser } from "apis/authenticationApi";
const { Option } = Select;

const ContentUser = () => {
  const [value, setValue] = useState("");
  const [tempValue, setTempValue] = useState("");
  const [total, setTotal] = useState(null);
  let { path } = useRouteMatch();
  const { permissions } = useContext(PermissionContext);
  const [data, setData] = useState(null);
  const [idDepart, setIdDepart] = useState("");
  const [userData, setUserData] = useState(null);

  const [dataFilter, setDataFilter] = useState(null);

  const callbackFunction = (childData) => {
    setDataFilter(childData);
  };

  useEffect(() => {
    fetchDataDepartment("all");
    fetchData("all");
  }, []);

  const fetchDataDepartment = async (page) => {
    try {
      let data = await getListDepartment(page);
      if (!data.err) {
        setData(data);
      } else {
        message.error("get list department failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async (page) => {
    let res = await listUser(page);
    if (!res.err) {
      setUserData(res);
      //setLoading(false);
    } else {
      message.error("get list parts failed");
    }
  };

  return (
    <div>
      <div className="content-top">
        <div className="content-top-left">
          <div className="content-top-left-sum-item">{total} Nhân viên</div>
          <Select
            showSearch
            allowClear
            optionFilterProp="children"
            placeholder="Nhập tên nhân viên"
            disabled={total === null}
            onSelect={(value) => setValue(value)}
            style={{ width: 200 }}
            className="table-btn-search"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {userData
              ? userData.data.map((user) => (
                  <Option key={user.id} value={user.full_name}>
                    {user.full_name}
                  </Option>
                ))
              : dataFilter
              ? dataFilter.data.map((user) => (
                  <Option key={user.id} value={user.full_name}>
                    {user.full_name}
                  </Option>
                ))
              : null}
          </Select>

          <Button
            disabled={value === ""}
            style={{ margin: "0 5px 0 5px" }}
            onClick={() => setValue("")}
            type="primary"
          >
            Xóa tìm kiếm
          </Button>

          <Select
            showSearch
            disabled={total === null}
            optionFilterProp="children"
            placeholder="Tìm theo phòng ban"
            style={{ width: 220 }}
            onChange={(key) => setIdDepart(key)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option key="all">Tất cả</Option>
            {data
              ? data.data.map((department) => (
                  <Option key={department.id}>{department.dep_name}</Option>
                ))
              : null}
          </Select>
        </div>
        {checkVisible(permissions, "create", "api/profiles") && (
          <div className="content-top-right">
            <Link to={`${path}/create`}>
              <Button className="btn-add-user-six">Thêm hồ sơ nhân viên</Button>
            </Link>
          </div>
        )}
      </div>
      <TableUserContainer
        parentCallback={callbackFunction}
        valueSearch={value}
        totalEmploy={setTotal}
        idDepart={idDepart}
      />
    </div>
  );
};

export default withRoute(ContentUser);
