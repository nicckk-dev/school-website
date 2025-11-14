import React from 'react';
import { Input, Form } from 'antd';
import PropTypes from 'prop-types';

const IfscCodeInput = ({ name = 'ifscCode', value, onChange, disabled,maxLength,pattern }) => {
  return (
    <Form.Item
      //   label="IFSC Code"
      name={name}
      rules={[
        { required: true, message: 'IFSC code is required' },
        // { pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/, message: 'Invalid IFSC code format' },
        { 
          // pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/, 
          pattern:"^[a-zA-Z0-9]+$",
          // pattern:pattern,
          message: 'Invalid IFSC code format' },
      ]}
      style={{ marginBottom: '16px' }}
    >
      <Input
        // placeholder="Enter your IFSC Code"
        disabled={disabled}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        // pattern={pattern}
        // maxLength={11}
      />
    </Form.Item>
  );
};

IfscCodeInput.propTypes = {
  name: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.any,
  disabled: PropTypes.any,
}

export default IfscCodeInput;


