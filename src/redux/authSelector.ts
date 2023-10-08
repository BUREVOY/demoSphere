import { AppStateType } from './reduxStore';

export const getisAuth = (state: AppStateType) => {
  return state.auth.isAuth;
};
