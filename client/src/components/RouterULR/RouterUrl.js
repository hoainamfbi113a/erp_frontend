import docCookies from "doc-cookies";
import React, {useEffect} from "react";
import { Route, Switch } from "react-router-dom";
import Workflow from "components/admin/workflow/Workflow";
import FormBuilder from "components/admin/FormBuilder/FormBuilder";
import ContentPermission from "components/content/ContentPermission";
import ContentRoles from "components/content/ContentRoles";
import ContentRolesAction from "components/admin/Roles/ManergerRole";
import ContentRolePosition from "components/content/ContentRolePosition";
import notiRoute from "./modules/notification";
import DocumentType from "components/admin/FormBuilder/DocumentType";

import formDocument from "components/content/documents/Form";
import "./RouterUrl.css";
import { useSelector } from "react-redux";
import ServiceRoute from "./route/ServiceRoute";

const RouterUrl = () => {
  const permissions = useSelector((state) => state.permission);
  useEffect(() => {
  }, [permissions])
  const renderUrl = () => {
    // if (permissions.length) {
      return (
        <Switch>
          {notiRoute.map((route) => (
            <Route exact path={route.path} component={route.component} />
          ))}
          {permissions.map((service) => (
            <Route
              key={service.slug}
              path={"/" + service.slug}
              component={() => <ServiceRoute service={service} />}
            />
          ))}

          <Route exact path="/form-document/:id" component={formDocument} />
          <Route
            exact
            path="/form-document-view/:id"
            component={formDocument}
          />
          <Route
            exact
            path="/form-document-view/:id/:process_id"
            component={formDocument}
          />
          <Route exact path="/roles" component={ContentRoles}></Route>
          <Route
            exact
            path="/roles-position"
            component={ContentRolePosition}
          ></Route>
          <Route
            exact
            path="/roles-action"
            component={ContentRolesAction}
          ></Route>
          <Route exact path="/permission" component={ContentPermission}></Route>
          {/* <Route exact path="/form-builder" component={FormBuilder}></Route>
          <Route exact path="/document-type" component={DocumentType}></Route>
          <Route exact path="/workflow" component={Workflow}></Route> */}
        </Switch>
      );
    // }
    return <div>Loading...</div>;
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
