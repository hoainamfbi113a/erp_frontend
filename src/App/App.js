import React,{Component} from 'react';
import { BrowserRouter as Router, Route,Redirect } from 'react-router-dom'
import {Provider} from "react-redux";

import configStore from "../store/configStore"
import Login from "../components/Login/Login";
// import Crm from "../components/Crm/Crm";
// import Table from "../components/Table/Table";
import ProfileOne from "../components/Profile/ProfileOne";
import Crm from "../components/Crm/Crm";
import tableTest from "../components/TableTest";
const store = configStore();
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
     localStorage.usertoken
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
       <Router>
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/crm" component={Crm} />
       </Router>
      </Provider>
    )
  }
}

// import React, { Component } from 'react';
// import AllPostContainer from '../containers/AllPostContainer';
// import PostFormContainer from '../containers/PostFormContainer';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <h1>
//           Hello
//         </h1>
//         <PostFormContainer />
//         <AllPostContainer />
//       </div>
//     );
//   }
// }

// export default App;