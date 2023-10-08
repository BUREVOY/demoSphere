import { userItem } from '../Types/types';
import { ResponseType, instance } from './api';

type GetUsersType = {
  totalCount: number;
  error: string;
  items: userItem[];
};

export const UsersAPI = {
  getUsers(
    pageSelected = 1,
    pageSize = 4,
    term: string = '',
    friend: null | boolean = null,
  ) {
    return instance
      .get<GetUsersType>(
        `users?page=${pageSelected}&count=${pageSize}&term=${term}` +
          (friend === null ? '' : `&friend=${friend}`),
      )
      .then((response) => response.data);
  },

  follow(userId: number) {
    return instance
      .post<ResponseType>(`follow/${userId}`)
      .then((response) => response.data);
  },
  unfollow(userId: number) {
    return instance
      .delete<ResponseType>(`follow/${userId}`)
      .then((response) => response.data);
  },
};
