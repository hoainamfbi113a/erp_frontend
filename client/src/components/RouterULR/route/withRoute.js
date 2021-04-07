import React, { Fragment, useContext } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import PermissionContext from "../../../context/PermissionContext";
import NotFound from "../../NotFound";

const withRoute = (Component) => (props) => {
  const { routes } = props;
  const { permissions } = useContext(PermissionContext);
  const { path } = useRouteMatch();
  return (
    <Fragment>
      <Switch>
        {routes
          ? Object.keys(routes).map((key, index) => {
              if (permissions.find((permission) => permission.action === key)) {
                return (
                  <Route
                    key={index}
                    path={path + routes[key].path}
                    component={routes[key].component}
                  />
                );
              }
            })
          : null}
        <Route exact path={path} render={() => <Component {...props} />} />
        <Route component={NotFound}/>
      </Switch>
    </Fragment>
  );
};
export default withRoute;
