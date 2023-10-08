import React from 'react';
import { connect } from 'react-redux';
import Header, { DispatchProps, MapProps } from './Header';
import { logout } from '../../redux/authReducer';
import { AppStateType } from '../../redux/reduxStore';

const HeaderContainer: React.FC<MapProps & DispatchProps> = (props) => {
  return <Header {...props} />;
};

let mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};

export default connect<MapProps, DispatchProps, {}, AppStateType>(
  mapStateToProps,
  {
    logout,
  },
)(HeaderContainer);
