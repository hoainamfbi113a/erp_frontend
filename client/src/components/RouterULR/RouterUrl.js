import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import ContentPermission from "components/content/ContentPermission";
import ContentRoles from "components/content/ContentRoles";
import ContentRolesAction from "components/admin/Roles/ManergerRole";
import ContentRolePosition from "components/content/ContentRolePosition";
import notiRoute from "./modules/notification";

import formDocument from "components/content/documents/Form";
import "./RouterUrl.css";
import { useSelector } from "react-redux";
import ServiceRoute from "./route/ServiceRoute";
import PersonalPage from "../employee/personalPage/PersonalPage";
import Workflow from "../admin/workflow/Workflow";
import salaryComponent from "../salary/salaryComponent";
import NotFound from "../NotFound";

const RouterUrl = ({ props }) => {
  const permissions = useSelector((state) => state.permission);
  useEffect(() => {}, [permissions]);
  const renderUrl = () => {
    return (
      <Switch>
        <Route key="1" exact path={"/"} component={PersonalPage} />
        {notiRoute.map((route) => (
          <Route
            key={route.path}
            exact
            path={route.path}
            component={route.component}
          />
        ))}
        {permissions.map((service) => (
          <Route
            key={service.slug}
            path={"/" + service.slug}
            component={() => <ServiceRoute service={service} />}
          />
        ))}

        <Route
          key="2"
          exact
          path="/form-document/:id"
          component={formDocument}
        />
        <Route
          key="3"
          exact
          path="/form-document-view/:id"
          component={formDocument}
        />
        <Route
          key="4"
          exact
          path="/form-document-view/:id/:process_id"
          component={formDocument}
        />
        <Route key="5" exact path="/roles" component={ContentRoles}></Route>
        <Route
          key="6"
          exact
          path="/roles-position"
          component={ContentRolePosition}
        ></Route>
        <Route
          key="7"
          exact
          path="/roles-action"
          component={ContentRolesAction}
        ></Route>
        <Route
          key="8"
          exact
          path="/permission"
          component={ContentPermission}
        ></Route>
        <Route
          key="9"
          exact
          path="/salary"
          component={salaryComponent}
        ></Route>
        <Route component={NotFound}></Route>
      </Switch>
    );
  };

  return (
    <div style={{ background: "#EEEFF3" }}>
      <div className="content-background2">
        <div className="content-main">{renderUrl()}</div>
      </div>
    </div>
  );
};
export default RouterUrl;
