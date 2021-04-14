import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import docCookies from "doc-cookies";
import { Spin } from "antd";
import Logins from "components/Login/Logins";
import Erp from "components/Erp/Erp";
import NotFound from "components/NotFound";
import Globading from "components/Loading/Globading";
import { getPermission } from "reduxToolkit/features/permissionSlice";
import { getUser } from "reduxToolkit/features/userSlice";
import { getUserProfile } from "reduxToolkit/features/userProfileSlice";
import { setUser } from "../reduxToolkit/features/userSlice";
import { showLoading, hideLoading } from "reduxToolkit/features/uiLoadingSlice";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const stateUser = useSelector((state) => state.user);
  const statePermission = useSelector((state) => state.permission);
  const stateUserProfile = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();
  const id = docCookies.getItem("user_id");
  // dispatch(showLoading());
  useEffect(() => {
    if (id && !stateUser ) {
      dispatch(getPermission(id));
      dispatch(getUser(id));
      dispatch(getUserProfile(id));

      // dispatch(hideLoading());
    }
  }, []);
  return (
    <div>
      <Globading />
      <Router>
        <Switch>
          <Route
            path="/"
            render={() => {
              //  (statePermission.length && stateUser.id) ? <Erp/> : <Logins/>}
              if (statePermission.length && stateUser && Object.keys(stateUserProfile).length) {
                return <Erp />;
              } else if (id) {
                return (
                  <div className="GlobalLoading">
                    <Spin className="icon" size="large" />
                  </div>
                );
              } else {
                return <Logins />;
              }
            }}
          />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};
export default App;
