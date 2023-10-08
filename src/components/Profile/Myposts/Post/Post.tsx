import React from 'react';
import s from './Post.module.css';

type Props = {
  message: string;
  likes: number;
};

const Post: React.FC<Props> = (props) => {
  return (
    <div className={s.allPost}>
      <div className={s.postImg}>
        <img
          src="https://klike.net/uploads/posts/2019-03/1551512888_2.jpg"
          alt="крутая аватарка"
        />
      </div>
      <div className={s.postItem}>
        {props.message} likes: {props.likes}
      </div>
    </div>
  );
};

export default Post;
