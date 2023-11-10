import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import { Button, Layout, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppStateType } from '../../redux/reduxStore';
import { logout } from '../../redux/authReducer';
import { LoadingOutlined } from '@ant-design/icons';
import { getIsFetching } from '../../redux/userSelector';

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
  const isFetching = useSelector(getIsFetching);

  const dispatch: AppDispatch = useDispatch();

  const exit = () => {
    dispatch(logout());
    localStorage.setItem('selectedMenuItem', '1'); //выделение меню в профиле
  };

  return (
    <Layout.Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '16px',
        background: '#212121',
        margin: '0 36px 0 12px',
      }}
    >
      <div className={`${s.inner} ${s.active}`}>
        СФЕРА{' '}
        {isFetching ? (
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 26,
                }}
                spin
              />
            }
          />
        ) : null}
      </div>

      <div className={s.block_content}>
        {isAuth ? (
          <>
            <span className={s.login}>{login}</span>
            <Button onClick={exit} type="primary" danger>
              Выйти
            </Button>
          </>
        ) : (
          <NavLink to={'/login'}>
            {' '}
            <Button onClick={exit} type="primary">
              Войти
            </Button>
          </NavLink>
        )}
      </div>
    </Layout.Header>
  );
};
export default HeaderApp;
