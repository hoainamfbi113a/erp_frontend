import React, { useState, useContext } from "react";
import { Button, Select } from "antd";
const { Option } = Select;
import "./Content.css";
import PermissionContext from "../../context/PermissionContext";
import { checkVisible } from "../../helpers/FuncHelper";

const ContentDepartContainer = (props) => {
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [total, setTotal] = useState(0);
  const [dataFilter, setDataFilter] = useState(null);
  const { permissions } = useContext(PermissionContext);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const showModal2 = () => {
    setVisible2(true);
  };

  const hideModal2 = () => {
    setVisible2(false);
  };

  const callbackFunction = (childData) => {
    setDataFilter(childData);
  };

  const ComponentGenerator = () => {
    const Table = props.component;
    return (
      <Table
        parentCallback={callbackFunction}
        valueSearch={value}
        showModalData={visible}
        hideModal={hideModal}
        showModal={showModal}
        showModalData2={visible2}
        hideModal2={hideModal2}
        showModal2={showModal2}
        total={setTotal}
      />
    );
  };

  return (
    <div>
      <div className="content-top">
        <div className="content-top-left">
          <div className="content-top-left-sum-item">
            {total} {props.name}
          </div>
          {/* <Search
            placeholder="Tìm kiếm"
            allowClear
            onSearch={(e) => setValue(e)}
            style={{ width: 200 }}
            className="table-btn-search"
          /> */}
          <Select
            showSearch
            optionFilterProp="children"
            placeholder="Nhập tên phòng ban"
            allowClear
            onSelect={(e) => setValue(e)}
            style={{ width: 200 }}
            className="table-btn-search"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {dataFilter
              ? dataFilter.map((depart) => (
                  <Option key={depart.id} value={depart.dep_name}>
                    {depart.dep_name}
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
        </div>
        {checkVisible(permissions, "create", `api/${props.service}`) && (
          <div className="content-top-right">
            <Button onClick={showModal} className="btn-add-user-six">
              Thêm {props.name}
            </Button>
          </div>
        )}
      </div>
      {ComponentGenerator()}
    </div>
  );
};
export default ContentDepartContainer;
