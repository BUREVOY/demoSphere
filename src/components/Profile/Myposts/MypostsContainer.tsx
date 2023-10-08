import { connect } from 'react-redux';
// import { addPost } from '../../../redux/profileReducer';
import Myposts from './Myposts';
import { actions } from '../../../redux/profileReducer';
import { AppStateType } from '../../../redux/reduxStore';
import { MapProps, DispatchProps } from './Myposts';
const addPost = actions.addPost;

let mapStateToProps = (state: AppStateType) => {
  return {
    postItems: state.profilePage.postItems,
    postText: state.profilePage.postText,
  } as MapProps;
};

let MypostsContainer = connect<MapProps, DispatchProps, {}, AppStateType>(
  mapStateToProps,
  {
    addPost,
  },
)(Myposts);

export default MypostsContainer;
