import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./RouterUrl.css"

import ContentNotification from "components/content//Notification/ContentNotification";
import NotifiGenaral from "components/content//Notification/NotifiGenaral";
import NotifiMy from "components/content//Notification/NotifiMy";
import NotifiDepartment from "components/content//Notification/NotifiDepartment";
import NotifiMyWord from "components/content//Notification/NotifiMyWord";
import CreateNotifi from "components/content//Notification/CreateNotifi";
import EditInformationUser from "components/employee/EditInformationUser";
import NotFound from "components/NotFound";
// import PersonalPage from "../employee/personalPage/PersonalPage"
export default class RouterUrl extends Component {
    render() {
        return (
            <div style={{ background: "#EEEFF3" }} >
                 <Switch>
                <Route exact path="/erp/employee/notification" component = {ContentNotification}></Route>
                {/* <Route exact path="/erp/employee/personal-page" component = {PersonalPage}></Route> */}
                <Route exact path="/erp/employee/notification/general" component = {NotifiGenaral}></Route>
                <Route exact path="/erp/employee/notification/my" component = {NotifiMy}></Route>
                <Route exact path="/erp/employee/notification/department" component = {NotifiDepartment}></Route>
                <Route exact path="/erp/employee/notification/myword" component = {NotifiMyWord}></Route>
                <Route exact path="/erp/employee/notification/create" component = {CreateNotifi}></Route>

                <Route path="/erp/employee/edit-information" component = {EditInformationUser}></Route>
                {/* <Route path="/erp/employee/edit-information/:id" component = {EditInformationUser}></Route> */}
                <Route component={NotFound}/>
                </Switch>
            </div>
        )
    }
}
