import React from 'react'
import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
const salaryComponent = () => {
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item>Nhóm ngạch</Breadcrumb.Item>
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
        </div>
    )
}
export default salaryComponent;
