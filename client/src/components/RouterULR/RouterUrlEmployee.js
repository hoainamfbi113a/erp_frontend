import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "./RouterUrl.css"

import ContentNotification from "../content//Notification/ContentNotification";
import NotifiGenaral from "../content//Notification/NotifiGenaral";
import NotifiMy from "../content//Notification/NotifiMy";
import NotifiDepartment from "../content//Notification/NotifiDepartment";
import NotifiMyWord from "../content//Notification/NotifiMyWord";
import CreateNotifi from "../content//Notification/CreateNotifi";
import EditInformationUser from "../employee/EditInformationUser";
import PersonalPage from "../employee/personalPage/PersonalPage"
export default class RouterUrl extends Component {
    render() {
        return (
            <div style={{ background: "#EEEFF3" }} >
                <Route exact path="/crm/employee/notification" component = {ContentNotification}></Route>
                <Route exact path="/crm/employee/personal-page" component = {PersonalPage}></Route>
                <Route exact path="/crm/employee/notification/general" component = {NotifiGenaral}></Route>
                <Route exact path="/crm/employee/notification/my" component = {NotifiMy}></Route>
                <Route exact path="/crm/employee/notification/department" component = {NotifiDepartment}></Route>
                <Route exact path="/crm/employee/notification/myword" component = {NotifiMyWord}></Route>
                <Route exact path="/crm/employee/notification/create" component = {CreateNotifi}></Route>

                <Route path="/crm/employee/edit-information" component = {EditInformationUser}></Route>
                {/* <Route path="/crm/employee/edit-information/:id" component = {EditInformationUser}></Route> */}
            </div>
        )
    }
}
