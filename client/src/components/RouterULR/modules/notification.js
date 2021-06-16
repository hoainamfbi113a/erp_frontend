import ContentNotification from "components/content/Notification/ContentNotification";
import NotifiGenaral from "components/content//Notification/NotifiGenaral";
import NotifiMy from "components/content//Notification/NotifiMy";
import NotifiDepartment from "components/content//Notification/NotifiDepartment";
import NotifiMyWork from "components/content//Notification/NotifiMyWork";
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
    path: "/notification-my-work",
    component: NotifiMyWork,
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