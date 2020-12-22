import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "./RouterUrl.css"
import Adduser1 from "../Adduser/Adduser1"
import AddUserBase from "../Adduser/AddUserBase"

import ContentUserSix from "../content/ContentSix";
import AddUserSix from "../Adduser/AddSix"
import EditSix from "../Adduser/EditSix"
import EditInfor from "../Adduser/EditSix"

import ContentNotification from "../content/Notification/ContentNotification";
import ContentMyNotification from "../content/ContentMyNotification";
import EditInformationUser from "../admin/EditInformationUser";
export default class RouterUrl extends Component {
    render() {
        return (
            <div style={{background:"#EEEFF3"}}>
                <div className="content-background2">
                    <div className="content-main">
                        <Route exact path="/crm/admin/adduser" component = {Adduser1}></Route>
                        <Route exact path="/crm/admin/addUserBase" component = {AddUserBase}></Route>
                        <Route exact path="/crm/admin/user/edit/:id" component = {AddUserBase}></Route>
                        
                        <Route exact path="/crm/admin/user" component = {ContentUserSix}></Route>
                        <Route exact path="/crm/admin/addUserSix" component = {AddUserSix}></Route>
                        <Route exact path="/crm/admin/user/edit/:id" component = {EditInfor}></Route>

                        <Route exact path="/crm/admin/notification" component = {ContentNotification}></Route>
                        <Route exact path="/crm/admin/mynotification" component = {ContentMyNotification}></Route>
                        <Route exact path="/crm/admin/edituser/:id" component = {EditInformationUser}></Route>
                </div>
                </div>
            </div>
        )
    }
}
