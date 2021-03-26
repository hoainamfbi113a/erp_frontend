import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
import { ValidateField, ValidateNumber } from "helpers/FuncHelper";
const { Content } = Layout;
import {
  getListDepartment,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../apis/departmentApi";
import usePrevious from "../../hooks/usePrevious";

const TableDepartment = (props) => {
  const dispatch = useDispatch();
  const lastValue = usePrevious(props.valueSearch);
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

  useEffect(() => {
    fetchData(1);
  }, []);

  useEffect(async () => {
    if (props.valueSearch !== lastValue) {
      let resListDepart = await getListDepartment("all");
      let listDepartSearch = resListDepart.data.filter((depart) => {
        return (
          depart.dep_name
            .toLowerCase()
            .indexOf(props.valueSearch.toLowerCase()) !== -1
        );
      });
      let obj = {
        meta: {
          pagination: listDepartSearch.length,
        },
        data: listDepartSearch,
      };
      setData(obj);
      props.totalDepartment(obj.meta.pagination);
    }
  }, [props.valueSearch]);

  const fetchData = async (page) => {
    try {
      let res = await getListDepartment(page);
      if(!res.err) {
        setData(res);
        props.totalDepartment(res.meta.pagination.total);
      } else {
        cmessage.error("get list department failed");ons
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    let err_name = await ValidateField(depart.dep_name, 8, 30, "Tên");
    let err_address = await ValidateField(depart.dep_address, 8, 30, "Địa chỉ");
    let err_phone = await ValidateNumber(depart.dep_phone, 9, 11, "Số điện thoại"
    );
    if (err_name || err_address || err_phone) {
      setErr({ err_name, err_address, err_phone });
    }

    if (err_name === "" && err_address === "" && err_phone === "") {
      hideModal();
      dispatch(showLoading());
      if (id === "") {
        let res = await addDepartment(depart);
        if (res.message === "Success!. Stored") {
          message.success("Thêm phòng ban thành công");
          fetchData();
        } else {
          message.error("Thêm phòng ban thất bại");
        }
      } else {
        let res = await updateDepartment(depart, id);
        setId("");
        if (res.message === "Success!. Updated") {
          message.success("Cập nhật phòng ban thành công");
          fetchData();
        } else {
          message.error("Cập nhật phòng ban thất bại");
        }
      }
      dispatch(hideLoading());
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
    dispatch(showLoading());
    const params = {
      id,
    };
    let res = await deleteDepartment(params);
    if (res.message === "Success!. Deleted") {
      fetchData();
      message.success("Ẩn phòng ban thành công");
    } else {
      message.error("Ẩn phòng ban thất bại");
    }
    dispatch(hideLoading());
  };

  const cancel = (e) => {
    message.error("Không ẩn");
  };

  const handlePagination = async (pagination) => {
    fetchData(pagination);
  };

  const onChange = (e) => {
    setDepart({ ...depart, [e.target.name]: e.target.value})
  }

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
      dataIndex: "created_at",
      key: "created_at",
    },
    {
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
            <Tag color="volcano" className="table-action">
              Ẩn
            </Tag>
          </Popconfirm>
          <Tag
            onClick={() => showModal(text)}
            color="geekblue"
            className="table-action"
          >
            Cập nhật
          </Tag>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Content>
        <div className="layout-content">
          <div style={{ padding: 24, minHeight: 200 }}>
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
            {/* {!data ? "ko co data" : "co data"} */}
          </div>
        </div>
      </Content>
      <Modal
        title={isCreate ? "Tạo phòng ban" : "Cập nhật phòng ban"}
        visible={props.showModalDepartment}
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
          // onSubmit={this.onSubmit}
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
      <h1>asd</h1>
    </div>
  );
};
export default TableDepartment;
