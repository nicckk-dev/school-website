import React from 'react';
import { Input, Form } from 'antd';
import PropTypes from 'prop-types';

const BankAccountInput = ({ name = 'bankAccount', value, onChange, disabled }) => {
  return (
    <Form.Item
      //   label="Bank Account Number"
      name={name}
      rules={[
        { required: true, message: 'Bank account number is required' },
        { pattern: /^\d{9,18}$/, message: 'Invalid bank account number' },
      ]}
      style={{ marginBottom: '16px' }}
    >
      <Input
        // placeholder="Enter your Bank Account Number"
        disabled={disabled}
        value={value}
        onChange={onChange}
        maxLength={18}
      />
    </Form.Item>
  );
};


export default BankAccountInput;

BankAccountInput.propTypes= {
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.any,
  disabled: PropTypes.any,

}
