import { useSelector } from 'react-redux';
import React from 'react';
import Users from './Users';
import Loader from '../common/Loader/Loader';
import { getIsFetching } from '../../redux/userSelector';
import { Navigate } from 'react-router-dom';
import { getisAuth } from '../../redux/authSelector';

type Props = {};

const UsersAPIContainer: React.FC<Props> = (props) => {
  const isFetching = useSelector(getIsFetching);
  const isAuth = useSelector(getisAuth);
  if (!isAuth) return <Navigate to={'/login'} />;
  return (
    <>
      {isFetching ? <Loader /> : null}
      <Users />
    </>
  );
};
export default UsersAPIContainer;
