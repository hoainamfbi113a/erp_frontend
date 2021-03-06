import { message, Popconfirm, Select, Space, Tag } from "antd";
import { checkPermission } from "apis/checkPermission";
import { getListIdDepartment } from "apis/departmentApi";
import { getListParts, searchParts } from "apis/partsApi";
import {
  checkVisible,
  notNull,
  objCheckPermission,
  ValidateField,
} from "helpers/FuncHelper";
import React, { useContext, useEffect, useState } from "react";
import PermissionContext from "../../../context/PermissionContext";
import { simpleDate } from "../../../helpers/FuncHelper";
import TableParts from "../TableParts";
const { Option } = Select;

const TablePartContainer = (props) => {
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
    console.log(permissions, domain, slug);
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
    let err_name = await ValidateField(part.part_name, 2, 50, "T???");
    let err_dep = await notNull(part.dep_id, "Ph??ng ban");

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
          message.success("Th??m t??? th??nh c??ng");
          fetchData(1, sizeOpt);
        } else {
          message.error("Th??m t??? th???t b???i");
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
          message.success("C???p nh???t t??? th??nh c??ng");
          setId("");
          fetchData(1, sizeOpt);
        } else {
          message.error("Update permission th???t b???i");
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
      message.success("???n t??? th??nh c??ng");
    } else {
      message.error("???n t??? th???t b???i");
    }
    setLoading(false);
  };

  const cancel = (e) => {
    message.error("Kh??ng ???n");
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
      title: "T??n t???",
      dataIndex: "part_name",
      key: "part_name",
    },
    {
      title: "ph??ng ban",
      width: 200,
      dataIndex: "dataDepart",
      key: "dataDepart",
      fixed: "left",
    },
    {
      title: "Ghi ch??",
      dataIndex: "part_note",
      key: "part_note",
    },
    {
      title: "Tr???ng th??i",
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
      title: "Ng??y t???o",
      dataIndex: "created_at",
      key: "created_at",
    },
    checkVisible(permissions, "delete", "api/parts/{part}") ||
    checkVisible(permissions, "update", "api/parts/{part}")
      ? {
          title: "H??nh ?????ng",
          key: "operation",
          dataIndex: "id",
          fixed: "right",
          render: (text, row) => (
            <Space size="middle">
              <Popconfirm
                title="B???n c?? mu???n ???n kh??ng?"
                onConfirm={() => confirm(text)}
                onCancel={cancel}
                okText="C??"
                cancelText="Kh??ng"
              >
                {checkVisible(permissions, "delete", "api/parts/{part}") && (
                  <Tag color="volcano" className="table-action">
                    ???n
                  </Tag>
                )}
              </Popconfirm>
              {checkVisible(permissions, "update", "api/parts/{part}") && (
                <Tag
                  onClick={() => showModal(text)}
                  color="geekblue"
                  className="table-action"
                >
                  C???p nh???t
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
        // el.created_at = simpleDate(el.created_at);
        el.created_at = el.created_at.toString().slice(0, el.created_at.indexOf("T"))
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
