import { UsersAPI } from './../api/users-api';
import { userItem } from '../Types/types';
import { ThunkAction } from 'redux-thunk';
import { AppStateType, InferActionsTypes } from './reduxStore';

let initialState = {
  usersItems: [] as Array<userItem>,
  totalUsers: 19,
  pageSize: 6, //2 2 2
  pageSelected: 1,
  isFetching: false,
  filter: {
    term: '',
    friend: null as null | boolean,
  },
  isFollowingInProgress: [] as Array<number>,
};
export type FilterType = typeof initialState.filter;

export type initialStateType = typeof initialState;

export default function userReducer(
  state = initialState,
  action: ActionTypes,
): initialStateType {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        usersItems: state.usersItems.map((user) => {
          if (user.id === action.id) {
            return { ...user, followed: true };
          } else {
            return user;
          }
        }),
      };
    case 'UNFOLLOW':
      return {
        ...state,
        usersItems: state.usersItems.map((user) => {
          if (user.id === action.id) {
            return { ...user, followed: false };
          } else {
            return user;
          }
        }),
      };
    case 'SET_USERS':
      return {
        ...state,
        usersItems: action.users,
      };

    case 'SET_PAGE':
      return {
        ...state,
        pageSelected: action.pageSelected,
      };
    case 'SET_TOTAL_USERS_COUNT':
      return {
        ...state,
        totalUsers: action.totalCount,
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };

    case 'TOGGLE_IS_FETCHING':
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case 'TOGGLE_IS_FOLLOWING':
      return {
        ...state,
        isFollowingInProgress: action.isFollowingInProgress
          ? [...state.isFollowingInProgress, action.userId]
          : state.isFollowingInProgress.filter((id) => id !== action.userId),
      };
    default:
      return state;
  }
}

type ActionTypes = InferActionsTypes<typeof actions>;

export const actions = {
  follow: (id: number) =>
    ({
      type: 'FOLLOW',
      id: id,
    }) as const,

  unfollow: (id: number) =>
    ({
      type: 'UNFOLLOW',
      id: id,
    }) as const,

  setusers: (users: Array<userItem>) =>
    ({
      type: 'SET_USERS',
      users: users,
    }) as const,

  setpage: (pageSelected: number) =>
    ({
      type: 'SET_PAGE',
      pageSelected: pageSelected,
    }) as const,

  setTotalUsersCount: (totalCount: number) =>
    ({
      type: 'SET_TOTAL_USERS_COUNT',
      totalCount: totalCount,
    }) as const,

  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: 'TOGGLE_IS_FETCHING',
      isFetching: isFetching,
    }) as const,

  setFilter: (filter: FilterType) =>
    ({
      type: 'SET_FILTER',
      payload: filter,
    }) as const,

  toggleIsFollowing: (isFollowingInProgress: boolean, userId: number) =>
    ({
      type: 'TOGGLE_IS_FOLLOWING',
      isFollowingInProgress: isFollowingInProgress,
      userId: userId,
    }) as const,
};

export type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionTypes
>;

export const getUsers =
  (pageSelected: number, pageSize: number, filter: FilterType): ThunkType =>
  async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setFilter(filter));

    let data = await UsersAPI.getUsers(
      pageSelected,
      pageSize,
      filter.term,
      filter.friend,
    );
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setusers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
    dispatch(actions.setpage(pageSelected));
  };

export const followAPI =
  (userId: number): ThunkType =>
  async (dispatch) => {
    dispatch(actions.toggleIsFollowing(true, userId));
    let response = await UsersAPI.follow(userId);
    if (response.resultCode === 0) {
      dispatch(actions.follow(userId));
    }
    dispatch(actions.toggleIsFollowing(false, userId));
  };

export const unfollowAPI =
  (userId: number): ThunkType =>
  async (dispatch) => {
    dispatch(actions.toggleIsFollowing(true, userId));
    let response = await UsersAPI.unfollow(userId);
    if (response.resultCode === 0) {
      dispatch(actions.unfollow(userId));
    }
    dispatch(actions.toggleIsFollowing(false, userId));
  };
