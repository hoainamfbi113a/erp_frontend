import React, { useState, useEffect, useContext } from "react";
import "../../App/App.css";
import "./Table.css";
import {
  Layout,
  Table,
  Space,
  Tag,
  Popconfirm,
  Input,
  Modal,
  message,
} from "antd";
import {
  ValidateField,
  ValidateNumber,
  objCheckPermission,
  checkVisible,
} from "helpers/FuncHelper";
const { Content } = Layout;
import { getListDepartment, searchDepartment } from "../../apis/departmentApi";
import { checkPermission } from "../../apis/checkPermission";
import PermissionContext from "../../context/PermissionContext";
import { simpleDate } from "../../helpers/FuncHelper";

const TableDepartment = (props) => {
  const [loading, setLoading] = useState(false);
  const [sizeOpt, setSizeOt] = useState(10);
  const { permissions, domain, slug } = useContext(PermissionContext);
  const [id, setId] = useState("");
  const [data, setData] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
  const [depart, setDepart] = useState({
    dep_name: "",
    dep_address: "",
    dep_phone: "",
    dep_note: "",
  });
  const [err, setErr] = useState({
    err_name: "",
    err_address: "",
    err_phone: "",
  });

  useEffect(async () => {
    setLoading(true);
    if(props.valueSearch !== "") {
      fetchSearch(1, sizeOpt);
    } else {
      fetchData(1, sizeOpt);
    }
  }, [props.valueSearch]);

  const fetchSearch = async (page, per_page) => {
    let data = await searchDepartment(props.valueSearch, page, per_page);
      if (!data.err) {
        setData(data);
        props.total(data.meta.pagination.total);
        setLoading(false);
      } else {
        message.error("search fail");
      }
  }

  const fetchData = async (page, per_page) => {
    setLoading(true);
    try {
      let data = await getListDepartment(page, per_page);
      if (!data.err) {
        setData(data);
        props.total(data.meta.pagination.total);
        setLoading(false);
      } else {
        message.error("get list department failed");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onSubmit = async () => {
    let err_name = await ValidateField(depart.dep_name, 5, 50, "Tên");
    let err_address = await ValidateField(depart.dep_address, 5, 50, "Địa chỉ");
    let err_phone = await ValidateNumber(
      depart.dep_phone,
      9,
      11,
      "Số điện thoại"
    );
    if (err_name || err_address || err_phone) {
      setErr({ err_name, err_address, err_phone });
    }

    if (err_name === "" && err_address === "" && err_phone === "") {
      hideModal();
      setLoading(true);
      if (id === "") {
        let res = await checkPermission(
          objCheckPermission(
            permissions,
            slug,
            domain,
            "create",
            "api/departments",
            null,
            depart,
            null
          )
        );
        console.log(res);
        if (res.message === "Success!. Stored") {
          message.success("Thêm phòng ban thành công");
          fetchData(1, sizeOpt);
        } else {
          message.error("Thêm phòng ban thất bại");
        }
      } else {
        let res = await checkPermission(
          objCheckPermission(
            permissions,
            slug,
            domain,
            "update",
            "api/departments/{department}",
            "{department}",
            depart,
            id
          )
        );
        setId("");
        if (res.message === "Success!. Updated") {
          message.success("Cập nhật phòng ban thành công");
          fetchData(1, sizeOpt);
        } else {
          message.error("Cập nhật phòng ban thất bại");
        }
      }
      setLoading(false);
    }
  };

  const hideModal = () => {
    props.hideModal();
    setIsCreate(false);
    setDepart({
      dep_name: "",
      dep_address: "",
      dep_phone: "",
      dep_note: "",
    });
    setErr({
      err_name: "",
      err_address: "",
      err_phone: "",
    });
  };

  const showModal = (id) => {
    let dep = data.data.filter((item) => {
      return item.id == id;
    });
    setIsCreate(true);
    setId(dep[0].id);
    setDepart({
      dep_name: dep[0].dep_name,
      dep_address: dep[0].dep_address,
      dep_phone: dep[0].dep_phone,
      dep_note: dep[0].dep_note,
    });

    props.showModal();
  };

  const confirm = async (id) => {
    setLoading(true);
    let res = await checkPermission(
      objCheckPermission(
        permissions,
        slug,
        domain,
        "delete",
        "api/departments/{department}",
        "{department}",
        "",
        id
      )
    );
    if (res.message === "Success!. Deleted") {
      fetchData(1, sizeOpt);
      message.success("Ẩn phòng ban thành công");
    } else {
      message.error("Ẩn phòng ban thất bại");
    }
    setLoading(false);
  };

  const cancel = (e) => {
    message.error("Không ẩn");
  };

  const handlePagination = (page, pageSize) => {
    setSizeOt(pageSize);
    setLoading(true);
    if(props.valueSearch === "") {
      fetchData(page, pageSize);
    } else {
      fetchSearch(page, pageSize)
    }
  };

  const onChange = (e) => {
    setDepart({ ...depart, [e.target.name]: e.target.value });
  };

  // const onSizeChange = (current, size) => {
  //   setSizeOt()
  //   if(props.valueSearch === "") {
  //     fetchData(1, size);
  //   } else {
  //     fetchSearch(1, size)
  //   }
  // }

  const columns = [
    {
      title: "Tên phòng ban",
      dataIndex: "dep_name",
      key: "dep_name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "dep_address",
      key: "dep_address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "dep_phone",
      key: "dep_phone",
    },
    {
      title: "Ghi chú phòng ban",
      dataIndex: "dep_note",
      key: "dep_note",
    },
    {
      title: "Ngày tạo",
      dataIndex: `created_at`,
      key: "created_at",
    },
    checkVisible(permissions, "delete", "api/departments/{department}") ||
    checkVisible(permissions, "update", "api/departments/{department}")
      ? {
          title: "Hành động",
          key: "operation",
          dataIndex: "id",
          fixed: "right",
          render: (text, row) => (
            <Space size="middle">
              <Popconfirm
                title="Bạn có muốn Ẩn không?"
                onConfirm={() => confirm(text)}
                onCancel={cancel}
                okText="Có"
                cancelText="Không"
              >
                {checkVisible(
                  permissions,
                  "delete",
                  "api/departments/{department}"
                ) && (
                  <Tag color="volcano" className="table-action">
                    Ẩn
                  </Tag>
                )}
              </Popconfirm>
              {checkVisible(
                permissions,
                "update",
                "api/departments/{department}"
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
      data.data.map((el) => {
        el.created_at = simpleDate(el.created_at);
      });
    }
  }, [data]);

  return (
    <div>
      <Content>
        <div className="layout-content">
          <div style={{ padding: 24, minHeight: 200 }}>
            {checkVisible(permissions, "list", "api/departments") ? (
              <Table
                style={{ minHeight: "70vh" }}
                loading={loading}
                dataSource={data ? data.data : ""}
                columns={columns}
                className="table-content"
                rowKey="id"
                pagination={{
                  onChange: handlePagination,
                  //pageSize: 10,
                  current: data ? data.meta.pagination.current_page : 1,
                  total: data ? data.meta.pagination.total : 0,
                  showSizeChanger: true
                }}
              />
            ) : (
              ""
            )}

            {/* {!data ? "ko co data" : "co data"} */}
          </div>
        </div>
      </Content>
      <Modal
        title={isCreate ? "Tạo phòng ban" : "Cập nhật phòng ban"}
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
                Tên phòng ban<span>*</span>
              </span>
              <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                <Input
                  value={depart.dep_name}
                  name="dep_name"
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
              <span className="tabs-user-infor-top">
                Địa chỉ phòng ban<span>*</span>
              </span>
              <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                <Input
                  value={depart.dep_address}
                  name="dep_address"
                  onChange={onChange}
                />
              </div>
              {err.err_address !== "" ? (
                <span
                  style={{
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  {err.err_address}
                </span>
              ) : null}
            </li>
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">
                Số điện thoại phòng ban<span>*</span>
              </span>
              <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                <Input
                  value={depart.dep_phone}
                  name="dep_phone"
                  onChange={onChange}
                />
              </div>
              {err.err_phone !== "" ? (
                <span
                  style={{
                    color: "red",
                    fontStyle: "italic",
                  }}
                >
                  {err.err_phone}
                </span>
              ) : null}
            </li>
            <li className="tabs-main-left-li">
              <span className="tabs-user-infor-top">Ghi chú phòng ban</span>
              <div className="tabs-user-infor-bottom tabs-user-infor-bottom-modal">
                <Input
                  value={depart.dep_note}
                  name="dep_note"
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

export default TableDepartment;
