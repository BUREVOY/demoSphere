import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

export type MapProps = {
  login: null | string;
  isAuth: boolean;
};
export type DispatchProps = {
  logout: () => void;
};

const Header: React.FC<DispatchProps & MapProps> = (props) => {
  return (
    <header className={s.header}>
      <div className={`${s.inner} ${s.active}`}>СФЕРА</div>

      <div className={s.block_content}>
        {props.isAuth ? (
          <>
            <span className={s.login}>{props.login}</span>
            <button onClick={props.logout}>Выйти</button>
          </>
        ) : (
          <NavLink to={'/login'}>Войти</NavLink>
        )}
      </div>
    </header>
  );
};
export default Header;
