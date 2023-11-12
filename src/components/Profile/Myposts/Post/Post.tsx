import React from 'react';
import s from './Post.module.css';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

type Props = {
  message: string;
  likes: number;
};

const Post: React.FC<Props> = (props) => {
  let handleDelete = () => {};
  return (
    <div className={s.allPost}>
      <div className={s.postImg}>
        <img
          src="https://klike.net/uploads/posts/2019-03/1551512888_2.jpg"
          alt="крутая аватарка"
        />
      </div>
      <div className={s.postItem}>
        <div>{props.message}</div>
        <Button
          icon={<CloseOutlined />}
          style={{ background: '#212121', margin: ' 0 0 0 6px' }}
          onClick={handleDelete}
          danger
        ></Button>
      </div>
    </div>
  );
};

export default Post;
