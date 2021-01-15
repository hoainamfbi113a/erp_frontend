import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { Provider } from "react-redux";
import docCookies from "doc-cookies"
import configStore from "../store/configStore";
import Login from "../components/Login/Login";
import Erp from "../components/Erp/Erp";
import NotFound from "../components/NotFound";
import Globading from "../components/Loading/Globading";
import PersonalPage from "../components/employee/personalPage/PersonalPage"

const store = configStore();
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
      <Provider store={store}>
        <Globading />
        <Router>
          <Switch>
            {/* <Route exact path="/" component={Login} /> */}
            <Route exact path="/" component={()=>docCookies.getItem("usertoken") ?<PersonalPage/> : <Login/>} />
            <PrivateRoute path="/erp" component={Erp} />
            <Route component={NotFound}/>
          </Switch>
        </Router>
      </Provider>
    );
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
