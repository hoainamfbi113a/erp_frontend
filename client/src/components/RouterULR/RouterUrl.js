import docCookies from "doc-cookies";
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  getPermissionUser
} from "../../apis/authenticationApi";
import NotFound from "../../components/NotFound";
import AddAndUpdateInforUser from "../admin/AddAndUpdateInforUser";
import Workflow from '../admin/workflow/Workflow';
import ContentDepartment from "../content/ContentDepartment";
import ContentMyNotification from "../content/ContentMyNotification";
import ContentParts from "../content/ContentParts";
import ContentPermission from "../content/ContentPermission";
import ContentPosition from "../content/ContentPosition";
import ContentRoles from "../content/ContentRoles";
import ContentUserSix from "../content/ContentSix";
import ContentNotification from "../content/Notification/ContentNotification";
import "./RouterUrl.css";

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
    componentDidMount = async () =>{
        await this.fetchPermission();
        this.getMajor();
    }
    fetchPermission = async () => {
        const user_id = docCookies.getItem("user_id");
        const data = await getPermissionUser(user_id);
        this.setState({
          dataPermission: data,
        });
      };
      getMajor = () => {
        // let dataSlug = this.state.slugPermission;
        let dataPermission = this.state.dataPermission;
        if(dataPermission.permissions.length >7 && dataPermission.permissions[8].actions[4]=="Confirm"){
          this.setState({
            major:8,
            isTrue:true
          })
        }
       else if(dataPermission.permissions>8){
          this.setState({
            major:1,
          })
        }
      else {
          this.setState({
              major:-1
          })
      }

      };
    renderUrl = () =>{
        if(this.state.major == 8 && this.state.isTrue === true ){
            return (
                <Switch>
                        <Route exact path="/erp/admin/user" component = {ContentUserSix}></Route>
                        <Route exact path="/erp/admin/notification" component = {ContentNotification}></Route>
                        <Route exact path="/erp/admin/mynotification" component = {ContentMyNotification}></Route>
                        <Route exact path="/erp/admin/edituser/:id" component = {AddAndUpdateInforUser}></Route>
                        <Route exact path="/erp/admin/adduser" component = {AddAndUpdateInforUser}></Route>
                        <Route exact path="/erp/admin/roles" component = {ContentRoles}></Route>
                        <Route exact path="/erp/admin/permission" component = {ContentPermission}></Route>
                        <Route exact path="/erp/admin/parts" component = {ContentParts}></Route>
                        <Route exact path="/erp/admin/position" component = {ContentPosition}></Route>
                        <Route exact path="/erp/admin/department" component = {ContentDepartment}></Route>
                        <Route exact path="/erp/admin/workflow" component = {Workflow}></Route>
                        <Route  component={NotFound}/>
                </Switch>
            )
        }
        else if(this.state.major == 8 && this.state.isTrue === false){
            <Switch>
            <Route exact path="/erp/admin/user" component = {ContentUserSix}></Route>
            <Route exact path="/erp/admin/notification" component = {ContentNotification}></Route>
            <Route exact path="/erp/admin/mynotification" component = {ContentMyNotification}></Route>
            <Route exact path="/erp/admin/edituser/:id" component = {AddAndUpdateInforUser}></Route>
            <Route exact path="/erp/admin/adduser" component = {AddAndUpdateInforUser}></Route>
            <Route  component={NotFound}/>
            </Switch>
        }
        else if(this.state.major == -1)
         return (
            <Switch>
            <Route  component={NotFound}/>
            </Switch>
        )
        return "";
    }
    render() {
        return (
            <div style={{background:"#EEEFF3"}}>
                <div className="content-background2">
                    <div className="content-main">
                    {this.renderUrl()}
                </div>
                </div>
            </div>
        )
    }
}
