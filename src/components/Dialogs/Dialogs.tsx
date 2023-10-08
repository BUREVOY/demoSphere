import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { reduxForm } from 'redux-form';
import DialogForm from './DialogForm/DialogForm';

let DialogsFormRedux = reduxForm<AddMessageFormType>({ form: 'dialogsForm' })(
  DialogForm,
);

type OwnPropsType = {
  dialogItems: {
    id: number;
    name: string;
  }[];

  messageItems: {
    id: number;
    message: string;
  }[];

  messageText: string;

  addMessage: (newMessage: string) => void;
};

export type AddMessageFormType = {
  newMessage: string;
};

const Dialogs: React.FC<OwnPropsType> = (props) => {
  let dialogElements = props.dialogItems.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} key={dialog.id} />
  ));
  let messageElements = props.messageItems.map((message) => (
    <Message message={message.message} key={message.id} />
  ));

  function addNewMessage(values: AddMessageFormType) {
    props.addMessage(values.newMessage);
  }

  return (
    <div className={s.content}>
      <div className={s.all_dialogs}>{dialogElements}</div>

      <div className={s.all_massages}>
        {messageElements}
        <DialogsFormRedux onSubmit={addNewMessage} />
      </div>
    </div>
  );
};

export default Dialogs;
