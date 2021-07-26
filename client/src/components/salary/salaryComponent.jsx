import React, {useState} from 'react'
import { Breadcrumb, Table } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
const salaryComponent = () => {
    const [salaryMenu, setSalaryMenu] = useState(5);
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ]
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];
    const handleClick = () => {
        setSalaryMenu(1);
    }
    return (
        <div>
            <Breadcrumb >
                <Breadcrumb.Item style={{ marginTop: "40px" }} onClick={handleClick}>Nhóm ngạch</Breadcrumb.Item>
                <Breadcrumb.Item>
                    {/* <a href=""> */}
                    Bậc lương
                    {/* </a> */}
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {/* <a href=""> */}
                    Hệ số lương
                    {/* </a> */}
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Meta lương
                </Breadcrumb.Item>
            </Breadcrumb>
            {salaryMenu === 1 &&
            <Table
             style={{ minHeight: "70vh" }}
             dataSource={dataSource} 
             columns={columns} 
             />}
        </div>
    )
}
export default salaryComponent;
