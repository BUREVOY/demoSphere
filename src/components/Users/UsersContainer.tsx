import { useSelector } from 'react-redux';
import React from 'react';
import Users from './Users';
import { getIsFetching } from '../../redux/userSelector';
import { Navigate } from 'react-router-dom';
import { getisAuth } from '../../redux/authSelector';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const UsersAPIContainer: React.FC = () => {
  const isFetching = useSelector(getIsFetching);
  const isAuth = useSelector(getisAuth);
  if (!isAuth) return <Navigate to={'/login'} />;

  return (
    <>
      {/* {isFetching ? <Loader /> : null} */}
      {/* {isFetching ? (
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 224,
                position: 'absolute',
                top: '50%',
                left: '50%',
                color: 'white',
              }}
              spin
            />
          }
        />
      ) : null} */}
      <Users />
    </>
  );
};
export default UsersAPIContainer;
