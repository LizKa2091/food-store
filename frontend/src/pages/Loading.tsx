import React, { FC } from 'react';

const Loading: FC = () => {
  return (
    <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '2rem'}}>
      Загрузка...
    </div>
  )
};

export default Loading;