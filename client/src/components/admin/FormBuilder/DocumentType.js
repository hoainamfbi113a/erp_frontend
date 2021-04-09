import React from "react";

import { DocumentType, FormBuilder } from "@tuoitre/form-builder";
import '@tuoitre/form-builder/dist/index.css'

const DocumentTypeComponent = () => {
  return (
    <div>
      <DocumentType
        urls={{
          getListTypes:
            "http://document.tuoitre.vn/api/document-type/get-document-types",
          saveType: "http://document.tuoitre.vn/api/document-type/store",
          updateType: "http://document.tuoitre.vn/api/document-type/update",
          deleteType: "http://document.tuoitre.vn/api/document-type/delete",
        }}
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
export default DocumentTypeComponent;
