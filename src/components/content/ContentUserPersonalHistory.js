import React, { Component } from 'react'
import { Input } from 'antd';
import { Button } from 'antd';
import {Link}  from 'react-router-dom'
const { Search } = Input;
import TableUserPersonalHistory from "../Table/TableUserPersonalHistory"
import "./Content.css"
 
export default class ContentUserPersonalHistory extends Component {
    render() {
        return (
             <div>
                        <div className="content-top">
                            <div className="content-top-left">
                                <div className="content-top-left-sum-item">
                                    600 nhân viên
                                </div>
                                <Search
                                    placeholder="Tìm kiếm"
                                    allowClear
                                    onSearch={this.onSearch}
                                    style={{ width: 200 }}
                                    className="table-btn-search"
                                />
                            </div>
                            <div className="content-top-right">
                            <Link to="/crm/adduser"> <Button className="btn-add-user">Thêm nhân viên</Button></Link>
                            </div>
                        </div>
                        <TableUserPersonalHistory/>
               
         </div>
        // <div>aaaa</div>
        )
    }
}
