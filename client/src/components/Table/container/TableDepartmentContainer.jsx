import { message, Popconfirm, Space, Tag, Table } from "antd";
import {
  checkVisible,
  notNull,
  objCheckPermission,
  ValidateField,
  ValidateNumber,
} from "helpers/FuncHelper";
import React, { useContext, useEffect, useState } from "react";
import { checkPermission } from "apis/checkPermission";
import {
  getListDepartment,
  getListIdDepartment,
  searchDepartment,
} from "apis/departmentApi";
import { getListParts } from "apis/partsApi";
import PermissionContext from "../../../context/PermissionContext";
import { simpleDate } from "../../../helpers/FuncHelper";
import TableDepartment from "../TableDepartment2";

const permissions2 = [
  {
    action: "create",
    body: null,
    created_at: "2021-06-21 11:35:53",
    id: 18,
    is_display: 1,
    method: "post",
    name: "Tạo bộ phận làm việc",
    option: null,
    param: null,
    status: 1,
    table_management_id: 7,
    updated_at: "2021-06-21 11:35:53",
    uri: "api/parts",
  },
  {
    action: "update",
    body: null,
    created_at: "2021-06-21 11:35:53",
    id: 19,
    is_display: 1,
    method: "put",
    name: "Sửa bộ phận làm việc",
    option: null,
    param: null,
    status: 1,
    table_management_id: 7,
    updated_at: "2021-06-21 11:35:53",
    uri: "api/parts/{part}",
  },
  {
    action: "delete",
    body: null,
    created_at: "2021-06-21 11:35:53",
    id: 20,
    is_display: 1,
    method: "delete",
    name: "Xoá bộ phận làm việc",
    option: null,
    param: null,
    status: 1,
    table_management_id: 7,
    updated_at: "2021-06-21 11:35:53",
    uri: "api/parts/{part}",
  },
  {
    action: "list",
    body: null,
    created_at: "2021-06-21 11:35:53",
    id: 21,
    is_display: 1,
    method: "get",
    name: "Xem danh sách bộ phận làm việc",
    option: null,
    param: null,
    status: 1,
    table_management_id: 7,
    updated_at: "2021-06-21 11:35:53",
    uri: "api/parts",
  },
];

const TableDepartmentContainer = (props) => {
  const [loading, setLoading] = useState(false);
  const [sizeOpt, setSizeOt] = useState(10);
  const { permissions, domain, slug } = useContext(PermissionContext);
  const [id, setId] = useState("");
  const [id2, setId2] = useState("");
  const [data, setData] = useState(null);
  const [partData, setPartData] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
  const [isCreate2, setIsCreate2] = useState(false);
  const [filterDepId, setFilterDepId] = useState([]);
  const [idDepart, setIdDepart] = useState(null);
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
  const [part, setPart] = useState({
    dep_id: "",
    part_name: "",
    part_note: "",
  });
  const [err2, setErr2] = useState({
    err_dep: "",
    err_name: "",
  });

  useEffect(() => {
    fetchPartData("all");
    fetchIdDepartment();
  }, []);

  useEffect(() => {
    filterDepartId();
  }, [data, partData]);

  useEffect(async () => {
    setLoading(true);
    if (props.valueSearch !== "") {
      fetchSearch(1, sizeOpt);
    } else {
      fetchData(1, sizeOpt);
    }
  }, [props.valueSearch]);

  // send department data to Content Department Component
  const sendData = (data) => {
    props.parentCallback(data);
  };

  // get search data
  const fetchSearch = async (page, per_page) => {
    let data = await searchDepartment(props.valueSearch, page, per_page);
    if (!data.err) {
      setData(data);
      props.total(data.meta.pagination.total);
      setLoading(false);
    } else {
      message.error("search fail");
    }
  };

  // get department data per page
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

  // get all department data
  const fetchIdDepartment = async () => {
    let res = await getListIdDepartment("all");
    if (!res.err) {
      sendData(res.data);
      setIdDepart(res.data);
    } else {
      message.error("err");
    }
  };

  // get part data
  const fetchPartData = async (page) => {
    setLoading(true);
    try {
      let data = await getListParts(page);
      if (!data.err) {
        setPartData(data);
        setLoading(false);
      } else {
        message.error("get list department failed");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // Add or Update department data
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

  // Add or Update part data
  const onSubmitPart = async () => {
    let err_name = await ValidateField(part.part_name, 2, 50, "Tổ");
    let err_dep = await notNull(part.dep_id, "Phòng ban");

    if (err_name || err_dep) {
      setErr2({ err_dep, err_name });
    }
    if (err_dep === "" && err_name === "") {
      hideModalPart();
      setLoading(true);
      if (id2 === "") {
        let res = await checkPermission(
          objCheckPermission(
            permissions2,
            "part",
            domain,
            "create",
            "api/parts",
            null,
            part,
            null
          )
        );
        console.log(res);
        if (res.message === "Success!. Stored") {
          message.success("Thêm tổ thành công");
          fetchPartData("all");
        } else {
          message.error("Thêm tổ thất bại");
        }
      } else {
        let res = await checkPermission(
          objCheckPermission(
            permissions2,
            "part",
            domain,
            "update",
            "api/parts/{part}",
            "{part}",
            part,
            id2
          )
        );
        if (res.message === "Success!. Updated") {
          message.success("Cập nhật tổ thành công");
          setId2("");
          fetchPartData("all");
        } else {
          message.error("Update permission thất bại");
        }
      }
    }
  };

  // Hide Department Modal
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

  // hide part modal
  const hideModalPart = () => {
    props.hideModal2();
    setIsCreate2(false);
    setPart({
      dep_id: "",
      part_name: "",
      part_note: "",
    });
    setErr2({
      err_dep: "",
      err_name: "",
    });
  };

  // show department modal
  const showModal = (id) => {
    const dep = data.data.filter((item) => {
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

  // show part modal
  const showModalPart = (id) => {
    const parts = partData.data.filter((item) => {
      return item.id == id;
    });
    setIsCreate2(false);
    setId2(parts[0].id);
    setPart({
      dep_id: parts[0].dep_id,
      part_name: parts[0].part_name,
      part_note: parts[0].part_note,
    });
    props.showModal2();
  };

  // show add part model
  const showAddPartModal = (id) => {
    setIsCreate2(true);
    setPart({
      dep_id: id,
      part_name: "",
      part_note: "",
    });
    props.showModal2();
  };

  // confirm department button click
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

  // confirm part button click
  const confirmPart = async (id2) => {
    setLoading(true);
    let res = await checkPermission(
      objCheckPermission(
        permissions2,
        "part",
        domain,
        "delete",
        "api/parts/{part}",
        "{part}",
        "",
        id2
      )
    );
    if (res.message === "Success!. Deleted") {
      fetchPartData("all");
      message.success("Ẩn tổ thành công");
    } else {
      message.error("Ẩn tổ thất bại");
    }
    setLoading(false);
  };

  // cancel button click
  const cancel = (e) => {
    message.error("Không ẩn");
  };

  // change pagination
  const handlePagination = (page, pageSize) => {
    setSizeOt(pageSize);
    setLoading(true);
    if (props.valueSearch === "") {
      fetchData(page, pageSize);
    } else {
      fetchSearch(page, pageSize);
    }
  };

  const onChange = (e) => {
    setDepart({ ...depart, [e.target.name]: e.target.value });
  };

  const onChangePart = (e) => {
    setPart({ ...part, [e.target.name]: e.target.value });
  };

  const handleChangeDepart = (value) => {
    setPart({ ...part, dep_id: value });
  };

  const renderDepartment = () => {
    if (idDepart !== null) {
      return idDepart.map((item) => {
        return (
          <Option key={item.id} value={item.id}>
            {item.dep_name}
          </Option>
        );
      });
    } else return "";
  };

  // filter all Depart Id have Part
  const filterDepartId = () => {
    if (data && data.data.length) {
      let arr = [];
      if (partData && partData.data.length) {
        for (let j = 0; j < data.data.length; j++) {
          for (let i = 0; i < partData.data.length; i++) {
            if (data.data[j].id === partData.data[i].dep_id) {
              arr.push(data.data[j].id);
              break;
            }
          }
        }
        setFilterDepId(arr);
      }
    }
  };

  // children table (Part)
  const expandedRow = (row, depId) => {
    if (partData && partData.data.length) {
      const columnsExpand = [
        {
          title: "Tên tổ",
          width: 200,
          dataIndex: "part_name",
          key: "part_name",
        },
        {
          title: "Ghi chú",
          width: 200,
          dataIndex: "part_note",
          key: "part_note",
        },
        {
          title: "Ngày tạo",
          width: 200,
          dataIndex: "created_at",
          key: "created_at",
        },
        {
          title: "Hành động",
          width: 200,
          key: "operation",
          dataIndex: "id",
          fixed: "right",
          render: (text, row) => (
            <Space size="middle">
              <Popconfirm
                title="Bạn có muốn ẩn không?"
                onConfirm={() => confirmPart(text)}
                onCancel={cancel}
                okText="Có"
                cancelText="Không"
              >
                <Tag color="volcano" className="table-action">
                  Ẩn
                </Tag>
              </Popconfirm>
              <Tag
                onClick={() => showModalPart(text)}
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
        <Table
          style={{ paddingLeft: "2rem" }}
          columns={columnsExpand}
          dataSource={partData.data.filter((part) => part.dep_id === row.id)}
          pagination={false}
        />
      );
    } else return "";
  };

  // columns department
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
                <div>
                  <Tag
                    onClick={() => showModal(text)}
                    color="geekblue"
                    className="table-action"
                  >
                    Cập nhật
                  </Tag>
                  <Tag
                    onClick={() => showAddPartModal(text)}
                    color="cyan"
                    className="table-action"
                  >
                    Thêm tổ
                  </Tag>
                </div>
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
      <TableDepartment
        permissions={permissions}
        loading={loading}
        data={data}
        columns={columns}
        handlePagination={handlePagination}
        isCreate={isCreate}
        isCreate2={isCreate2}
        showModalData={props.showModalData}
        showModalData2={props.showModalData2}
        onSubmit={onSubmit}
        onSubmitPart={onSubmitPart}
        hideModal={hideModal}
        hideModalPart={hideModalPart}
        depart={depart}
        onChange={onChange}
        onChangePart={onChangePart}
        handleChangeDepart={handleChangeDepart}
        renderDepartment={renderDepartment}
        part={part}
        err={err}
        err2={err2}
        expandedRow={expandedRow}
        filterDepId={filterDepId}
      />
    </div>
  );
};

export default TableDepartmentContainer;
