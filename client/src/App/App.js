import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { Provider } from "react-redux";
import docCookies from "doc-cookies"
import Logins from "components/Login/Logins";
import Erp from "components/Erp/Erp";
import NotFound from "components/NotFound";
import Globading from "components/Loading/Globading";
import PersonalPage from "components/employee/personalPage/PersonalPage"
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      docCookies.getItem("usertoken") ? <Component {...props} /> : <Redirect to="/" />
      // <Component {...props} />
    }
  />
);
export default class App extends Component {
  render() {
    return (
      <div>
        
        <Globading />
        <Router>
          <Switch>
            {/* <Route exact path="/" component={Login} /> */}
            <Route exact path="/" component={()=>docCookies.getItem("usertoken") ?<PersonalPage/> : <Logins/>} />
            <PrivateRoute path="/" component={Erp} />
            <Route component={NotFound}/>
          </Switch>
        </Router>
        </div>
    );
  }
}

