import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "./RouterUrl.css"

import ContentUserSix from "../content/ContentSix";

import ContentNotification from "../content/Notification/ContentNotification";
import ContentMyNotification from "../content/ContentMyNotification";
import EditInformationUser from "../admin/EditInformationUser";
import addInformationUser from "../admin/addInformationUser";
import ContentRoles from "../content/ContentRoles";
import ContentPermission from "../content/ContentPermission"
import ContentParts from "../content/ContentParts"
import ContentPosition from "../content/ContentPosition"
import ContentDepartment from "../content/ContentDepartment"
export default class RouterUrl extends Component {
    render() {
        return (
            <div style={{background:"#EEEFF3"}}>
                <div className="content-background2">
                    <div className="content-main">
                        <Route exact path="/crm/admin/user" component = {ContentUserSix}></Route>
                        <Route exact path="/crm/admin/notification" component = {ContentNotification}></Route>
                        <Route exact path="/crm/admin/mynotification" component = {ContentMyNotification}></Route>
                        <Route exact path="/crm/admin/edituser/:id" component = {addInformationUser}></Route>
                        <Route exact path="/crm/admin/adduser" component = {addInformationUser}></Route>

                        <Route exact path="/crm/admin/roles" component = {ContentRoles}></Route>
                        <Route exact path="/crm/admin/permission" component = {ContentPermission}></Route>
                        <Route exact path="/crm/admin/parts" component = {ContentParts}></Route>
                        <Route exact path="/crm/admin/position" component = {ContentPosition}></Route>
                        <Route exact path="/crm/admin/department" component = {ContentDepartment}></Route>
                </div>
                </div>
            </div>
        )
    }
}
