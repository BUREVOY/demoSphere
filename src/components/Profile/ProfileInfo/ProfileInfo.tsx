import React, { ChangeEvent, Fragment, useState } from 'react';
import Loader from '../../common/Loader/Loader';
import s from './ProfileInfo.module.css';
import ProfileStatusFunc from './ProfileStatus/ProfileStatusFunc';
import EditProfileData, {
  PropsEditProfile,
} from './EditProfileData/EditProfileData';
import { reduxForm } from 'redux-form';
import { profileType } from '../../../Types/types';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Image } from 'antd';

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
      console.log(e.target.files[0]);
      props.uploadPhoto(e.target.files[0]);
    }
  };
  let handleAntUploadPhoto = (e: any) => {
    debugger;
    if (e.file) {
      console.log(e.file);
      props.uploadPhoto(e.file);
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
  console.log(props.profile);

  if (!props.profile) {
    return <Loader />;
  } else {
    return (
      <div style={{ position: 'relative', display: 'flex' }}>
        <div className={s.upperLeftSide}>
          <div className={s.img}>
            <SettingOutlined className={s.settings} />
            <Image
              src={props.profile.photos.large || defaultAvatar}
              alt="nice avatar"
              style={{ height: '300px', borderRadius: '8px 8px 0 0' }}
            />
          </div>
          {props.isOwner && (
            <label className={s.custom_file_upload}>
              <input type="file" onChange={handleUploadPhoto} />
              <InboxOutlined
                style={{
                  display: 'flex',
                  alignSelf: 'center',
                  fontSize: '40px',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '5%',
                  left: '50%',
                  marginRight: '-50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                Выберите файл
              </div>
            </label>
          )}
        </div>

        <div className={s.upperRightSide}>
          {props.profile.fullName && (
            <h1
              style={{
                color: 'aliceblue', //'#888C90',
                fontFamily: 'Montserrat',
                fontWeight: '500',
                letterSpacing: 4,
              }}
            >
              {props.profile.fullName}
            </h1>
          )}

          <ProfileStatusFunc
            {...props}
            status={props.status}
            setStatus={props.setStatus}
            updateStatus={props.updateStatus}
          />

          {props.profile.aboutMe && (
            <h3
              style={{
                color: 'aliceblue',
                fontFamily: 'Montserrat',
                fontWeight: '500',
                margin: '6px 6px 6px 0',
              }}
            >
              {props.profile.aboutMe}
            </h3>
          )}

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
        <Button onClick={props.handleEditMode}>Изменить</Button>
      ) : null}
      {props.profile.lookingForAJob ? (
        <div>ищу работу</div>
      ) : (
        <div>устроился на работу</div>
      )}

      {/* {Object.values(props.profile.contacts).map((contact) => {
        return contact !== null ? <div key={contact}>{contact}</div> : null;
      })} */}

      {/* <span>контакты: </span>

      {Object.entries(props.profile.contacts).map((key) => {
        return (
          <Fragment key={key[0]}>
            <div>{key[1] !== null ? <div>{key[0]}</div> : null}</div>
          </Fragment>
        );
      })} */}
    </>
  );
};

export default ProfileInfo;
