import docCookies from "doc-cookies";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { getPermissionUser } from "apis/authenticationApi";
import NotFound from "components/NotFound";
import AddAndUpdateInforUser from "components/admin/AddAndUpdateInforUser";
import Workflow from "components/admin/workflow/Workflow";
import FormBuilder from "components/admin/FormBuilder/FormBuilder";
import ContentDepartment from "components/content/ContentDepartment";
import ContentMyNotification from "components/content/ContentMyNotification";
import ContentParts from "components/content/ContentParts";
import ContentPermission from "components/content/ContentPermission";
import ContentPosition from "components/content/ContentPosition";
import ContentRoles from "components/content/ContentRoles";
import ContentUserSix from "components/content/ContentSix";
import ContentNotification from "components/content/Notification/ContentNotification";
import NotifiGenaral from "components/content//Notification/NotifiGenaral";
import NotifiMy from "components/content//Notification/NotifiMy";
import NotifiDepartment from "components/content//Notification/NotifiDepartment";
import NotifiMyWord from "components/content//Notification/NotifiMyWord";
import CreateNotifi from "components/content//Notification/CreateNotifi";
import EditInformationUser from "components/employee/EditInformationUser";
import formDocument from "components/content/documents/Form";
import "./RouterUrl.css";
import {
  Manage_Profile,
  Manage_Department,
  Manage_Personal_History,
  Manage_Work_Object,
  Manage_User_Degree,
  Manage_Journalist_Card,
  Manage_Part,
  Manage_Position,
  Assign_Department,
  Manage_Permission,
  Manage_Workflow,
  Manage_Document,
} from "constant/permission";
export default class RouterUrl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeProfile: 0,
      dataPermission: null,
      slugPermission: null,
      major: 0,
      isTrue: false,
    };
  }
  componentDidMount = async () => {
    await this.fetchPermission();
    this.getMajor();
  };
  fetchPermission = async () => {
    const user_id = docCookies.getItem("user_id");
    const data = await getPermissionUser(user_id);
    this.setState({
      dataPermission: data,
    });
  };
  checkPermission = (itemMenu, action) => {
    let dataPermission = this.state.dataPermission;
    if (dataPermission && dataPermission.permissions)
      for (const element of dataPermission.permissions) {
        if (element.name === itemMenu) {
          if (element.actions[0] === action) {
            return true;
          }
        }
      }
    return false;
  };
  getMajor = () => {
    let dataPermission = this.state.dataPermission;
    if (
      dataPermission.permissions.length > 7 &&
      dataPermission.permissions[0].name == "Manage Profile" &&
      dataPermission.permissions[0].actions[4] == "Confirm" &&
      dataPermission.permissions[1].actions[4] != "Confirm"
    ) {
      this.setState({
        major: 10,
      });
    }
    if (
      dataPermission.permissions.length > 6 &&
      dataPermission.permissions[1].name == "Manage Department" &&
      dataPermission.permissions[1].actions[4] == "Confirm" &&
      dataPermission.permissions[0].actions[4] != "Confirm"
    ) {
      this.setState({
        major: 11,
      });
    }
    if (
      dataPermission.permissions.length > 7 &&
      dataPermission.permissions[8] &&
      dataPermission.permissions[8].actions[4] == "Confirm" &&
      localStorage.getItem("0") == 0
    ) {
      this.setState({
        major: 8,
        isTrue: true,
      });
    }
    if (
      dataPermission.permissions.length > 7 &&
      dataPermission.permissions[0].actions[4] == "Confirm" &&
      dataPermission.permissions[6].actions[4] == "Confirm" &&
      localStorage.getItem("0") != 0
    ) {
      this.setState({
        major: 1,
      });
    }
  };
  renderUrl = () => {
    if (this.state.major == 8 && this.state.isTrue === true) {
      return (
        <Switch>
          {this.checkPermission(Manage_Profile, "Create") === true ? (
            // <Route exact path="/user" component={()=><ContentUserSix actions={permission.actions}/>}></Route>
            <Route exact path="/user" component={()=><ContentUserSix />}></Route>
          ) : (
            ""
          )}

          <Route
            exact
            path="/notification"
            component={ContentNotification}
          ></Route>
          <Route
            exact
            path="/form-document/:id"
            component={formDocument}
          ></Route>
          <Route
            exact
            path="/mynotification"
            component={ContentMyNotification}
          ></Route>
          <Route
            exact
            path="/edituser/:id"
            component={AddAndUpdateInforUser}
          ></Route>
          {this.checkPermission(Manage_Profile, "Create") === true ? (
            <Route
              exact
              path="/adduser"
              component={AddAndUpdateInforUser}
            ></Route>
          ) : (
            ""
          )}
          <Route exact path="/roles" component={ContentRoles}></Route>
          <Route exact path="/permission" component={ContentPermission}></Route>
          <Route exact path="/parts" component={ContentParts}></Route>
          {this.checkPermission(Manage_Position, "Create") === true ? (
            <Route exact path="/position" component={ContentPosition}></Route>
          ) : (
            ""
          )}
          {/* {this.checkPermission(Manage_Document, "Create") === true ? (
            <Route
              exact
              path="/department"
              component={ContentDepartment}
            ></Route>
          ) : (
            ""
          )} */}
          {this.checkPermission(Manage_Workflow, "Create") === true ? (
            <Route exact path="/workflow" component={Workflow}></Route>
          ) : (
            ""
          )}
          {this.checkPermission(Manage_Workflow, "Create") === true ? (
            <Route exact path="/form-builder" component={FormBuilder}></Route>
          ) : (
            ""
          )}
          {this.checkPermission(Manage_Workflow, "Create") === true ? (
            <Route exact path="/documents" component={Document}></Route>
          ) : (
            ""
          )}

          <Route
            exact
            path="/notification"
            component={ContentNotification}
          ></Route>
          {/* <Route exact path="/personal-page" component = {PersonalPage}></Route> */}
          <Route
            exact
            path="/notification/general"
            component={NotifiGenaral}
          ></Route>
          <Route exact path="/notification/my" component={NotifiMy}></Route>
          <Route
            exact
            path="/notification/department"
            component={NotifiDepartment}
          ></Route>
          <Route
            exact
            path="/notification/myword"
            component={NotifiMyWord}
          ></Route>
          <Route
            exact
            path="/notification/create"
            component={CreateNotifi}
          ></Route>

          <Route
            path="/edit-information"
            component={EditInformationUser}
          ></Route>
          {/* <Route component={NotFound} /> */}
        </Switch>
      );
    } else if (this.state.major == 1) {
      return (
        <Switch>
          <Route exact path="/user" component={ContentUserSix}></Route>
          <Route
            exact
            path="/notification"
            component={ContentNotification}
          ></Route>
          <Route
            exact
            path="/mynotification"
            component={ContentMyNotification}
          ></Route>
          <Route
            path="/edit-information"
            component={EditInformationUser}
          ></Route>
          <Route
            exact
            path="/edituser/:id"
            component={AddAndUpdateInforUser}
          ></Route>
          <Route
            exact
            path="/adduser"
            component={AddAndUpdateInforUser}
          ></Route>
          <Route component={NotFound} />
        </Switch>
      );
    } else if (this.state.major == -1) {
      return <Switch>{/* <Route component={NotFound} /> */}</Switch>;
    } else if (this.state.major == 0) {
      return (
        <Switch>
          <Route exact path="/user" component={ContentUserSix}></Route>
          <Route
            exact
            path="/notification"
            component={ContentNotification}
          ></Route>
          <Route
            exact
            path="/mynotification"
            component={ContentMyNotification}
          ></Route>
          <Route
            path="/edit-information"
            component={EditInformationUser}
          ></Route>
          <Route
            exact
            path="/notification"
            component={ContentNotification}
          ></Route>
          {/* <Route exact path="/personal-page" component = {PersonalPage}></Route> */}
          <Route
            exact
            path="/notification/general"
            component={NotifiGenaral}
          ></Route>
          <Route exact path="/notification/my" component={NotifiMy}></Route>
          <Route
            exact
            path="/notification/department"
            component={NotifiDepartment}
          ></Route>
          <Route
            exact
            path="/notification/myword"
            component={NotifiMyWord}
          ></Route>
          <Route
            exact
            path="/notification/create"
            component={CreateNotifi}
          ></Route>

          {/* <Route component={NotFound} /> */}
        </Switch>
      );
    } else if (this.state.major == 11) {
      return (
        <Switch>
          <Route exact path="/user" component={ContentUserSix}></Route>
          <Route
            exact
            path="/notification"
            component={ContentNotification}
          ></Route>
          <Route
            exact
            path="/mynotification"
            component={ContentMyNotification}
          ></Route>
          <Route
            path="/edit-information"
            component={EditInformationUser}
          ></Route>
          <Route
            exact
            path="/notification"
            component={ContentNotification}
          ></Route>
          {/* <Route exact path="/personal-page" component = {PersonalPage}></Route> */}
          <Route
            exact
            path="/notification/general"
            component={NotifiGenaral}
          ></Route>
          <Route exact path="/notification/my" component={NotifiMy}></Route>
          <Route
            exact
            path="/notification/department"
            component={NotifiDepartment}
          ></Route>
          <Route
            exact
            path="/notification/myword"
            component={NotifiMyWord}
          ></Route>
          <Route
            exact
            path="/notification/create"
            component={CreateNotifi}
          ></Route>
          <Route exact path="/department" component={ContentDepartment}></Route>
        </Switch>
      );
    }

    return "";
  };
  render() {
    return (
      <div style={{ background: "#EEEFF3" }}>
        <div className="content-background2">
          <div className="content-main">{this.renderUrl()}</div>
        </div>
      </div>
    );
  }
}
