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
            {total ? `${total} nh??n vi??n` : "0 nh??n vi??n"}{" "}
          </div>
          <Select
            showSearch
            allowClear
            // searchValue=""
            optionFilterProp="children"
            placeholder="Nh???p t??n nh??n vi??n"
            disabled={
              total === null
              // || !loading
            }
            // onChange={() => {
            //   if (idDepart === "T???t c???") {
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
            {value !== "T???t c???" &&
            value !== "" 
            // &&
            // (idDepart === "T???t c???" || idDepart === "") 
            ? (
              <Option key="T???t c???">T???t c???</Option>
            ) : null}
            {userData &&
            (idDepart === "T???t c???" || idDepart === "") &&
            (idPos === "T???t c???" || idPos === "")
              ? userData.data.map((user) => (
                  <Option key={user.id} value={user.full_name}>
                    {user.full_name}
                  </Option>
                ))
              : dataFilter && (idDepart !== "T???t c???" || idPos !== "T???t c???")
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
            placeholder="T??m theo ????n v??? c??ng t??c"
            style={{ width: 250, marginRight: "5px" }}
            onChange={(key) => setIdDepart(key)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {idDepart !== "T???t c???" && idDepart !== "" && (
              <Option key="T???t c???">T???t c???</Option>
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
            placeholder="T??m theo ch???c danh / ch???c v???"
            style={{ width: 250, marginRight: "5px" }}
            onChange={(key) => setIdPos(key)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {idPos !== "T???t c???" && idPos !== "" && (
              <Option key="T???t c???">T???t c???</Option>
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
              <Button className="btn-add-user-six">Th??m h??? s?? nh??n vi??n</Button>
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
