import Axios from 'axios';

export const instance = Axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '8449bbfe-5c34-4b08-bd81-66f37f720736',
  },
});

export type ResponseType<D = {}> = {
  resultCode: ResultCodes;
  messages: string[];
  data: D;
};

export enum ResultCodes {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10,
}
