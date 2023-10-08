import { instance } from './api';

type CaptchaType = {
  url: string;
};

export const SecurityAPI = {
  getCaptchaUrl() {
    return instance.get<CaptchaType>(`security/get-captcha-url`);
  },
};
