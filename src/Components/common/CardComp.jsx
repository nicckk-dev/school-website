import React, { useState } from "react";
import { Card, Checkbox, Col, Modal, Radio } from "antd";
import Meta from "antd/es/card/Meta";
import '../../assets/css/style.scss';
import { DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";


export const CardComp = ({ props, data, checkboxBtn = true, deleteBtn = true }) => {

    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState();

    const content = (
        <p>Are you sure you want to delete</p>
    )

    const handleClick = () => {
        props?.onDelete(selected);
        setShowModal(false);
    }

    const handleModal = (e) => {
        setSelected(e.target.id);
        setShowModal(true);
    }

    return (
        <>
            <Modal open={showModal} onCancel={() => setShowModal(false)} onOk={handleClick}>
                {content}
            </Modal>
            <div className="container-fluid">
                <div style={{ width: '100%' }}>
                    {
                        checkboxBtn ? (
                            <Checkbox.Group className="row g-0" onChange={props?.onChange}>
                                {
                                    data?.map((d, index) =>
                                        <div key={index} className={`${props?.span}`} onClick={props?.onClick} style={{ cursor: 'pointer' }}>
                                            <div className="col-card">
                                                <Card>
                                                    <Meta avatar={
                                                        <div className="check-container">
                                                            <Checkbox className="checkbox" value={data[index]} disabled={props?.disabled} />
                                                            <div className="check-img">
                                                            </div>
                                                        </div>
                                                    }
                                                        title={<h3 className="content-align card-title">{d.drName}</h3>}
                                                        description={(
                                                            <>
                                                                <h3 className="content-align text-uppercase card-content">{d.designation}</h3>
                                                                <h3 className="content-align card-content mt-1">{d.drclass}</h3>
                                                                <h4 className="content-align card-content mt-1">{d.pcode}</h4>
                                                                <h3 className="content-align card-content mt-1">{d.mslCode}</h3>
                                                            </>
                                                        )}
                                                    />
                                                </Card>
                                                <div className="content-footer d-flex justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <i className="fa-solid fa-location-dot"></i>
                                                        <h4 className="content-align">{d.location}</h4>
                                                    </div>
                                                    <div className={`${deleteBtn ? 'd-block' : 'd-none'}`} onClick={(e) => handleModal(e)}>
                                                        <i className="fa-solid fa-trash fs-6" id={index}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </Checkbox.Group>
                        )
                            :
                            (
                                <Radio.Group className="row g-0" onChange={props?.onChange}>
                                    {data?.map((d, index) =>
                                        <Col span={props?.span} key={index} className="col-style" onClick={props?.onClick}>
                                            <div className="col-card">
                                                <Card>
                                                    <Meta avatar={
                                                        <div className="check-container">
                                                            <Radio className="radio" value={data[index]} />
                                                            <div className="radio-img">
                                                            </div>
                                                        </div>
                                                    }
                                                        title={<h3 className="content-align card-title">{d.drName}</h3>}
                                                        description={(
                                                            <>
                                                                <h3 className="content-align text-uppercase card-content">{d.designation}</h3>
                                                                <h3 className="content-align card-content mt-1">{d.drclass}</h3>
                                                                <h4 className="content-align card-content mt-1">{d.pcode}</h4>
                                                                <h3 className="content-align card-content mt-1">{d.mslCode}</h3>
                                                            </>
                                                        )}
                                                    />
                                                </Card>
                                                <div className="content-footer d-flex justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <i className="fa-solid fa-location-dot"></i>
                                                        <h4 className="content-align">{d.location}</h4>
                                                    </div>
                                                    <div className={`${deleteBtn ? 'd-block' : 'd-none'}`}>
                                                        <DeleteOutlined className="fs-6" onClick={() => setShowModal(true)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    )}
                                </Radio.Group>
                            )
                    }
                </div>
            </div>

        </>
    )
}

CardComp.propTypes = {
    onDelete: PropTypes.func,
    onChange: PropTypes.func,
    data: PropTypes.array,
    onClick: PropTypes.func,
    span: PropTypes.any,
    disabled: PropTypes.any,

}