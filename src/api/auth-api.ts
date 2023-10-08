import { ResponseType, instance } from './api';

type MeType = {
  id: number;
  email: string;
  login: string;
};

type LoginType = {
  userId: number;
};
export enum ResultCodes {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10,
}
export const AuthAPI = {
  me() {
    return instance
      .get<ResponseType<MeType>>(`auth/me`)
      .then((res) => res.data);
  },
  login(
    email: string,
    password: string,
    rememberMe: boolean = false,
    captcha: string,
  ) {
    return instance
      .post<ResponseType<LoginType>>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data);
  },
  logout() {
    return instance.delete<ResponseType>(`auth/login`);
  },
};
