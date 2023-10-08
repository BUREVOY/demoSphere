import React from 'react';
import s from './FormsControl.module.css';
import { WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';

type FormControlPropsType = {
  input: any;
  // meta: {
  //   touched: boolean
  //   error: boolean

  // }
  meta: WrappedFieldMetaProps;
  inputOrTextArea: boolean;
};

const FormControl: React.FC<FormControlPropsType> = ({
  input,
  meta,
  inputOrTextArea,
  ...props
}) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={s.formControl}>
      <div className={hasError ? s.error : ''}>
        {inputOrTextArea ? (
          <textarea {...input} {...props} className={s.errorArea} />
        ) : (
          <input {...input} {...props} className={s.errorArea} />
        )}
        <span className={s.errorMessege}>
          {hasError ? <div>{meta.error}</div> : null}
        </span>
      </div>
    </div>
  );
};

export const TextArea: React.FC<WrappedFieldProps> = ({
  input,
  meta,
  ...props
}) => {
  return (
    <FormControl {...props} meta={meta} input={input} inputOrTextArea={true} />
  );
};

export const Input: React.FC<WrappedFieldProps> = ({
  input,
  meta,
  ...props
}) => {
  return (
    <FormControl {...props} meta={meta} input={input} inputOrTextArea={false} />
  );
};

export const Checkbox: React.FC<WrappedFieldProps> = ({
  input,
  meta: { touched, error },
}) => (
  <div style={{ border: touched && error ? '1px solid red' : 'none' }}>
    <input type="checkbox" {...input} />
  </div>
);
