import ContentNotification from "components/content/Notification/ContentNotification";
import NotifiGenaral from "components/content//Notification/NotifiGenaral";
import NotifiMy from "components/content//Notification/NotifiMy";
import NotifiDepartment from "components/content//Notification/NotifiDepartment";
import NotifiMyWord from "components/content//Notification/NotifiMyWord";
import CreateNotifi from "components/content//Notification/CreateNotifi";
import EditInformationUser from "components/employee/EditInformationUser";

export default [
  {
    path: "/notification-general",
    component: NotifiGenaral,
  },
  {
    path: "/notification-my",
    component: NotifiMy,
  },
  {
    path: "/notification-department",
    component: NotifiDepartment,
  },
  {
    path: "/notification-myword",
    component: NotifiMyWord,
  },
  {
    path: "/notification-create",
    component: CreateNotifi,
  },
  {
    path: "/edit-information",
    component: EditInformationUser,
  }
];