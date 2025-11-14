import React from "react";
import { InputComp } from "../../common/FormComponent";
import { Button, Form } from "antd";
import PropTypes from "prop-types";


export const ComplianceForm = ({ props }) => {
    return (
        <div className="row my-2">
            <Form name="speakercomplianceform" onFinish={props.handleFinish}>
                <div className="row">
                    <div className={'col-lg-3 col-md-3'}>
                        <div className="FormStyle input-resp">
                            <label className="FormLabel" htmlFor="input">{props.inputLabel}</label>
                            <InputComp props={{
                                type: 'text', name: props.name, size: 'large',
                                style: { width: '100%' }, required: props.required, message: props.message
                            }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 mt-1">
                        <Form.Item>
                            <Button type="primary" block htmlType="submit" size="large">{props.btnText}</Button>
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </div>
    )
}

ComplianceForm.propTypes = {
    props: PropTypes.any,
    handleFinish: PropTypes.any,
    inputLabel: PropTypes.any,
    name: PropTypes.any,
    message: PropTypes.any,
    required: PropTypes.any,
    btnText: PropTypes.any,
};