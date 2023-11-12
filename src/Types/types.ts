export type contactType = {
  github?: string;
  vk?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  website?: string;
  youtube?: string;
  mainLink?: string;
};

export type photosType = {
  small?: string;
  large?: string;
};

export type profileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  photos: photosType;
  contacts: contactType;
  aboutMe?: string;
};

export type userItem = {
  id: number;
  name: string;
  status: string;
  photos: photosType;
  followed: boolean;
};
