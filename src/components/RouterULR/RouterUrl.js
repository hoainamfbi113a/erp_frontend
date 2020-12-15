import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProfileOne from "../Profile/ProfileOne"
import "./RouterUrl.css"
import Adduser1 from "../Adduser/Adduser1"
import AddUserBase from "../Adduser/AddUserBase"
import ContentC from "../content/ContentC";
import ContentUserBase from "../content/ContentUserBase";
import ContentUserDegree from "../content/ContentUserDegree";
import ContentUserDepartment from "../content/ContentUserDepartment";
import ContentUserJournalistCard from "../content/ContentUserJournalistCard";
import ContentUserPersonalHistory from "../content/ContentUserPersonalHistory";
import ContentUserWorkObject from "../content/ContentUserWorkObject";

import ContentUserSix from "../content/ContentSix";
import AddUserSix from "../Adduser/AddSix"
import EditSix from "../Adduser/EditSix"
import EditInfor from "../Adduser/EditSix"
import EditInforEmployee from "../Adduser/EditSixUser"

import ContentNotification from "../content/Notification/ContentNotification";
import ContentMyNotification from "../content/ContentMyNotification";
export default class RouterUrl extends Component {
    render() {
        return (
            <div style={{background:"#EEEFF3"}}>
                <div className="content-background2">
                    <div className="content-main">
                        <Route exact path="/crm/admin" component = {ContentUserBase}></Route>
                        <Route exact path="/crm/admin/user/base" component = {ContentUserBase}></Route>
                        <Route exact path="/crm/admin/user/degree" component = {ContentUserDegree}></Route>
                        <Route exact path="/crm/admin/user/department" component = {ContentUserDepartment}></Route>
                        <Route exact path="/crm/admin/user/journalist-card" component = {ContentUserJournalistCard}></Route>
                        <Route exact path="/crm/admin/user/personal-history" component = {ContentUserPersonalHistory}></Route>
                        <Route exact path="/crm/admin/user/work-object" component = {ContentUserWorkObject}></Route>
                        <Route exact path="/crm/admin/profileone" component = {ProfileOne}></Route> 
                        <Route exact path="/crm/admin/adduser" component = {Adduser1}></Route>
                        <Route exact path="/crm/admin/addUserBase" component = {AddUserBase}></Route>
                        <Route exact path="/crm/admin/user/edit/:id" component = {AddUserBase}></Route>
                        
                        <Route exact path="/crm/admin/user" component = {ContentUserSix}></Route>
                        <Route exact path="/crm/admin/addUserSix" component = {AddUserSix}></Route>
                        <Route exact path="/crm/admin/user/edit/:id" component = {EditInfor}></Route>

                        <Route exact path="/crm/admin/notification" component = {ContentNotification}></Route>
                        <Route exact path="/crm/admin/mynotification" component = {ContentMyNotification}></Route>

                        {/* <Route exact path="/crm/employee/edit" component = {EditInforEmployee}></Route> */}
                        
                </div>
                </div>
            </div>
        )
    }
}
