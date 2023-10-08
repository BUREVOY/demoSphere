import React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { maxLenghCreator, required } from '../../../../utils/validator';
import { TextArea } from '../../../common/FormControls/Formcontrol';

const maxLength = maxLenghCreator(100);

export type PropsForm = {};
export type AddPostType = {
  mypostForm: string;
};

const MypostForm: React.FC<
  InjectedFormProps<AddPostType, PropsForm> & PropsForm
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={TextArea}
          name="mypostForm"
          placeholder="Enter your text"
          validate={[required, maxLength]}
        />
      </div>
      <div>
        <button>Добавить пост</button>
      </div>
    </form>
  );
};

export default MypostForm;
