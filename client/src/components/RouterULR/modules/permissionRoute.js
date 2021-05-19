import ContentDepartment from "components/content/ContentDepartment";
import ContentSix from "components/content/ContentSix";
import ContentParts from "components/content/ContentParts";
import ContentPosition from "components/content/ContentPosition";
import InfoUser from "components/admin/AddAndUpdateInforUser/Container/indexContainer";
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
          component: InfoUser
        },
        "update": {
          path: "/update/:id",
          component: InfoUser
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
    "workflow": {
      path: "/workflow",
      component: Workflow
    }
  },
  "document-service": {
    "document-type": {
      path: "/document-type",
      component: DocumentType,
    },
    "document-template": {
      path: "/document-template",
      component: FormBuilder,
    }
  }
};