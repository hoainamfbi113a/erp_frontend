import docCookies from "doc-cookies";
import axios from "axios";
import { message } from "antd";
const onChangeCoverFunc = (e, fetch, c) => {
  const formData = new FormData();
  formData.append("resource_type", "image");
  formData.append("user_resource_type", "3x4");
  formData.append("user_id", docCookies.getItem("user_id"));
  formData.append("file", e.target.files[0]);
  axios
    .post("/api/user/resources", formData)
    .then((res) => {
      if (res.data.message === "Successfully") {
        message.success("Cập nhật ảnh 3x4 thành công");
        return fetch();
      } else {
        message.error("Cập nhật ảnh 3x4 thất bại");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export { onChangeCoverFunc };
