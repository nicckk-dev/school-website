import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoginSpinLoader = ({ message = "Logging in..." }) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

  return (
    <div className="login-spin-loader">
      <div className="loader-content">
        <Spin indicator={antIcon} />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default LoginSpinLoader;
