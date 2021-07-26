import React from "react";
import { useContext } from "react";
import { DocumentType, FormBuilder } from "@tuoitre/form-builder";
import "@tuoitre/form-builder/dist/index.css";
import docCookies from "doc-cookies";
import { useSelector } from "react-redux";
const user_id = docCookies.getItem("user_id");

import PermissionContext from "../../../context/PermissionContext";
const DocumentTypeComponent = () => {
  const { permissions } = useContext(PermissionContext);
  const user_name = useSelector((state) => state.user);
  let user = {
    id: user_id,
    name: user_name.full_name,
  };
  console.log(user, permissions);
  return (
    <DocumentType
      urls={{
        getListTypes: "/api/document-type/get-document-types",
        saveType: "/api/document-type/store",
        // saveType: 'https://document.tuoitre.vn/api/document-type/store',
        updateType: "/api/document-type/update",
        deleteType: "/api/document-type/delete",
      }}
      permissions={permissions}
      user={user}
    />
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
export default DocumentTypeComponent;
