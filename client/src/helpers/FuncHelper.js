import moment from "moment";

const ValidateEmail = (value, length) => {
  let msg = "";
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/;
  // let isEmail = regex.test(value);
  if (value.length == 0) {
    msg = "Email không được để trống!";
  } else if (value.length < length) {
    msg = `Email không được nhỏ ${length} kí tự!`;
  } else {
    msg = "";
  }
  return msg;
};
const ValidateField = (value, min, max, field) => {
  let msg = "";
  if (value.length == 0) {
    msg = `${field} không được để trống!`;
  } else if (value.length < min) {
    msg = `${field} không được nhỏ hơn ${min} ký tự!`;
  } else if (value.length > max) {
    msg = `${field} không được lớn hơn ${max} ký tự!`;
  } else {
    msg = "";
  }
  return msg;
};
const ValidateField2 = (value, min, max, field) => {
  let msg = "";
  if (value === undefined) {
    msg = `${field} không được để trống!`;
  } else if (value.length < min) {
    msg = `${field} không được nhỏ hơn ${min} ký tự!`;
  } else if (value.length > max) {
    msg = `${field} không được lớn hơn ${max} ký tự!`;
  } else {
    msg = "";
  }
  return msg;
};

const ValidateField3 = (value, min, max, field) => {
  let msg = "";
  if (value === null) {
    msg = `${field} không được để trống!`;
  } else if (value.length < min) {
    msg = `${field} không được nhỏ hơn ${min} ký tự!`;
  } else if (value.length > max) {
    msg = `${field} không được lớn hơn ${max} ký tự!`;
  } else {
    msg = "";
  }
  return msg;
};

const ValidateNumber = (value, min, max, field) => {
  let msg = "";
  if (value.length == 0) {
    msg = `${field} không được để trống`;
  } else if (isNaN(value)) {
    msg = `${field} không hợp lệ`;
  } else if (value.length < min) {
    msg = `${field} không được nhỏ hơn ${min} ký tự!`;
  } else if (value.length > max) {
    msg = `${field} không được lớn hơn ${max} ký tự!`;
  } else {
    msg = "";
  }
  return msg;
};
const notNull = (value, field) => {
  let msg = "";
  if (value.length == 0) {
    msg = `Bạn chưa chọn ${field}`;
  } else {
    msg = "";
  }
  return msg;
};
const notNull2 = (value, field) => {
  let msg = "";
  if (value === undefined) {
    msg = `Bạn chưa chọn ${field}`;
  } else {
    msg = "";
  }
  return msg;
};
const getIdActionByName = (actionName, arrayId) => {
  for (let item of arrayId) {
    if (item.name == actionName) return arrayId.id;
  }
};
function resetStatusProfile(value) {
  if (value == 1) return 4;
  return value;
}
const validateOnlyNumber = (number) => {
  let msg = "";
  const regexName =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
  if (String(number).match(regexName)) {
    msg = "Chỉ có thể chứa số";
  }
  return msg;
};
const validateInputFormUser = (type, checkingText, listUser) => {
  let isValid = true;
  let errorMessage = "";
  // let regex = "";
  switch (type) {
    case "pro_name":
      const regexName =
        /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
      if (!checkingText) {
        isValid = true;
        errorMessage = "Tên không được để trống";
      } else {
        if (!checkingText.match(regexName)) {
          isValid = true;
          errorMessage = "Tên không được chứa chữ số";
        } else {
          isValid = false;
          errorMessage = "";
        }
      }

      break;
    case "email":
      const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/;
      if (!checkingText) {
        isValid = true;
        errorMessage = "Email không được để trống";
      } else {
        if (!checkingText.match(regexEmail)) {
          isValid = true;
          errorMessage = "Email không đúng định dạng";
        } else {
          isValid = false;
          errorMessage = "";
        }
        if (listUser) {
          for (let i = 0; i < listUser.length; i++) {
            if (listUser[i].email == checkingText) {
              isValid = true;
              errorMessage = "Email đã được đăng ký";
            }
          }
        }
      }
      break;

    case "phone":
      const regexPhone = /^\d{10,11}$/;
      if (!checkingText) {
        isValid = true;
        errorMessage = "Số điện thoại không được để trống";
      } else {
        if (!checkingText.match(regexPhone)) {
          isValid = true;
          errorMessage = "Số điện thoại phải có 10 đến 11 chữ số";
        } else {
          isValid = false;
          errorMessage = "";
        }
        if (listUser) {
          for (let i = 0; i < listUser.length; i++) {
            if (listUser[i].phone == checkingText) {
              isValid = true;
              errorMessage = "Sdt đã được đăng ký";
            }
          }
        }
      }
      break;
    case "department":
      if (!checkingText) {
        isValid = true;
        errorMessage = "Bạn chưa chọn phòng ban";
      } else {
        isValid = false;
        errorMessage = "";
      }
      break;
    case "position":
      if (!checkingText) {
        isValid = true;
        errorMessage = "Bạn chưa chọn chức vụ";
      } else {
        isValid = false;
        errorMessage = "";
      }
      break;
    case "part":
      if (!checkingText) {
        isValid = true;
        errorMessage = "Bạn chưa chọn tổ làm việc";
      } else {
        isValid = false;
        errorMessage = "";
      }
      break;
    default:
      break;
  }
  return {
    isValid: isValid,
    errorMessage: errorMessage,
  };
};
const tConvert = (time) => {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
};

const simpleDate = (date) => {
  let a = date.split(" ");
  let b = a[0].split("-");
  let c = b[2].concat("/", b[1], "/").concat(b[0]);
  let d = c.concat(" ", tConvert(a[1]));
  return d;
};

const formatDateNumber = (number, type) => {
  return moment(new Date(number * 1000)).format(type);
};

const convertFormatDate = (date, format) => {
  let a = date.split("/");
  let b = a[1].concat("-", a[0], "-").concat(a[2]);
  return b;
};

const convertCurrency = (value) => {
  return value.toLocaleString('vi', {style : 'currency', currency : 'VND'});
}

const objCheckPermission = (
  arr,
  slug,
  domain,
  action_check,
  uri_check,
  replace,
  dataIn,
  id
) => {
  let paramCheck = arr.filter(
    (permission) =>
      permission.action === action_check && permission.uri === uri_check
  );
  let obj = {
    objCheck: {
      uri: paramCheck[0].uri,
      method: paramCheck[0].method,
      slug_table_management: slug,
    },
    uri: paramCheck[0].uri.replace(replace, ""),
    data: dataIn,
    domain,
    id,
  };
  return obj;
};

const checkVisible = (arr, action_check, uri_check) => {
  let bdd = arr.filter(
    (permiss) => permiss.action === action_check && permiss.uri === uri_check
  );
  if (bdd.length) return true;
};

const sleep = (m) => new Promise((r) => setTimeout(r, m));
const checkEmpty = (value) => {
  let msg = "";
  if (value.length == 0) {
    msg = "không được để trống!";
  }
  return msg;
};
export {
  ValidateEmail,
  ValidateField,
  ValidateField2,
  ValidateField3,
  ValidateNumber,
  notNull,
  notNull2,
  resetStatusProfile,
  getIdActionByName,
  validateInputFormUser,
  simpleDate,
  sleep,
  objCheckPermission,
  checkVisible,
  formatDateNumber,
  convertFormatDate,
  validateOnlyNumber,
  convertCurrency,
  checkEmpty
};
