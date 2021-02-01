import React, { Component } from 'react';
import './Globading.css'
import { Spin, Space } from 'antd';
import * as uiAction from "actions/ui"
import {bindActionCreators} from 'redux';
import {connect} from "react-redux"
class Globading extends Component {
    render() {
        const {showLoading} = this.props;
        // const showLoading = true;
        let htmlLoading = null;
        if(showLoading){
            htmlLoading = (
                <div className="GlobalLoading">
                      <Spin className="icon" />
                </div>
            )
        }
        return htmlLoading;
        // return ""
    }
}
const mapStateToProps = (state) =>{
    return {
        showLoading: state.ui.showLoading // combine is ui -> reducer
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        uiAction:bindActionCreators(uiAction,dispatch )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Globading)