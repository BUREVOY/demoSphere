import React from 'react';
import s from '../Login.module.css';
import { Field, InjectedFormProps } from 'redux-form';
import { Input } from '../../common/FormControls/Formcontrol';
import { required } from '../../../utils/validator';
import { LoginFormDataType } from '../Login';

export type LoginFormOwnProps = {
  captchaUrl: string | null;
};

const LoginForm: React.FC<
  InjectedFormProps<LoginFormDataType, LoginFormOwnProps> & LoginFormOwnProps
> = (props) => {
  return (
    <form className={s.login} onSubmit={props.handleSubmit}>
      <div>default login: free@samuraijs.com</div>

      <div>default password: free</div>
      <div>
        <Field
          validate={[required]}
          component={Input}
          type="email"
          name={'email'}
          placeholder="Email"
        />
      </div>
      <div>
        <Field
          validate={[required]}
          component={Input}
          name={'password'}
          type="password"
          placeholder="Password"
        />
      </div>

      <div>
        <Field component={'input'} name={'remember'} type="checkbox" /> remember
        me
      </div>

      {props.error ? <div className={s.errorLog}>{props.error}</div> : null}

      {props.captchaUrl && (
        <img
          src={props.captchaUrl}
          alt="captcha"
          style={{
            width: '20%',
            height: '20%',
            display: 'block',
            margin: '20px',
          }}
        />
      )}
      {props.captchaUrl && (
        <Field
          validate={[required]}
          component={Input}
          name={'captcha'}
          type="text"
          placeholder="captcha"
        />
      )}

      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
