import React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { AddMessageFormType } from '../Dialogs';

// type AddMessageFormValuesKeysType = Extract<keyof AddMessageFormType, string>
type Props = {};
const dialogsForm: React.FC<
  InjectedFormProps<AddMessageFormType, Props> & Props
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        placeholder="Enter your text"
        component="textarea"
        name="newMessage"
      />

      <div>
        <button>Отправить</button>
      </div>
    </form>
  );
};

export default dialogsForm;
