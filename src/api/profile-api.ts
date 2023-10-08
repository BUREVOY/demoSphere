import { photosType, profileType } from '../Types/types';
import { ResponseType, instance } from './api';

type UploadPhotoType = {
  photos: photosType;
};

export const ProfileAPI = {
  getProfile(userId: number | null) {
    return instance.get<profileType>(`profile/${userId}`);
  },
  getStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`);
  },
  setStatus(status: string) {
    return instance.put<ResponseType>(`profile/status/`, { status: status });
  },
  uploadPhoto(photo: any) {
    let formData = new FormData();
    formData.append('image', photo);

    return instance.put<ResponseType<UploadPhotoType>>(
      `profile/photo/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  },

  saveProfile(form: profileType) {
    return instance.put<ResponseType>(`profile`, form);
  },
};
