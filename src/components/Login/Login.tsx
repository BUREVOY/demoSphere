import React from 'react'; //rsc
import s from './Login.module.css';
import LoginForm, { LoginFormOwnProps } from './LoginForm/LoginForm';
import { reduxForm } from 'redux-form';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';
import { AppDispatch, AppStateType } from '../../redux/reduxStore';
import { getisAuth } from '../../redux/authSelector';

let LoginReduxForm = reduxForm<LoginFormDataType, LoginFormOwnProps>({
  form: 'login',
})(LoginForm);

export type LoginFormDataType = {
  email: string;
  password: string;
  captcha: string;
  remember: boolean;
};

const Login: React.FC = () => {
  const captchaUrl = useSelector(
    (state: AppStateType) => state.auth.captchaUrl,
  );
  const isAuth = useSelector(getisAuth);

  const dispatch: AppDispatch = useDispatch();

  let onSubmit = (formData: any) => {
    console.log(formData);
    dispatch(
      login(
        formData.email,
        formData.password,
        formData.remember,
        formData.captcha,
      ),
    );
  };

  if (isAuth) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className={s.content}>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  );
};

export default Login;
