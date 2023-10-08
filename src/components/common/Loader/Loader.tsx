import React from 'react';
import s from './Loader.module.css';

const loader = require('./../../../assets/images/gradient-5812.gif');

type Props = {};

const Loader: React.FC<Props> = (props) => {
  return (
    <div className={s.container}>
      <img src={loader} alt="loading" className={s.img} />
    </div>
  );
};

export default Loader;
