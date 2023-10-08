import React from 'react';
import MypostForm, { AddPostType, PropsForm } from './MypostForm/MypostForm';
import s from './Myposts.module.css';
import Post from './Post/Post';
import { reduxForm } from 'redux-form';

const MypostFormRedux = reduxForm<AddPostType, PropsForm>({
  form: 'mypostForm',
})(MypostForm);

//React.memo запоминает предыдущие пропсы и если они не равны новым, рисует компоненту

export type MapProps = {
  postItems: {
    id: number;
    message: string;
    likes: number;
  }[];
};
export type DispatchProps = {
  addPost: (post: string) => void;
};

let Myposts: React.FC<MapProps & DispatchProps> = React.memo((props) => {
  let postElements = props.postItems.map((post) => (
    <Post message={post.message} likes={post.likes} key={post.id} />
  ));

  function addPost(values: AddPostType) {
    props.addPost(values.mypostForm);
  }

  return (
    <div>
      <div className={s.postItem}>мои посты</div>
      <MypostFormRedux onSubmit={addPost} />
      {postElements}
    </div>
  );
});

export default Myposts;
