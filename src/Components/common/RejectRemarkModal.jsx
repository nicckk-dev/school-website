import React from 'react';
import { Modal, Form, Input } from 'antd';
import PropTypes from 'prop-types';

const { TextArea } = Input;

const RejectRemarkModal = ({
    open,
    title,
    okText,
    cancelText,
    cancelButtonProps = {}, // Allow dynamic control over cancel button styles
    onOk,                   // Callback for handling the OK action
    onCancel,               // Callback for handling the Cancel action
    form,
    width,
    initialValues = {},
    textAreaRows = 3,
    layout,
    name,
    label  = "Reason"
}) => {

    return (
        <Modal
            open={open}
            width={width}
            centered
            title={title}
            okText={okText}
            cancelText={cancelText}
            cancelButtonProps={cancelButtonProps}  // Dynamically controlled cancel button
            className="paddingZeromodal colorHeadermodal"
            onCancel={onCancel}
            onOk={onOk}
        >
            <div className="RemarkModalbody FormStyleError">
                <Form
                    form={form}
                    layout={layout}
                    name="form_in_modal"
                    initialValues={initialValues}
                >
                    <Form.Item
                        name={name}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the remarks!',
                                validator: (_, value) => {
                                    const trimmedValue = value?.trim();
                                    if (!trimmedValue) {
                                        return Promise.reject(new Error('Remarks cannot be empty or just spaces.'));
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <label htmlFor="Qualification" className="FormLabel">{label || "Reason"}  </label>
                        <TextArea rows={textAreaRows}
                            onBlur={(e) => {
                                const trimmedValue = e.target.value.trim();
                                form.setFieldValue(name, trimmedValue);
                            }}
                        />

                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

RejectRemarkModal.propTypes = {
    open: PropTypes.any,
    title: PropTypes.any,
    okText: PropTypes.any,
    cancelText: PropTypes.any,
    cancelButtonProps: PropTypes.any,
    onOk: PropTypes.any,
    onCancel: PropTypes.any,
    width: PropTypes.any,
    initialValues: PropTypes.any,
    textAreaRows: PropTypes.any,
    layout: PropTypes.any,
    name: PropTypes.any,
    form: PropTypes.any,
    label:PropTypes.any,
}

export default RejectRemarkModal;
