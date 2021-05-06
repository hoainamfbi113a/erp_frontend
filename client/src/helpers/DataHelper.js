import { simpleDate } from "./FuncHelper";
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AllPermissionGroup = data => {
  let arrOption = [];
  data.map((item) =>
    item.groups.map((itemGr) => {
      let arrOt = [];
      itemGr.permissions.map((itemPer) => {
        let objPer = {
          created_at: simpleDate(itemPer.created_at),
          label: itemPer.name,
          value: itemPer.id,
        };
        arrOt.push(objPer);
      });
      let objGr = {
        key: itemGr.id,
        label: itemGr.name,
        options: arrOt,
      };
      arrOption.push(objGr);
    })
  );
  return arrOption;
};

const fetchSearch = async (page, searchFunc) => {
  let data = await searchFunc(props.valueSearch, page);
    if (!data.err) {
      setData(data);
      props.total(data.meta.pagination.total);
    } else {
      message.error("search fail");
    }
  }

const fetchData = async (page, getListFunc) => {
  try {
    let data = await getListFunc(page);
    if (!data.err) {
      setData(data);
      props.total(data.meta.pagination.total);
    } else {
      message.error("get list department failed");
    }
  } catch (error) {
    console.log(error);
  }
};

export { AllPermissionGroup, fetchSearch, fetchData };
