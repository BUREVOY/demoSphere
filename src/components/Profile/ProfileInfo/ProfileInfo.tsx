import React, { ChangeEvent, Fragment, useState } from 'react';
import Loader from '../../common/Loader/Loader';
import s from './ProfileInfo.module.css';
import ProfileStatusFunc from './ProfileStatus/ProfileStatusFunc';
import EditProfileData, {
  PropsEditProfile,
} from './EditProfileData/EditProfileData';
import { reduxForm } from 'redux-form';
import { profileType } from '../../../Types/types';
const defaultAvatar = require('../../../assets/images/defautltUser.png');

let EditProfileDataRedux = reduxForm<profileType, PropsEditProfile>({
  form: 'edit-profile',
})(EditProfileData);

type Props = {
  profile: profileType | null;
  isOwner: boolean;
  status: string;
  setStatus: (status: string) => void;
  updateStatus: (status: string) => void;
  saveProfile: (profile: profileType) => Promise<void>;
  uploadPhoto: (photo: File) => void;
};

const ProfileInfo: React.FC<Props> = (props) => {
  let [editMode, setEditMode] = useState(false);

  let handleUploadPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      props.uploadPhoto(e.target.files[0]);
    }
  };

  let handleEditMode = () => {
    setEditMode(true);
  };

  let onSubmit = (form: profileType) => {
    props
      .saveProfile(form)
      .then(() => {
        setEditMode(false);
      })
      .catch(() => {});
  };

  if (!props.profile) {
    return <Loader />;
  } else {
    return (
      <div>
        <div className={s.img}>
          <img
            src={props.profile.photos.large || defaultAvatar}
            alt="nice avatar"
          />
        </div>
        {props.isOwner && <input type="file" onChange={handleUploadPhoto} />}

        {props.profile.fullName && <div>{props.profile.fullName} </div>}

        <ProfileStatusFunc
          {...props}
          status={props.status}
          setStatus={props.setStatus}
          updateStatus={props.updateStatus}
        />

        {editMode ? (
          <EditProfileDataRedux
            initialValues={props.profile}
            onSubmit={onSubmit}
            profile={props.profile}
          />
        ) : (
          <ProfileData
            isOwner={props.isOwner}
            profile={props.profile}
            handleEditMode={handleEditMode}
          />
        )}
      </div>
    );
  }
};
type PropsProfileData = {
  isOwner: boolean;
  profile: profileType;
  handleEditMode: () => void;
};
const ProfileData: React.FC<PropsProfileData> = (props) => {
  return (
    <>
      {props.isOwner ? (
        <button onClick={props.handleEditMode}>Изменить</button>
      ) : null}
      {props.profile.lookingForAJob ? (
        <div>ищу работу</div>
      ) : (
        <div>устроился на работу</div>
      )}

      {Object.values(props.profile.contacts).map((contact) => {
        return contact !== null ? <div key={contact}>{contact}</div> : null;
      })}

      <span>контакты: </span>

      {Object.entries(props.profile.contacts).map((key) => {
        return (
          <Fragment key={key[0]}>
            <div>{key[1] !== null ? <div>{key[0]}</div> : null}</div>
          </Fragment>
        );
      })}
    </>
  );
};

export default ProfileInfo;
