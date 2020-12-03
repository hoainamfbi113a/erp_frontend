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

import ContentNotification from "../content/ContentNotification";
import ContentMyNotification from "../content/ContentMyNotification";
export default class RouterUrl extends Component {
    render() {
        return (
            <div style={{background:"#E5E5E5"}}>
                <div className="content-background2">
                    <div className="content-main">
                        <Route exact path="/crm" component = {ContentUserBase}></Route>
                        <Route exact path="/crm/user/base" component = {ContentUserBase}></Route>
                        <Route exact path="/crm/user/degree" component = {ContentUserDegree}></Route>
                        <Route exact path="/crm/user/department" component = {ContentUserDepartment}></Route>
                        <Route exact path="/crm/user/journalist-card" component = {ContentUserJournalistCard}></Route>
                        <Route exact path="/crm/user/personal-history" component = {ContentUserPersonalHistory}></Route>
                        <Route exact path="/crm/user/work-object" component = {ContentUserWorkObject}></Route>
                        <Route exact path="/crm/profileone" component = {ProfileOne}></Route> 
                        <Route exact path="/crm/adduser" component = {Adduser1}></Route>
                        <Route exact path="/crm/addUserBase" component = {AddUserBase}></Route>
                        <Route exact path="/crm/user/edit/:id" component = {AddUserBase}></Route>

                        <Route exact path="/crm/usersix" component = {ContentUserSix}></Route>
                        <Route exact path="/crm/addUserSix" component = {AddUserSix}></Route>
                        <Route exact path="/crm/usersix/edit/:id" component = {AddUserSix}></Route>

                        <Route exact path="/crm/notification" component = {ContentNotification}></Route>
                        <Route exact path="/crm/mynotification" component = {ContentMyNotification}></Route>
                </div>
                </div>
            </div>
        )
    }
}
