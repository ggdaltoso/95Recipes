import React, { useEffect, useState } from 'react';
import { Frame } from '@react95/core/dist';

const Clock = () => {
  const [timer, setTimer] = useState('');

  useEffect(() => {
    function checkTime(i) {
      return i < 10 ? `0${i}` : i;
    }

    const interval = setInterval(() => {
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      setTimer(`${checkTime(h)}:${checkTime(m)}`);
    });

    return () => clearInterval(interval);
  });

  return (
    <Frame
      boxShadow="in"
      bg="transparent"
      p={0}
      px={6}
      py={2}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {timer}
    </Frame>
  );
};

export default Clock;
