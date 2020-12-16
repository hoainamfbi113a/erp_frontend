import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { Provider } from "react-redux";

import configStore from "../store/configStore";
import Login from "../components/Login/Login";
import Crm from "../components/Crm/Crm";
import NotFound from "../components/NotFound";
import Globading from "../components/Loading/Globading";

const store = configStore();
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.usertoken ? <Component {...props} /> : <Redirect to="/" />
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
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/crm" component={Crm} />
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
