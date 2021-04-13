// import React, { Component } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Redirect,
//   Switch,
// } from "react-router-dom";
// import docCookies from "doc-cookies"
// import Logins from "components/Login/Logins";
// import Erp from "components/Erp/Erp";
// import NotFound from "components/NotFound";
// import Globading from "components/Loading/Globading";
// import { bindActionCreators } from 'redux'
// import { getPermission } from "reduxToolkit/features/permissionSlice";
// import { getUser } from "reduxToolkit/features/userSlice";
// import { getUserProfile } from "reduxToolkit/features/userProfileSlice";
// import { connect } from "react-redux";
// import { setUser } from "../reduxToolkit/features/userSlice";

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       docCookies.getItem("usertoken") ? <Component {...props} /> : <Redirect to="/" />
//       // <Component {...props} />
//     }
//   />
// );
// class App extends Component {

//   constructor() {
//     super()
//       this.state= {
//         init: null
//       }
//   }
//   async componentDidMount() {
//     const id = docCookies.getItem("user_id");
//     if(id){
//       await this.props.dispatchPermission(id);
//       await this.props.dispatchUser(id);
//       await this.props.dispatchProfileUser(id);
//       console.log(this.props.user);
//       this.setState({init:"1"})
//       console.log(this.state.init)
//     } else {
//       this.props.setUser({});
//     }
    
//   }


//   render() {
//     // if(this.props.user) {
//       if(this.props.user && this.state.init === "1"){
//       return (
//         <div>
          
//           <Globading />
//           <Router>
//             <Switch>
//               {/* <Route exact path="/" component={Login} /> */}
//               {/* <Route exact path="/" render={()=>docCookies.getItem("usertoken") ? : <Logins/>} /> */}
//               <Route path="/" render={()=> this.props.user.id ? <Erp/> : <Logins/>} /> 
//               <Route component={NotFound}/>
//             </Switch>
//           </Router>
//           </div>
//       );
//     }
//     return (
//       <div>Loading...</div>
//     )
    
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     user : state.user
//   }
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//     setUser : bindActionCreators(setUser,dispatch),
//     dispatchPermission: bindActionCreators(getPermission, dispatch),
//     dispatchUser: bindActionCreators(getUser, dispatch),
//     dispatchProfileUser : bindActionCreators(getUserProfile, dispatch)
//   }
// }

import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import docCookies from "doc-cookies"
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
  const stateUser = useSelector((state) => 
    state.user
  )
  const statePermission = useSelector((state) => 
    state.permission
  )
  const stateUserProfile = useSelector((state) => 
    state.userProfile
  )
  const dispatch = useDispatch()
  const id = docCookies.getItem("user_id");
  // dispatch(showLoading());
  useEffect(() => {
    if(id && !stateUser){
    dispatch(getPermission(id))
    dispatch(getUser(id))
    dispatch(getUserProfile(id))
    // dispatch(hideLoading());
    }
  }, [])
    return (
      <div>
        <Globading />
        <Router>
          <Switch>
            
            <Route path="/" render={()=> {
              //  (statePermission.length && stateUser.id) ? <Erp/> : <Logins/>}
              if(statePermission.length && stateUser.id) {
                return <Erp/>
              } else if(id) {
                return (
                  <div className="GlobalLoading">
                  <Spin className="icon" size="large" />
                </div>
                )
              } else {
                return <Logins/>
              }
            }} /> 
            <Route component={NotFound}/>
          </Switch>
        </Router>
        </div>
    );
};
export default App;
