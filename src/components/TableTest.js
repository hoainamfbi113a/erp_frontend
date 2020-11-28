import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../actions/userAction';
class TableTest extends Component {
    componentDidMount() {
        const { userActionCreators } = this.props;
        const { fetchListUser } = userActionCreators;
        fetchListUser();
    }
    render() {
        return (
            <div>
                {/* <table>
                    <tr>
                        <th>Company</th>
                        <th>Contact</th>
                        <th>Country</th>
                    </tr>
                    <tr>
                        <td>Alfreds Futterkiste</td>
                        <td>Maria Anders</td>
                        <td>Germany</td>
                    </tr>
                    <tr>
                        <td>Centro comercial Moctezuma</td>
                        <td>Francisco Chang</td>
                        <td>Mexico</td>
                    </tr>
                    <tr>
                        <td>Ernst Handel</td>
                        <td>Roland Mendel</td>
                        <td>Austria</td>
                    </tr>
                    <tr>
                        <td>Island Trading</td>
                        <td>Helen Bennett</td>
                        <td>UK</td>
                    </tr>
                    <tr>
                        <td>Laughing Bacchus Winecellars</td>
                        <td>Yoshi Tannamuri</td>
                        <td>Canada</td>
                    </tr>
                    <tr>
                        <td>Magazzini Alimentari Riuniti</td>
                        <td>Giovanni Rovelli</td>
                        <td>Italy</td>
                    </tr>
                </table> */}
                aaa
            </div>
        )
    }
}
const mapStateToProps = state => ({
    user: state.userReducer
})
const mapDispatchToProps = dispatch => ({
    userActionCreators: bindActionCreators(userActions,dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(TableTest)