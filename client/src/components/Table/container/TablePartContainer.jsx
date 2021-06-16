import { message, Popconfirm, Select, Space, Tag } from "antd";
import { checkPermission } from "apis/checkPermission";
import { getListIdDepartment } from "apis/departmentApi";
import { getListParts, searchParts } from "apis/partsApi";
import {
  checkVisible,
  notNull,
  objCheckPermission,
  ValidateField
} from "helpers/FuncHelper";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PermissionContext from "../../../context/PermissionContext";
import { simpleDate } from "../../../helpers/FuncHelper";
import TableParts from "../TableParts";
const { Option } = Select;

const TablePartContainer = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [sizeOpt, setSizeOt] = useState(10);
  const { permissions, domain, slug } = useContext(PermissionContext);
  const [id, setId] = useState("");
  const [dataDepart, setDataDepart] = useState(null);
  const [data, setData] = useState(null);
  const [part, setPart] = useState({
    dep_id: "",
    part_name: "",
    part_note: "",
  });
  const [err, setErr] = useState({
    err_dep: "",
    err_name: "",
  });
  const [isCreate, setIsCreate] = useState(false);

  useEffect(async () => {
    fetchDepartment();
  }, []);

  useEffect(async () => {
    setLoading(true);
    if (props.valueSearch !== "") {
      fetchSearch(1, sizeOpt);
    } else {
      fetchData(1, sizeOpt);
    }
  }, [props.valueSearch]);

  const fetchSearch = async (page, per_page) => {
    let data = await searchParts(props.valueSearch, page, per_page);
    if (!data.err) {
      setData(data);
      props.total(data.meta.pagination.total);
      setLoading(false);
    } else {
      message.error("search fail");
    }
  };

  const fetchData = async (page, per_page) => {
    let res = await getListParts(page, per_page);
    if (!res.err) {
      setData(res);
      props.total(res.meta.pagination.total);
      setLoading(false);
    } else {
      message.error("get list parts failed");
    }
  };

  const fetchDepartment = async () => {
    let res = await getListIdDepartment("all");
    if (!res.err) {
      setDataDepart(res.data);
    } else {
      message.error("err");
    }
  };

  const onSubmit = async () => {
    let err_name = await ValidateField(part.part_name, 2, 50, "Tổ");
    let err_dep = await notNull(part.dep_id, "Phòng ban");

    if (err_name || err_dep) {
      setErr({ err_dep, err_name });
    }
    if (err_dep === "" && err_name === "") {
      hideModal();
      setLoading(true);
      if (id === "") {
        let res = await checkPermission(
          objCheckPermission(
            permissions,
            slug,
            domain,
            "create",
            "api/parts",
            null,
            part,
            null
          )
        );
        if (res.message === "Success!. Stored") {
          message.success("Thêm tổ thành công");
          fetchData(1, sizeOpt);
        } else {
          message.error("Thêm tổ thất bại");
        }
      } else {
        let res = await checkPermission(
          objCheckPermission(
            permissions,
            slug,
            domain,
            "update",
            "api/parts/{part}",
            "{part}",
            part,
            id
          )
        );
        if (res.message === "Success!. Updated") {
          message.success("Cập nhật tổ thành công");
          setId("");
          fetchData(1, sizeOpt);
        } else {
          message.error("Update permission thất bại");
        }
      }
    }
  };

  const hideModal = () => {
    props.hideModal();
    setIsCreate(false);
    setPart({
      dep_id: "",
      part_name: "",
      part_note: "",
    });
    setErr({
      err_dep: "",
      err_name: "",
    });
  };

  const showModal = (id) => {
    let parts = data.data.filter((item) => {
      return item.id == id;
    });
    setIsCreate(true);
    setId(parts[0].id);
    setPart({
      dep_id: parts[0].dep_id,
      part_name: parts[0].part_name,
      part_note: parts[0].part_note,
    });
    props.showModal();
  };

  const onChange = (e) => {
    setPart({ ...part, [e.target.name]: e.target.value });
  };

  confirm = async (id) => {
    setLoading(true);
    let res = await checkPermission(
      objCheckPermission(
        permissions,
        slug,
        domain,
        "delete",
        "api/parts/{part}",
        "{part}",
        "",
        id
      )
    );
    if (res.message === "Success!. Deleted") {
      fetchData(1, sizeOpt);
      message.success("Ẩn tổ thành công");
    } else {
      message.error("Ẩn tổ thất bại");
    }
    setLoading(false);
  };

  const cancel = (e) => {
    message.error("Không ẩn");
  };

  const handleChangeDepart = (value) => {
    setPart({ ...part, dep_id: value });
  };

  const renderDepartment = () => {
    if (dataDepart !== null) {
      return dataDepart.map((item) => {
        return (
          <Option key={item.id} value={item.id}>
            {item.dep_name}
          </Option>
        );
      });
    } else return "";
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
  //let data = ""
  if (data !== null && dataDepart !== null) {
    for (let item of data.data) {
      for (let itemDepartment of dataDepart) {
        if (item.dep_id === itemDepartment.id) {
          item.dataDepart = itemDepartment.dep_name;
        }
      }
    }
  }

  const columns = [
    {
      title: "Tên tổ",
      dataIndex: "part_name",
      key: "part_name",
    },
    {
      title: "phòng ban",
      width: 200,
      dataIndex: "dataDepart",
      key: "dataDepart",
      fixed: "left",
    },
    {
      title: "Ghi chú",
      dataIndex: "part_note",
      key: "part_note",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        if (text == 1)
          return (
            <Tag color="geekblue" className="table-action">
              ACTIVE
            </Tag>
          );
        return (
          <Tag color="geekblue" className="table-action">
            HIDE
          </Tag>
        );
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
    },
    checkVisible(permissions, "delete", "api/parts/{part}") ||
    checkVisible(permissions, "update", "api/parts/{part}")
      ? {
          title: "Hành động",
          key: "operation",
          dataIndex: "id",
          fixed: "right",
          render: (text, row) => (
            <Space size="middle">
              <Popconfirm
                title="Bạn có muốn ẩn không?"
                onConfirm={() => confirm(text)}
                onCancel={cancel}
                okText="Có"
                cancelText="Không"
              >
                {checkVisible(permissions, "delete", "api/parts/{part}") && (
                  <Tag color="volcano" className="table-action">
                    Ẩn
                  </Tag>
                )}
              </Popconfirm>
              {checkVisible(permissions, "update", "api/parts/{part}") && (
                <Tag
                  onClick={() => showModal(text)}
                  color="geekblue"
                  className="table-action"
                >
                  Cập nhật
                </Tag>
              )}
            </Space>
          ),
        }
      : {},
  ];

  useEffect(() => {
    if (data && data.data) {
      data.data.map((el) => {
        el.created_at = simpleDate(el.created_at);
      });
    }
  }, [data]);

  return (
    <div>
      <TableParts
        permissions={permissions}
        loading={loading}
        data={data}
        columns={columns}
        handlePagination={handlePagination}
        isCreate={isCreate}
        showModalData={props.showModalData}
        onSubmit={onSubmit}
        hideModal={hideModal}
        part={part}
        renderDepartment={renderDepartment}
        handleChangeDepart={handleChangeDepart}
        err={err}
        onChange={onChange}
      />
    </div>
  );
};
export default TablePartContainer;
