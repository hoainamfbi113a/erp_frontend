import React from "react";

import { DocumentType, FormBuilder } from "@tuoitre/form-builder";
import "@tuoitre/form-builder/dist/index.css";
import { useContext } from "react";
import PermissionContext from "../../../context/PermissionContext";
import docCookies from "doc-cookies";
import { useSelector } from "react-redux"

const user_id = docCookies.getItem("user_id");


const FormBuilderComponent = () => {
  const user_name = useSelector((state) => state.user);
  //   let permissions = [{
  //     "id": 93,
  //     "table_management_id": 12,
  //     "name": "Xem loại tài liệu",
  //     "uri": "/api/document-type/get-document-types",
  //     "method": "GET",
  //     "action": "View",
  //     "param": null,
  //     "body": null,
  //     "option": null,
  //     "status": 1,
  //     "created_at": "2021-04-12 13:39:15",
  //     "updated_at": "2021-04-12 13:39:15"
  // }];
  let user = {
    id: user_id,
    name: user_name.full_name,
  };
  const { permissions } = useContext(PermissionContext);
  return (
    <div>
      <FormBuilder
        urls={{
          getListTypes: "/api/document-type/get-document-types",
          getDocumentTemplate: "/api/document-template/get",
          saveDocumentTemplate: "/api/document-template/store",
        }}
        permissions={permissions}
        user={user}
      />
    </div>
    // <div>
    //   <TTFormBuilder urls={
    //     {
    //       // getListTemplateType : "https://document.tuoitre.vn/api/document-type/get-document-types",
    //       // getTemplateType : "https://document.tuoitre.vn/api/document-template/get",
    //       // saveTemplateType : "https://document.tuoitre.vn/api/document-template/store",
    //       // createTemplateType : "https://document.tuoitre.vn/api/document-type/store",
    //       // deleteTemplateType : "https://document.tuoitre.vn/api/document-type/delete"

    //       getListTemplateType : "/api/document-type/get-document-types",
    //       getTemplateType : "/api/document-template/get",
    //       saveTemplateType : "/api/document-template/store",
    //       createTemplateType : "/api/document-type/store",
    //       deleteTemplateType : "/api/document-type/delete"
    //     }
    //   }
    //   />
    // </div>
  );
};
export default FormBuilderComponent;
