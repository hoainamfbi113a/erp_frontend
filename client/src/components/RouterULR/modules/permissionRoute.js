import ContentDepartment from "components/content/ContentDepartment";
import ContentSix from "components/content/ContentSix";
import ContentParts from "components/content/ContentParts";
import ContentPosition from "components/content/ContentPosition";
import AddAndUpdateInforUser from "components/admin/AddAndUpdateInforUser";
import Workflow from "components/admin/workflow/Workflow";
import FormBuilder from "components/admin/FormBuilder/FormBuilder";
import DocumentType from "components/admin/FormBuilder/DocumentType";

export default {
  "profile-service": {
    "profile": {
      path: "/profile",
      component: ContentSix,
      routes: {
        "create": {
          path: "/create",
          component: AddAndUpdateInforUser
        },
        "update": {
          path: "/update/:id",
          component: AddAndUpdateInforUser
        }
      }
    },
    "department":{
      path:"/department",
      component: ContentDepartment,
    },
    "part":{
      path:"/part",
      component: ContentParts,
    },
    "position":{
      path:"/position",
      component: ContentPosition,
    },
  },
  "workflow-service": {
    "common": {
      path: "/common",
      component: Workflow
    }
  },
  "document-service": {
    "common": {
      path: "/common",
      component: DocumentType,
    },
    "document-template": {
      path: "/document-template",
      component: FormBuilder,
    }
  }
};