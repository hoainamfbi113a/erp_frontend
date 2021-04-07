import ContentDepartment from "components/content/ContentDepartment";
import ContentSix from "components/content/ContentSix";
import ContentParts from "components/content/ContentParts";
import ContentPosition from "components/content/ContentPosition";
import AddAndUpdateInforUser from "components/admin/AddAndUpdateInforUser";

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
  }
};