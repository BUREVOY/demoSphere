import profileReducer from '../../redux/profileReducer';
import { actions } from '../../redux/profileReducer';

test('ProfileReducer correct length after addPost', () => {
  let action = actions.addPost('text');
  let state = {
    postItems: [
      { id: 1, message: 'первый пост!', likes: 3 },
      { id: 2, message: 'я самый крутой', likes: 6 },
      { id: 3, message: 'привет мир', likes: 1 },
    ],
    postText: '',
    profile: null,
    status: '',
  };

  let newState = profileReducer(state, action);

  expect(newState.postItems.length).toBe(4);
});

test('ProfileReducer correct input addPost', () => {
  let action = actions.addPost('text');
  let state = {
    postItems: [
      { id: 1, message: 'первый пост!', likes: 3 },
      { id: 2, message: 'я самый крутой', likes: 6 },
      { id: 3, message: 'привет мир', likes: 1 },
    ],
    postText: '',
    profile: null,
    status: '',
  };

  let newState = profileReducer(state, action);

  expect(newState.postItems[0].message).toBe('text');
});
