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
                {/* <Route exact path="/notification" component = {ContentNotification}></Route> */}
                {/* <Route exact path="/personal-page" component = {PersonalPage}></Route> */}
                {/* <Route exact path="/notification/general" component = {NotifiGenaral}></Route> */}
                {/* <Route exact path="/notification/my" component = {NotifiMy}></Route> */}
                {/* <Route exact path="/notification/department" component = {NotifiDepartment}></Route> */}
                {/* <Route exact path="/notification/myword" component = {NotifiMyWord}></Route> */}
                {/* <Route exact path="/notification/create" component = {CreateNotifi}></Route> */}

                {/* <Route path="/edit-information" component = {EditInformationUser}></Route> */}
                {/* <Route component={NotFound}/> */}
                </Switch>
            </div>
        )
    }
}
