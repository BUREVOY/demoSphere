import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { actions } from '../../redux/dialogsReducer';
import withAuthRedirect from '../Hoc/withAuthRedirect';
import Dialogs from './Dialogs';
import { AppStateType } from '../../redux/reduxStore';
const addMessage = actions.addMessage;

let mapStateToProps = (state: AppStateType) => {
  return {
    messageText: state.dialogsPage.messageText,
    dialogItems: state.dialogsPage.dialogItems,
    messageItems: state.dialogsPage.messageItems,
  };
};

export default compose<React.ComponentType>(
  withAuthRedirect,
  connect(mapStateToProps, { addMessage }),
)(Dialogs);
