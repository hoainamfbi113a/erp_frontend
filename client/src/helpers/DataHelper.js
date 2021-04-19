import { simpleDate } from "./FuncHelper";

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

export { AllPermissionGroup };
