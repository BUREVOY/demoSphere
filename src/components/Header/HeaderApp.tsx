import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import { Button, Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppStateType } from '../../redux/reduxStore';
import { logout } from '../../redux/authReducer';

export type MapProps = {
  login: null | string;
  isAuth: boolean;
};
export type DispatchProps = {
  logout: () => void;
};

const HeaderApp: React.FC = () => {
  let login = useSelector((state: AppStateType) => state.auth.login);
  let isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

  const dispatch: AppDispatch = useDispatch();

  const exit = () => {
    dispatch(logout());
  };

  return (
    <Layout.Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div className={`${s.inner} ${s.active}`}>СФЕРА</div>

      <div className={s.block_content}>
        {isAuth ? (
          <>
            <span className={s.login}>{login}</span>
            <Button type={'default'} onClick={exit}>
              Выйти
            </Button>
          </>
        ) : (
          <NavLink to={'/login'}>Войти</NavLink>
        )}
      </div>
    </Layout.Header>
  );
};
export default HeaderApp;
