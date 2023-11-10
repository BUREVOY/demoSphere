import React from 'react';
import MypostsContainer from './Myposts/MypostsContainer';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { profileType } from '../../Types/types';

type MapStateProps = {
  profile: profileType | null;
  status: string;
  isOwner: boolean;
};

type MapDispatch = {
  setStatus: (status: string) => void;
  updateStatus: (status: string) => void;
  uploadPhoto: (photo: File) => void;
  saveProfile: (profile: profileType) => Promise<any>;
};

const Profile: React.FC<MapStateProps & MapDispatch> = ({
  profile,
  status,
  setStatus,
  updateStatus,
  isOwner,
  uploadPhoto,
  saveProfile,
}) => {
  return (
    <div className={s.content}>
      <ProfileInfo
        uploadPhoto={uploadPhoto}
        isOwner={isOwner}
        profile={profile}
        status={status}
        setStatus={setStatus}
        updateStatus={updateStatus}
        saveProfile={saveProfile}
      />
      <MypostsContainer />
    </div>
  );
};

export default Profile;
