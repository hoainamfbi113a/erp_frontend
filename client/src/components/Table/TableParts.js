import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
import {
  ValidateField,
  notNull,
  objCheckPermission,
  checkVisible,
} from "helpers/FuncHelper";
import "../../App/App.css";
import "./Table.css";
import {} from "antd";
import {
  Layout,
  Table,
  Space,
  Tag,
  Popconfirm,
  message,
  Input,
  Modal,
  Select,
} from "antd";
import { getListParts } from "apis/partsApi";
import { getListIdDepartment } from "apis/departmentApi";
import { checkPermission } from "../../apis/checkPermission";
import PermissionContext from "../../context/PermissionContext";
import usePrevious from "../../hooks/usePrevious";
import { simpleDate } from "../../helpers/FuncHelper";
const { Option } = Select;
const { Content } = Layout;

const TableParts = (props) => {
  const dispatch = useDispatch();
  const { permissions, domain, slug } = useContext(PermissionContext);
  const lastValue = usePrevious(props.valueSearch);
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
    if (props.valueSearch !== lastValue) {
      dispatch(showLoading());
      let resListPart = await getListParts("all");
      let listPartSearch = resListPart.data.filter((part) => {
        return (
          part.part_name
            .toLowerCase()
            .indexOf(props.valueSearch.toLowerCase()) !== -1
        );
      });
      let obj = {
        meta: {
          pagination: listPartSearch.length,
        },
        data: listPartSearch,
      };
      setData(obj);
      console.log(obj.data);
      props.total(obj.meta.pagination);
      dispatch(hideLoading());
    }
  }, [props.valueSearch]);

  const fetchData = async (page) => {
    let res = await getListParts(page);
    if (!res.err) {
      setData(res);
      props.total(res.meta.pagination.total);
    } else {
      message.error("get list parts failed");
    }
  };

  const fetchDepartment = async () => {
    let res = await getListIdDepartment();
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
      dispatch(showLoading());
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
          fetchData();
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
          fetchData();
        } else {
          message.error("Update permission thất bại");
        }
      }
      dispatch(hideLoading());
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
    dispatch(showLoading());
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
      fetchData();
      message.success("Ẩn tổ thành công");
    } else {
      message.error("Ẩn tổ thất bại");
    }
    dispatch(hideLoading());
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
  const handlePagination = async (pagination) => {
    try {
      let res = await getListParts(pagination);
      setData(res);
    } catch (error) {
      console.log("False to load API", error);
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
                {checkVisible(
                  permissions,
                  "delete",
                  "api/parts/{part}"
                ) && (
                  <Tag color="volcano" className="table-action">
                    Ẩn
                  </Tag>
                )}
              </Popconfirm>
              {checkVisible(
                permissions,
                "update",
                "api/parts/{part}"
              ) && (
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
      data.data.map(el => {
          el.created_at = simpleDate(el.created_at);
        })
    }
  }, [data])

  return (
    <div>
      <Content>
        <div className="layout-content">
          <div style={{ padding: 24, minHeight: 200 }}>
            {
              checkVisible(permissions, "list", "api/parts") ? (
                <Table
              style={{ minHeight: "70vh" }}
              dataSource={data ? data.data : ""}
              columns={columns}
              className="table-content"
              rowKey="id"
              pagination={{
                onChange: handlePagination,
                pageSize: 15,
                total: data ? data.meta.pagination.total : 0,
              }}
            />
              ) : ""
            }
            
          </div>
        </div>
      </Content>
      <Modal
        title={isCreate ? "Tạo tổ" : "Cập nhật tổ"}
        visible={props.showModalData}
        onOk={onSubmit}
        onCancel={hideModal}
        okText="OK"
        cancelText="Cancel"
        width={600}
      >
        <form
          style={{ width: "100%" }}
          className="tabs-main tabs-main-modal"
          noValidate
          method="post"
        >
          <ul style={{ marginLeft: "23px" }}>
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">
                Chọn phòng ban<span>*</span>
              </span>
              <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal ">
                <Select
                  value={part.dep_id}
                  style={{ width: 450 }}
                  onChange={handleChangeDepart}
                >
                  {renderDepartment()}
                </Select>
              </div>
              {err.err_dep !== "" ? (
                <span
                  style={{
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  {err.err_dep}
                </span>
              ) : null}
            </li>
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">
                Tên tổ<span>*</span>
              </span>
              <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                <Input
                  value={part.part_name}
                  name="part_name"
                  onChange={onChange}
                />
              </div>
              {err.err_name !== "" ? (
                <span
                  style={{
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  {err.err_name}
                </span>
              ) : null}
            </li>
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">Ghi chú tổ</span>
              <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                <Input
                  value={part.part_note}
                  name="part_note"
                  onChange={onChange}
                />
              </div>
            </li>
          </ul>
        </form>
      </Modal>
    </div>
  );
};
export default TableParts;
