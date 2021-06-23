import { message, Popconfirm, Space, Tag, Table } from "antd";
import {
  checkVisible,
  objCheckPermission,
  ValidateField,
  ValidateNumber,
} from "helpers/FuncHelper";
import React, { useContext, useEffect, useState } from "react";
import { checkPermission } from "apis/checkPermission";
import { getListDepartment, searchDepartment } from "apis/departmentApi";
import { getListParts } from "apis/partsApi";
import PermissionContext from "../../../context/PermissionContext";
import { simpleDate } from "../../../helpers/FuncHelper";
import TableDepartment from "../TableDepartment2";

const TableDepartmentContainer = (props) => {
  const [loading, setLoading] = useState(false);
  const [sizeOpt, setSizeOt] = useState(10);
  const { permissions, domain, slug } = useContext(PermissionContext);
  const [id, setId] = useState("");
  const [data, setData] = useState(null);
  const [partData, setPartData] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
  const [filterDepId, setFilterDepId] = useState([]);
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
    fetchPartData("all");
  }, []);
  useEffect(() => {
    filetDepId();
  }, [data, partData]);

  useEffect(async () => {
    setLoading(true);
    if (props.valueSearch !== "") {
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
  };

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
  const fetchPartData = async (page) => {
    setLoading(true);
    try {
      let data = await getListParts(page);
      if (!data.err) {
        setPartData(data);
        //props.total(data.meta.pagination.total);
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
    if (props.valueSearch === "") {
      fetchData(page, pageSize);
    } else {
      fetchSearch(page, pageSize);
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
  const filetDepId = () => {
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
  // if (data && data.data.length) {
  //   let arr = [];
  //   if (partData && partData.data.length) {
  //     for (let j = 0; j < data.data.length; j++) {
  //       for (let i = 0; i < partData.data.length; i++) {
  //         if (data.data[j].id === partData.data[i].dep_id) {
  //           arr.push(data.data[j].id);
  //           break;
  //         }
  //       }
  //     }
  //     console.log(arr);

  //     setFilterDepId(arr);
  //   }
  // }
  const expandedRow = (row) => {
    if (partData && partData.data.length) {
      const columnsExpand = [
        { title: "Tên tổ", dataIndex: "part_name", key: "part_name" },
        { title: "Ghi chú", dataIndex: "part_note", key: "part_note" },
        { title: "Ngày tạo", dataIndex: "created_at", key: "created_at" },
        // {
        //   title: "Hành động",
        //   key: "operation",
        //   dataIndex: "value",
        //   fixed: "right",
        //   render: (value, row) => (
        //     <Space size="middle">
        //       <Popconfirm
        //         title="Bạn có muốn ẩn không?"
        //         onConfirm={() => this.confirm(value)}
        //         onCancel={this.cancel}
        //         okText="Yes"
        //         cancelText="No"
        //       >
        //         <Tag color="volcano" className="table-action">
        //           Ẩn
        //         </Tag>
        //       </Popconfirm>
        //       <Tag
        //         onClick={() => this.showModal(value)}
        //         color="geekblue"
        //         className="table-action"
        //       >
        //         Cập nhật
        //       </Tag>
        //     </Space>
        //   ),
        // },
      ];

      return (
        <Table
          //loading={this.state.loading}

          style={{ paddingLeft: "2rem" }}
          columns={columnsExpand}
          dataSource={
            //data[1].options
            partData.data.filter((part) => part.dep_id === row.id)
          }
          pagination={false}
        />
      );
    } else return "";
  };

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
      <TableDepartment
        permissions={permissions}
        loading={loading}
        data={data}
        columns={columns}
        handlePagination={handlePagination}
        isCreate={isCreate}
        showModalData={props.showModalData}
        onSubmit={onSubmit}
        hideModal={hideModal}
        depart={depart}
        onChange={onChange}
        err={err}
        expandedRow={expandedRow}
        filterDepId={filterDepId}
      />
    </div>
  );
};

export default TableDepartmentContainer;
