import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './User.module.css';
import { userItem } from '../../../Types/types';
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
      <div>
        <div>
          <NavLink to={'/profile/' + item.id}>
            <img
              src={item.photos.small !== null ? item.photos.small : defaultUser}
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
      </div>
    </div>
  );
};

export default User;
