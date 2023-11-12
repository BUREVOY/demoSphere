import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './User.module.css';
import { userItem } from '../../../Types/types';
import { Button, Card } from 'antd';
import Meta from 'antd/es/card/Meta';
// import defaultUser from '../../../assets/images/defautltUser.png';
const defaultUser = require('../../../assets/images/defautltUser.png');

type Props = {
  item: userItem;
  isFollowingInProgress: number[];
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
};

const User: React.FC<Props> = ({
  item,
  isFollowingInProgress,
  unfollow,
  follow,
}) => {
  return (
    <div key={item.id} className={s.singleUser}>
      {/* <div>
        <div>
          <NavLink to={'/profile/' + item.id}>
            <img
              src={item.photos.large !== null ? item.photos.large : defaultUser}
              alt="avatar"
              className={s.img}
            />
          </NavLink>
        </div>
        <div>
          {item.followed ? (
            <button
              disabled={Boolean(
                isFollowingInProgress.find((id) => id === item.id),
              )}
              onClick={() => {
                unfollow(item.id);
              }}
            >
              ОТПИСАТЬСЯ
            </button>
          ) : (
            <button
              disabled={Boolean(
                isFollowingInProgress.find((id) => id === item.id),
              )}
              onClick={() => {
                follow(item.id);
              }}
            >
              ПОДПИСАТЬСЯ
            </button>
          )}
        </div>
      </div>

      <div>
        <div>{item.name}</div>
        <div>{item.status} </div>
      </div> */}

      <Card
        hoverable
        style={{
          width: 280,
          margin: '5px 20px 0 20px',
          color: 'aliceblue',
          background: '#252525',
          border: '0 solid #212121',
        }}
        cover={
          <NavLink to={'/profile/' + item.id}>
            <img
              alt="example"
              src={item.photos.large !== null ? item.photos.large : defaultUser}
              style={{ width: '100%', background: '#252525' }}
            />
          </NavLink>
        }
      >
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ width: '120px', overflow: 'hidden' }}>
              <NavLink to={'/profile/' + item.id}>{item.name}</NavLink>
            </div>
            <div>
              {item.followed ? (
                <Button
                  type="primary"
                  disabled={Boolean(
                    isFollowingInProgress.find((id) => id === item.id),
                  )}
                  onClick={() => {
                    unfollow(item.id);
                  }}
                  danger
                >
                  ОТПИСАТЬСЯ
                </Button>
              ) : (
                <Button
                  type="primary"
                  disabled={Boolean(
                    isFollowingInProgress.find((id) => id === item.id),
                  )}
                  onClick={() => {
                    follow(item.id);
                  }}
                >
                  ПОДПИСАТЬСЯ
                </Button>
              )}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '10px 0 0 0',
            }}
          >
            {item.status}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default User;
