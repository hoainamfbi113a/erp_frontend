import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import docCookies from "doc-cookies"
import Logins from "components/Login/Logins";
import Erp from "components/Erp/Erp";
import NotFound from "components/NotFound";
import Globading from "components/Loading/Globading";
import { bindActionCreators } from 'redux'
import { getPermission } from "reduxToolkit/features/permissionSlice";
import { getUser } from "reduxToolkit/features/userSlice";
import { getUserProfile } from "reduxToolkit/features/userProfileSlice";
import { connect } from "react-redux";
import { setUser } from "../reduxToolkit/features/userSlice";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      docCookies.getItem("usertoken") ? <Component {...props} /> : <Redirect to="/" />
      // <Component {...props} />
    }
  />
);
class App extends Component {

  componentDidMount() {
    const id = docCookies.getItem("user_id");
    if(id){
      this.props.dispatchPermission(id);
      this.props.dispatchUser(id);
      this.props.dispatchProfileUser(id);
    }else{
      this.props.setUser({})
    }
  }


  render() {
    if( this.props.user) {
      return (
        <div>
          
          <Globading />
          <Router>
            <Switch>
              {/* <Route exact path="/" component={Login} /> */}
              {/* <Route exact path="/" render={()=>docCookies.getItem("usertoken") ? : <Logins/>} /> */}
              <Route path="/" render={()=> this.props.user.id ? <Erp/> : <Logins/>} /> 
              <Route component={NotFound}/>
            </Switch>
          </Router>
          </div>
      );
    }
    return (
      <div>Loading...</div>
    )
    
  }
}

const mapStateToProps = (state) => {
  return {
    user : state.user
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setUser : bindActionCreators(setUser,dispatch),
    dispatchPermission: bindActionCreators(getPermission, dispatch),
    dispatchUser: bindActionCreators(getUser, dispatch),
    dispatchProfileUser : bindActionCreators(getUserProfile, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)