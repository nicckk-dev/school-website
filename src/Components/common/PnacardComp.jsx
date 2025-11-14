import React from 'react';
import { Input, Form } from 'antd';
import PropTypes from 'prop-types';

const PanCardInput = ({ name = 'panCard', value, onChange, disabled }) => {
  return (
    <Form.Item
      name={name}
      rules={[
        { required: true, message: 'PAN card is required' },
        {
          pattern: /^[a-zA-Z]{5}[0-9]{4}[A-Z]{1}$/,
          message: 'Invalid PAN card format'
        },
      ]}
      style={{ marginBottom: '16px' }}
    >
      <Input
        // placeholder="Enter your PAN Card"
        disabled={disabled}
        value={value}
        onChange={onChange}
        maxLength={10}
      />
    </Form.Item>
  );
};

PanCardInput.propTypes = {
  name: PropTypes.any,
  onChange: PropTypes.any,
  disabled: PropTypes.any,
  value: PropTypes.any,
}
export default PanCardInput;
