import { AuthAPI } from './../api/auth-api';
import { ThunkAction } from 'redux-thunk';
import { ResultCodes } from '../api/api';
import { SecurityAPI } from '../api/security-api';
import { FormAction, stopSubmit } from 'redux-form';
import { AppStateType, InferActionsTypes } from './reduxStore';

export type initialStateType = {
  userId: null | number;
  email: null | string;
  login: null | string;
  isAuth: boolean;
  captchaUrl: null | string;
};

let initialState: initialStateType = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

export default function authReducer(
  state = initialState,
  action: ActionTypes,
): initialStateType {
  switch (action.type) {
    case 'SET_USER_DATA': {
      return {
        ...state,
        ...action.data,
        isAuth: action.data.isAuth,
      };
    }
    case 'GET_CAPTCHA_URL': {
      return {
        ...state,
        // ...action.data,
        captchaUrl: action.captchaUrl,
      };
    }

    default:
      return state;
  }
}

type ActionTypes = InferActionsTypes<typeof actions>;

export const actions = {
  setUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
  ) =>
    ({
      type: 'SET_USER_DATA',
      data: { userId, email, login, isAuth },
    }) as const,

  getCaptchaUrlAC: (captchaUrl: string) =>
    ({
      type: 'GET_CAPTCHA_URL',
      captchaUrl: captchaUrl,
    }) as const,
};

export type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionTypes | FormAction
>;

export const getUserData = (): ThunkType => async (dispatch) => {
  const response = await AuthAPI.me();
  if (response.resultCode === ResultCodes.Success) {
    let { id, email, login } = response.data;
    dispatch(actions.setUserData(id, email, login, true));
  }
};

export const login =
  (
    email: string,
    password: string,
    remember: boolean,
    captcha: string,
  ): ThunkType =>
  async (dispatch) => {
    let response = await AuthAPI.login(email, password, remember, captcha);
    if (response.resultCode === ResultCodes.Success) {
      dispatch(getUserData());
    } else {
      if (response.resultCode === ResultCodes.CaptchaIsRequired) {
        dispatch(getCaptchaUrl());
      }
      let errorMessage =
        response.messages.length > 0
          ? response.messages[0]
          : 'Something wrong, I can feel it';
      dispatch(stopSubmit('login', { _error: errorMessage }));
    }
  };
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const response = await SecurityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;
  dispatch(actions.getCaptchaUrlAC(captchaUrl));
};

export const logout = (): ThunkType => async (dispatch: any) => {
  let response = await AuthAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(actions.setUserData(null, null, null, false));
  }
};
