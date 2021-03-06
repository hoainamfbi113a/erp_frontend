import React, { useState, useContext, useEffect } from "react";
import { Select, Button, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, useRouteMatch } from "react-router-dom";
import TableUserContainer from "../Table/container/TableUserContainer";
import "./Content.css";
import withRoute from "../RouterULR/route/withRoute";
import PermissionContext from "../../context/PermissionContext";
import { checkVisible } from "../../helpers/FuncHelper";
import { getListDepartment } from "apis/departmentApi";
import { getListPosition } from "../../apis/positionApi";
import { listUser } from "apis/authenticationApi";
import usePrevious from "../../hooks/usePrevious";

const { Option } = Select;

const ContentUser = () => {
  const [value, setValue] = useState("");
  const [tempValue, setTempValue] = useState("");
  const [total, setTotal] = useState(null);
  const prevTotal = usePrevious(total);
  let { path } = useRouteMatch();
  const { permissions } = useContext(PermissionContext);
  const [data, setData] = useState(null);
  const [idDepart, setIdDepart] = useState("");
  const [idPos, setIdPos] = useState("");
  const [userData, setUserData] = useState(null);
  const [posData, setPosData] = useState(null);

  const [dataFilter, setDataFilter] = useState(null);
  const [loading, setLoading] = useState(true);

  const callbackFunction = (childData) => {
    setDataFilter(childData);
  };

  const loadingCallback = (childData) => {
    setLoading(childData);
  };

  useEffect(() => {
    fetchDataDepartment("all");
    fetchDataPosition("all");
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

  const fetchDataPosition = async (page) => {
    try {
      const data = await getListPosition(page);
      if (!data.err) {
        setPosData(data);
      } else {
        message.error("get list position failed");
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
          <div className="content-top-left-sum-item">
            {total ? `${total} nhân viên` : "0 nhân viên"}{" "}
          </div>
          <Select
            showSearch
            allowClear
            // searchValue=""
            optionFilterProp="children"
            placeholder="Nhập tên nhân viên"
            disabled={
              total === null
              // || !loading
            }
            // onChange={() => {
            //   if (idDepart === "Tất cả") {
            //     setValue("");
            //     // setIdDepart("");
            //     // setIdPos("");
            //   }
            // }}
            onSelect={(value) => setValue(value)}
            style={{ width: 250, marginRight: "5px" }}
            className="table-btn-search"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {value !== "Tất cả" &&
            value !== "" 
            // &&
            // (idDepart === "Tất cả" || idDepart === "") 
            ? (
              <Option key="Tất cả">Tất cả</Option>
            ) : null}
            {userData &&
            (idDepart === "Tất cả" || idDepart === "") &&
            (idPos === "Tất cả" || idPos === "")
              ? userData.data.map((user) => (
                  <Option key={user.id} value={user.full_name}>
                    {user.full_name}
                  </Option>
                ))
              : dataFilter && (idDepart !== "Tất cả" || idPos !== "Tất cả")
              ? dataFilter.data.map((user) => (
                  <Option key={user.id} value={user.full_name}>
                    {user.full_name}
                  </Option>
                ))
              : null}
          </Select>

          <Select
            showSearch
            disabled={total === null}
            optionFilterProp="children"
            placeholder="Tìm theo đơn vị công tác"
            style={{ width: 250, marginRight: "5px" }}
            onChange={(key) => setIdDepart(key)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {idDepart !== "Tất cả" && idDepart !== "" && (
              <Option key="Tất cả">Tất cả</Option>
            )}
            {data
              ? data.data.map((department) => (
                  <Option key={department.id}>{department.dep_name}</Option>
                ))
              : null}
          </Select>

          <Select
            showSearch
            disabled={total === null}
            optionFilterProp="children"
            placeholder="Tìm theo chức danh / chức vụ"
            style={{ width: 250, marginRight: "5px" }}
            onChange={(key) => setIdPos(key)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {idPos !== "Tất cả" && idPos !== "" && (
              <Option key="Tất cả">Tất cả</Option>
            )}
            {posData
              ? posData.data.map((position) => (
                  <Option key={position.id}>{position.pos_name}</Option>
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
        loadingCallback={loadingCallback}
        valueSearch={value}
        setValueSearch={setValue}
        totalEmploy={setTotal}
        idDepart={idDepart}
        idPos={idPos}
        setIdDepart={setIdDepart}
        setIdPos={setLoading}
      />
    </div>
  );
};

export default withRoute(ContentUser);
