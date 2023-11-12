import { Input } from 'antd';
import React, { ChangeEvent, useState } from 'react';

type Props = {
  setStatus: (newStatus: string) => void;
  updateStatus: (newStatus: string) => void;
  status: string;
};

let ProfileStatusFunc: React.FC<Props> = (props) => {
  const [editMode, setEditMode] = useState(false);

  let activateEditMode = () => {
    setEditMode(true);
  };
  let deactivateEditMode = (e: ChangeEvent<HTMLInputElement>) => {
    setEditMode(false);
    props.setStatus(e.currentTarget.value);
  };
  let onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.updateStatus(e.currentTarget.value);
  };

  return (
    <>
      {editMode ? (
        <div>
          {/* <input
            type="text"
            value={props.status}
            autoFocus={true}
            onBlur={deactivateEditMode}
            onChange={onStatusChange}
          /> */}
          <Input
            placeholder="Basic usage"
            type="text"
            value={props.status}
            autoFocus={true}
            onBlur={deactivateEditMode}
            onChange={onStatusChange}
          />
        </div>
      ) : (
        <div>
          <h2
            onClick={activateEditMode}
            style={{
              color: 'aliceblue',
              fontFamily: 'Montserrat',
              fontWeight: '500',
              margin: '6px 6px 6px 0',
            }}
          >
            {props.status || 'Нет статуса'}
          </h2>
        </div>
      )}
    </>
  );
};

export default ProfileStatusFunc;
