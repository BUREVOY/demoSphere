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
          <input
            type="text"
            value={props.status}
            autoFocus={true}
            onBlur={deactivateEditMode}
            onChange={onStatusChange}
          />
        </div>
      ) : (
        <div>
          <div onClick={activateEditMode}>{props.status || 'Нет статуса'}</div>
        </div>
      )}
    </>
  );
};

export default ProfileStatusFunc;
