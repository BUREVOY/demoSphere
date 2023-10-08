import React from 'react';
import s from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';

type Props = {
  id: number;
  name: string;
};

const DialogItem: React.FC<Props> = (props) => {
  return (
    <NavLink to={'/dialogs/' + props.id} className={s.dialog}>
      {props.name}
    </NavLink>
  );
};

export default DialogItem;
