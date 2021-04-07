import React from "react";
import { Route, Switch } from "react-router-dom";
import PermissionContext from "../../../context/PermissionContext";
import Notfound from "../../NotFound";
import permissionRoute from "../modules/permissionRoute";

const ServiceRoute = ({ service }) => {
  return (
    <Switch>
      {
      service.groups.map((group) => {
        let slug = permissionRoute[`${service.slug}`] ? permissionRoute[`${service.slug}`][`${group.slug}`] : '';
        if (slug) {
          const Component = slug.component;
          let path = "/" + service.slug + slug.path;
          return (
              <Route
                key={path}
                path={path}
                render={() => (
                  <PermissionContext.Provider
                    value={{
                      permissions: group.permissions,
                      domain: service.domain,
                    }}
                  >
                    <Component routes={slug.routes}  />
                  </PermissionContext.Provider>
                )}
              />
          );
        }
      })
      }
      <Route component={Notfound} />
    </Switch>
  );
};
export default ServiceRoute;
