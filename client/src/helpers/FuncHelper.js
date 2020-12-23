const ValidateEmail = (value, length) => {
    let msg = '';
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/;
    let isEmail = regex.test(value);
    if (value.length == 0) {
      msg = 'Email không được để trống!';
    } else if (value.length < length) {
      msg = `Email không được nhỏ ${length} kí tự!`;
    } else if (isEmail == false) {
      msg = 'Email không đúng định dạng!';
    } else {
      msg = 'pass';
    }
    return msg;
}
const ValidateField = (value, min, max, field) => {
    let msg = '';
    if (value.length == 0) {
      msg = `${field} không được để trống!`;
    } else if (value.length < min) {
      msg = `${field} không được nhỏ hơn ${min} ký tự!`;
    } else if (value.length > max) {
      msg = `${field} không được lớn hơn ${max} ký tự!`;
    } else {
      msg = 'pass';
    }
    return msg;
}
function resetStatusProfile (value) {
  if(value ==1)
    return 4;
  return value
}
export {
    ValidateEmail,
    ValidateField,
    resetStatusProfile
}