import React from 'react';
import '../Login.module.css';
import { Field, InjectedFormProps } from 'redux-form';
import { required } from '../../../utils/validator';
import { LoginFormDataType } from '../Login';
// import { Input } from '../../common/FormControls/Formcontrol';
import { Button, Checkbox, Form, Input, Radio } from 'antd';
import { AppDispatch } from '../../../redux/reduxStore';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/authReducer';

export type LoginFormOwnProps = {
  captchaUrl: string | null;
};

const LoginForm: React.FC<
  InjectedFormProps<LoginFormDataType, LoginFormOwnProps> & LoginFormOwnProps
> = (props) => {
  const dispatch: AppDispatch = useDispatch();

  function handleSubmit(formData: any) {
    let obj = {
      email: formData.target[0].value,
      pass: formData.target[1].value,
      rememder: formData.target[2].checked,
      captcha: formData.captcha,
    };
    console.log(obj);
    dispatch(
      login(
        formData.target[0].value,
        formData.target[1].value,
        formData.target[2].checked,
        formData.target[3].value,
      ),
    );
  }
  return (
    <>
      {/* <form className={s.login} onSubmit={props.handleSubmit}>
        <div>Логин: free@samuraijs.com</div>

        <div>Пароль: free</div>
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
          <Field component={'input'} name={'remember'} type="checkbox" />{' '}
          remember me
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
      </form> */}

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, color: 'aliceblue', fontFamily: 'Montserrat' }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onSubmitCapture={handleSubmit}

        // onSubmit={props.handleSubmit}
      >
        <Form.Item
          label="Почта"
          name="email"
          rules={[
            { required: true, message: 'Пожалуйста, введите ваш email!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            { required: true, message: 'Пожалуйста, введите ваш пароль!' },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox style={{ color: 'aliceblue', fontFamily: 'Montserrat' }}>
            Запомнить
          </Checkbox>
        </Form.Item>

        {props.captchaUrl && (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {' '}
            <div>sasas</div>
            <div>
              <img
                src={props.captchaUrl}
                alt="captcha"
                style={{
                  // width: '20%',
                  // height: '20%',
                  justifySelf: 'end',
                  margin: '20px',
                }}
              />
            </div>
          </div>
        )}
        {props.captchaUrl && (
          <Form.Item
            label="Капча"
            name="captcha"
            rules={[{ required: true, message: 'Пожалуйста, введите капчу!' }]}
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
