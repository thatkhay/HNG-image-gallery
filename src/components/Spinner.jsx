import React from 'react';

const Spinner = () => {
  const spinnerStyle = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    spinner: {
      border: '6px solid rgba(0, 0, 0, 0.3)',
      borderTop: '6px solid #3498db',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      animation: 'spin 1s linear infinite',
    },
  };

  return (
    <div style={spinnerStyle.container}>
      <div style={spinnerStyle.spinner}></div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Spinner;
