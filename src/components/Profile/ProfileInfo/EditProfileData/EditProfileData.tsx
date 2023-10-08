import React, { Fragment } from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { required } from '../../../../utils/validator';
import {
  Checkbox,
  Input,
  TextArea,
} from '../../../common/FormControls/Formcontrol';
import s from '../../../Login/Login.module.css';
import { profileType } from '../../../../Types/types';

export type PropsEditProfile = {
  profile: profileType;
};

let EditProfileData: React.FC<
  InjectedFormProps<profileType, PropsEditProfile> & PropsEditProfile
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <button>Сохранить</button>
      </div>

      {props.error ? <div className={s.errorLog}>{props.error}</div> : null}

      <div>
        <span>ПОЛНОЕ ИМЯ: </span>
        <Field
          validate={[required]}
          component={Input}
          name={'fullName'}
          type="text"
          placeholder="полное имя"
        />
      </div>

      <div>
        <span>ПОИСК РАБОТЫ: </span>

        <Field name={'lookingForAJob'} component={Checkbox} type="checkbox" />
      </div>

      <div>
        <span>МОИ НАВЫКИ: </span>

        <Field
          validate={[required]}
          component={TextArea}
          name={'lookingForAJobDescription'}
          type="text"
          placeholder="опишите ваши навыки"
        />
      </div>

      <div>
        <span>ОБО МНЕ: </span>

        <Field
          validate={[required]}
          component={TextArea}
          name={'aboutMe'}
          type="text"
          placeholder="расскажи о себе"
        />
      </div>

      {Object.keys(props.profile.contacts).map((key) => {
        return (
          <Fragment key={key}>
            <span>{key}</span>
            <Field
              component={Input}
              name={'contacts.' + key}
              type="text"
              placeholder={key}
            />
          </Fragment>
        );
      })}
    </form>
  );
};

export default EditProfileData;
