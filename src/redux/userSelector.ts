import { createSelector } from 'reselect';
import { AppStateType } from './reduxStore';

const getUsersItemsHelper = (state: AppStateType) => {
  return state.usersPage.usersItems;
};

export const getUsersItems = createSelector(
  getUsersItemsHelper,
  (usersItems) => {
    //complex logic here. userItems are cached
    return usersItems;
  },
);

export const getTotalUsers = (state: AppStateType) => {
  return state.usersPage.totalUsers;
};

export const getUsersFilter = (state: AppStateType) => {
  return state.usersPage.filter;
};
export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};
export const getPageSelected = (state: AppStateType) => {
  return state.usersPage.pageSelected;
};
export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
};
export const getIsFollowingInProgress = (state: AppStateType) => {
  return state.usersPage.isFollowingInProgress;
};
