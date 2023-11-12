import { ProfileAPI } from './../api/profile-api';
import { FormAction, stopSubmit } from 'redux-form';
import { photosType, profileType } from '../Types/types';
import { ThunkAction } from 'redux-thunk';
import { AppStateType, InferActionsTypes } from './reduxStore';

type initialStateType = {
  postItems: {
    id: number;
    message: string;
    likes: number | null;
  }[];

  profile: null | profileType;
  status: string;
  postText: string;
};

let initialState: initialStateType = {
  postItems: [
    { id: 1, message: 'первый пост!', likes: 3 },
    { id: 2, message: 'я самый крутой', likes: 6 },
    { id: 3, message: 'привет мир', likes: 1 },
  ],
  postText: '',
  profile: null,
  status: '',
};

export default function profileReducer(
  state = initialState,
  action: ActionTypes,
): initialStateType {
  switch (action.type) {
    case 'ADD_POST': {
      return {
        ...state,
        postItems: [
          {
            id: 5,
            message: action.mypostForm,
            likes: 0,
          },
          ...state.postItems,
        ],
      };
    }

    case 'SET_USER_PROFILE': {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case 'SET_STATUS': {
      return {
        ...state,
        status: action.status,
      };
    }

    case 'SET_AVATAR': {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photo } as profileType,
      };
    }

    default:
      return state;
  }
}

type ActionTypes = InferActionsTypes<typeof actions>;

export const actions = {
  addPost: (mypostForm: string) =>
    ({
      type: 'ADD_POST',
      mypostForm,
    }) as const,
  deletePost: (id: number) =>
    ({
      type: 'DELETE_POST',
      id,
    }) as const,

  setUserProfile: (profile: profileType) =>
    ({
      type: 'SET_USER_PROFILE',
      profile: profile,
    }) as const,

  updateStatus: (status: string) =>
    ({
      type: 'SET_STATUS',
      status: status,
    }) as const,

  savePhoto: (photo: photosType) =>
    ({
      type: 'SET_AVATAR',
      photo: photo,
    }) as const,
};

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionTypes | FormAction
>;

export const getUserProfile =
  (userId: number): ThunkType =>
  async (dispatch) => {
    try {
      let response = await ProfileAPI.getProfile(userId);
      dispatch(actions.setUserProfile(response.data));
    } catch (error: any) {
      console.log(error.message);
    }
  };

export const getStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    try {
      let response = await ProfileAPI.getStatus(userId);
      dispatch(actions.updateStatus(response.data));
    } catch (error: any) {
      console.log(error.message);
    }
  };

export const setStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    try {
      dispatch(actions.updateStatus(status));
      let response = await ProfileAPI.setStatus(status);
      if (response.data.resultCode === 0) {
        dispatch(actions.updateStatus(status));
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

export const uploadPhoto =
  (photo: photosType): ThunkType =>
  async (dispatch) => {
    try {
      let response = await ProfileAPI.uploadPhoto(photo);

      if (response.data.resultCode === 0) {
        dispatch(actions.savePhoto(response.data.data.photos));
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
export const saveProfile =
  (form: profileType): ThunkType =>
  async (dispatch, getState) => {
    try {
      const userId = getState().auth.userId;

      let response = await ProfileAPI.saveProfile(form);

      if (response.data.resultCode === 0) {
        if (userId != null) {
          dispatch(getUserProfile(userId));
        } else {
          throw new Error('User id is null');
        }
      } else {
        let errorMessage =
          response.data.messages.length > 0
            ? response.data.messages[0]
            : 'Something wrong, I can feel it';

        dispatch(stopSubmit('edit-profile', { _error: errorMessage }));
        return Promise.reject(errorMessage);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
