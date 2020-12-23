import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "./RouterUrl.css"

import ContentUserSix from "../content/ContentSix";

import ContentNotification from "../content/Notification/ContentNotification";
import ContentMyNotification from "../content/ContentMyNotification";
import EditInformationUser from "../admin/EditInformationUser";
import ContentRoles from "../content/ContentRoles";
import ContentPermission from "../content/ContentPermission"
export default class RouterUrl extends Component {
    render() {
        return (
            <div style={{background:"#EEEFF3"}}>
                <div className="content-background2">
                    <div className="content-main">
                        <Route exact path="/crm/admin/user" component = {ContentUserSix}></Route>
                        <Route exact path="/crm/admin/notification" component = {ContentNotification}></Route>
                        <Route exact path="/crm/admin/mynotification" component = {ContentMyNotification}></Route>
                        {/* <Route exact path="/crm/admin/edituser/:id" component = {EditInformationUser}></Route> */}

                        <Route exact path="/crm/admin/roles" component = {ContentRoles}></Route>
                        <Route exact path="/crm/admin/permission" component = {ContentPermission}></Route>
                </div>
                </div>
            </div>
        )
    }
}
