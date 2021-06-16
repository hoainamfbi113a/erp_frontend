import React, { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form'
const TreeTransfer = (props) => {
    const drop = useRef();
    const handleClickItem = (e) => {
        e.target.classList.toggle('down');
        e.target.parentNode.nextSibling.classList.toggle('hidden-transfer');
    }
    return (
        <div>
            {
                props.listSourceTable.length > 0 && props.listSourceTable.map(function (item, index) {
                    var indexParent = props.data.findIndex(x => x.id === item.id);
                    return (
                        <div>
                            <p ref={drop} className='dropdown-toggle-text'>
                                <i className="arrow right" onClick={(e) => handleClickItem(e)}></i>
                                {item.name}
                                <Form.Check checked={indexParent !== -1} value={item.id} onChange={(e) => props.handleChangeTableCheckbox(e, item.actions)} style={{marginLeft:'5px'}} type="checkbox" inline/>
                            </p>
                            <ul className="dropdown-transfer hidden-transfer">
                            {
                                item.actions.length > 0 && item.actions.map(function (item2, index2) {
                                    var isCheck = false
                                    if(indexParent !== -1 && props.data[indexParent].actions.includes(item2.id)){
                                        isCheck = true
                                    }
                                    return (
                                        <div>
                                            <Form.Check checked={isCheck} onChange={(e) => props.handleChangeActionCheckbox(e, indexParent, item.id)} style={{marginLeft:'5px'}}
                                                        type="checkbox"
                                                        value={item2.id}
                                                        label={item2.name}
                                                        inline/>
                                        </div>
                                    );
                                })
                            }
                            </ul>
                        </div>
                    );
                })
            }
        </div>
    );
};
export default TreeTransfer;
