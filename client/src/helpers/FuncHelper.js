const ValidateEmail = (value, length) => {
    let msg = "";
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/;
    let isEmail = regex.test(value);
    if (value.length == 0) {
        msg = "Email không được để trống!";
    } else if (value.length < length) {
        msg = `Email không được nhỏ ${length} kí tự!`;
    } else if (isEmail == false) {
        msg = "Email không đúng định dạng!";
    } else {
        msg = "pass";
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
        msg = "pass";
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
const validateInputFormUser = (type, checkingText) => {
    let isValid = true;
    let errorMessage = "";
    // let regex = "";
    switch (type) {
        case "pro_name":
            const regexName = /^[a-zA-Z]+$/;
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
export {
    ValidateEmail,
    ValidateField,
    resetStatusProfile,
    getIdActionByName,
    validateInputFormUser,
};
