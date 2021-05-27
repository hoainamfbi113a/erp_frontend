import React, { useState, useContext } from "react";
import { Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, useRouteMatch } from "react-router-dom";
import TableUserContainer from "../Table/container/TableUserContainer";
import "./Content.css";
import withRoute from "../RouterULR/route/withRoute";
import PermissionContext from "../../context/PermissionContext";
import { checkVisible } from "../../helpers/FuncHelper";
import { searchUser } from "../../apis/authenticationApi";

const ContentUser = () => {
  const [autoSuggest, setAutoSuggest] = useState([]);
  const [value, setValue] = useState("");
  const [total, setTotal] = useState(0);
  let { path } = useRouteMatch();
  const { permissions } = useContext(PermissionContext);

  const fetch = (value, callback) => {
    let timeout;
    let currentValue;
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    currentValue = value;
  
    async function fake() {
      timeout = setTimeout(() => {
        let res = searchUser(value, 1, 10);
      if(!res.err) {
        if (currentValue === value) {
          const result = res.data;
          const data = [];
          result.forEach((item) => {
            data.push({
              value: item.full_name,
              text: item.full_name
            });
          });
          callback(data);
        }
      } else {
        message.error("get list parts failed");
      }
      }, 1000)
      
    }
  
    timeout = setTimeout(fake, 1000);
  }

  const handleSearch = (value) => {
    if (value) {
      fetch(value, (autoSuggest) => {
        setAutoSuggest(autoSuggest);
        console.log(autoSuggest);
      });
    } else {
      setAutoSuggest([]);
    }
  }

  return (
    <div>
      <div className="content-top">
        <div className="content-top-left">
          <div className="content-top-left-sum-item">{total} Nhân viên</div>
          <Select
            placeholder="Nhập tên nhân viên"
            allowClear
            onSearch={handleSearch}
            showSearch
            style={{ width: 200 }}
            className="table-btn-search"
          />
          <Button type="primary" icon={<SearchOutlined />}>
            Tìm kiếm
          </Button>
        </div>
        {checkVisible(permissions, "create", "api/profiles") && (
          <div className="content-top-right">
            <Link to={`${path}/create`}>
              <Button className="btn-add-user-six">Thêm hồ sơ nhân viên</Button>
            </Link>
          </div>
        )}
      </div>
      <TableUserContainer valueSearch={value} totalEmploy={setTotal} />
    </div>
  );
};

export default withRoute(ContentUser);
