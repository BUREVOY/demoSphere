import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div
      style={{
        color: 'red',
        textAlign: 'center',
        backgroundColor: '#2400C7',
        fontFamily: 'Russo One,  sans-serif',
        fontSize: '26px',
      }}
    >
      <h1>Ошибка 404. неправильный URL . </h1>
    </div>
  );
};

export default NotFound;
