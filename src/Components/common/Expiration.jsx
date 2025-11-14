import React, { useEffect, useRef, useState } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import useExpiryTime from '../../Hooks/Auth/useExpiryTime';

const Expiration = () => {
  const expiryTime = useExpiryTime();
  const intervalId = useRef(null);
  const [remainingTime, setRemainingTime] = useState(() => {
    return expiryTime ? expiryTime.getTime() - Date.now() : 0;
  });

  useEffect(() => {
    if (!expiryTime) return;

    intervalId.current = setInterval(() => {
      const timeLeft = expiryTime.getTime() - Date.now();
      setRemainingTime(timeLeft);

      if (timeLeft <= 0 && intervalId.current) {
        clearInterval(intervalId.current);
      }
    }, 1000);

    return () => clearInterval(intervalId.current);
  }, [expiryTime]);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!expiryTime || remainingTime <= 0) return null;

  return (
    <span
      style={{
        width: 'auto',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '10px',
        fontSize: '14px',
        color: '#f5222d',
        fontWeight: 'bold'
      }}
    >
      <ClockCircleOutlined className='mx-2' />
      {formatTime(remainingTime)}
    </span>
  );
};

export default Expiration;
