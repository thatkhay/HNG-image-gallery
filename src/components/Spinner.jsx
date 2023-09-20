import React from 'react';

const ComplexSpinner = () => {
  const spinnerContainerStyle = {
    width: '100px',
    height: '100px',
    position: 'relative',
    animation: 'spin 2s linear infinite',
  };

  const spinnerItemStyle = {
    width: '50px',
    height: '50px',
    position: 'absolute',
    border: '4px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s cubic-bezier(0.25, 1, 0.5, 0.5) infinite',
  };

  const spinnerItemStyles = [];

  const colors = ['#ff5733', '#33ff57', '#5733ff', '#ffff33', '#33ffff', '#ff33ff', '#333333'];

  for (let i = 0; i < 7; i++) {
    const itemStyle = {
      ...spinnerItemStyle,
      animationDelay: `-${0.9 - 0.1 * i}s`,
      transform: `rotate(${45 * i}deg)`,
      borderTopColor: colors[i], // Change the border color
    };
    spinnerItemStyles.push(itemStyle);
  }

  return (
    <div style={spinnerContainerStyle}>
      {spinnerItemStyles.map((style, index) => (
        <div
          key={index}
          style={{
            ...style,
            animation: 'spin 1s cubic-bezier(0.25, 1, 0.5, 0.5) infinite',
          }}
        ></div>
      ))}
      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ComplexSpinner;
