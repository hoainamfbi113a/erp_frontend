import React, { Component } from 'react'
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import docCookies from "doc-cookies";
import "./RouterUrl.css"

import ContentUserSix from "../content/ContentSix";
import {
    getPermissionUser,
    slugPermission,
  } from "../../apis/authenticationApi";
import ContentNotification from "../content/Notification/ContentNotification";
import ContentMyNotification from "../content/ContentMyNotification";
import addInformationUser from "../admin/addInformationUser";
import ContentRoles from "../content/ContentRoles";
import ContentPermission from "../content/ContentPermission"
import ContentParts from "../content/ContentParts"
import ContentPosition from "../content/ContentPosition"
import ContentDepartment from "../content/ContentDepartment"
import NotFound from "../../components/NotFound";
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
                        <Route exact path="/erp/admin/edituser/:id" component = {addInformationUser}></Route>
                        <Route exact path="/erp/admin/adduser" component = {addInformationUser}></Route>
                        <Route exact path="/erp/admin/roles" component = {ContentRoles}></Route>
                        <Route exact path="/erp/admin/permission" component = {ContentPermission}></Route>
                        <Route exact path="/erp/admin/parts" component = {ContentParts}></Route>
                        <Route exact path="/erp/admin/position" component = {ContentPosition}></Route>
                        <Route exact path="/erp/admin/department" component = {ContentDepartment}></Route>
                        <Route  component={NotFound}/>
                </Switch>
            )
        }
        else if(this.state.major == 8 && this.state.isTrue === false){
            <Switch>
            <Route exact path="/erp/admin/user" component = {ContentUserSix}></Route>
            <Route exact path="/erp/admin/notification" component = {ContentNotification}></Route>
            <Route exact path="/erp/admin/mynotification" component = {ContentMyNotification}></Route>
            <Route exact path="/erp/admin/edituser/:id" component = {addInformationUser}></Route>
            <Route exact path="/erp/admin/adduser" component = {addInformationUser}></Route>
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
