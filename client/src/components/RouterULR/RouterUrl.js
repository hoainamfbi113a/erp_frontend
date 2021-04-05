import docCookies from "doc-cookies";
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { getPermissionUser } from "apis/authenticationApi";
import Workflow from "components/admin/workflow/Workflow";
import FormBuilder from "components/admin/FormBuilder/FormBuilder";
import AddAndUpdateInforUser from "components/admin/AddAndUpdateInforUser";
import ContentDepartment from "components/content/ContentDepartment";
import ContentMyNotification from "components/content/ContentMyNotification";
import ContentParts from "components/content/ContentParts";
import ContentPermission from "components/content/ContentPermission";
import ContentPosition from "components/content/ContentPosition";
import ContentRoles from "components/content/ContentRoles";
import ContentRolesAction from "components/admin/Roles/ManergerRole";
import ContentUserSix from "components/content/ContentSix";
import ContentRolePosition from "components/content/ContentRolePosition"
import notiRoute from "./modules/notification";

import formDocument from "components/content/documents/Form";
import "./RouterUrl.css";
const RouterUrl = () => {
  const [dataPermission, setDataPer] = useState(null);
  
  useEffect(() => {
    fetchPermission();
  }, [])

  const fetchPermission = async () => {
    const user_id = docCookies.getItem("user_id");
    const data = await getPermissionUser(user_id);
    setDataPer(data);
  };

  const checkPermission = (itemMenu, action) => {
    if (dataPermission && dataPermission.permissions)
      for (const element of dataPermission.permissions) {
        let name = element.actions[0].name === action;
        let service = element.slug_service_management;
        if (service === itemMenu  && name) {
          return true;
        }
      }
      return true;
  };

  // const RouteWithSubRoutes = (route) => {
  //   return (
  //     <Route
  //       path={route.path}
  //       render={props => (
  //         // pass the sub-routes down to keep nesting
  //         <route.component {...props} routes={route.routes} />
  //       )}
  //     />
  //   );
  // }
  

  const renderUrl = () => {
    if (true) {
      return (
        <Switch>
          {notiRoute.map((route) => (
              <Route
              exact
              path={route.path}
              component={route.component}
            />
          ))}
          
          {checkPermission("profile-service", "Create") ?
            [
                <Route exact path="/user" component={()=><ContentUserSix />} />,
                <Route exact path="/adduser" component={AddAndUpdateInforUser} />,
                <Route exact path="/position" component={ContentPosition} />,
                <Route exact path="/department" component={ContentDepartment} />,
                <Route exact path="/parts" component={ContentParts}></Route>,
                <Route exact path="/edituser/:id" component={AddAndUpdateInforUser} />
            ]
            : ""
          }
          {checkPermission("workflow-service", "Create") ?
            <Route exact path="/workflow" component={Workflow} /> : ""}
          {checkPermission("document-service", "Create") ? 
            <Route exact path="/form-builder" component={FormBuilder} /> : ""}
            
          
          <Route exact path="/form-document/:id" component={formDocument} />
          <Route exact path="/form-document-view/:id" component={formDocument} />
          <Route exact path="/form-document-view/:id/:process_id" component={formDocument} />
          <Route exact path="/roles" component={ContentRoles}></Route>
          <Route exact path="/roles-position" component={ContentRolePosition}></Route>
          <Route exact path="/roles-action" component={ContentRolesAction}></Route>
          <Route exact path="/permission" component={ContentPermission}></Route>
          
        </Switch>
      );
    } 
  };
  return (
    <div style={{ background: "#EEEFF3" }}>
      <div className="content-background2">
        <div className="content-main">{renderUrl()}</div>
      </div>
    </div>
  );
}
export default RouterUrl;
