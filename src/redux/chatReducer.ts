import { ThunkAction } from 'redux-thunk';
import { AppStateType, InferActionsTypes } from './reduxStore';
import { ChatType, ChatAPI } from '../api/chat-api';
import { Dispatch } from 'redux';
import { v1 } from 'uuid';

type StatusType = 'pending' | 'ready';
type MessgaeWithID = ChatType & { id: string };

let initialState = {
  messages: [] as MessgaeWithID[],
  status: 'pending' as StatusType,
};

export type initialStateType = typeof initialState;

export default function chatReducer(
  state = initialState,
  action: ActionTypes,
): initialStateType {
  switch (action.type) {
    case 'MESSAGES_RECIEVED':
      return {
        ...state,
        messages:
          action.payload.length === 0
            ? action.payload
                .map((m) => ({ ...m, id: v1() }))
                .filter((m, i, arr) => i >= arr.length - 100)
            : [
                ...state.messages,
                ...action.payload.map((m) => ({ ...m, id: v1() })),
              ].filter((m, i, arr) => i >= arr.length - 100),
        status: 'ready',
      };
    case 'CHAT_STATUS_CHANGED':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
}

type ActionTypes = InferActionsTypes<typeof actions>;

export const actions = {
  messagesRecieved: (messages: ChatType[]) =>
    ({
      type: 'MESSAGES_RECIEVED',
      payload: messages,
    }) as const,
  statusChanged: (status: StatusType) =>
    ({
      type: 'CHAT_STATUS_CHANGED',
      payload: status,
    }) as const,
};

export type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionTypes
>;

let newMessageHandleCreator =
  (dispatch: Dispatch) => (messages: ChatType[]) => {
    dispatch(actions.messagesRecieved(messages));
  };
let clearMessagesHandleCreator = (dispatch: Dispatch) => () => {
  dispatch(actions.messagesRecieved([]));
};

export const startListeningNewMessages = (): ThunkType => async (dispatch) => {
  ChatAPI.start();

  // dispatch(actions.statusChanged(ChatAPI.readyCheck() ? 'ready' : 'pending'))

  ChatAPI.subscribe(newMessageHandleCreator(dispatch));
};

export const stopListeningNewMessages = (): ThunkType => async (dispatch) => {
  ChatAPI.stop();
  ChatAPI.unsubscribe(clearMessagesHandleCreator(dispatch));
  dispatch(actions.messagesRecieved([]));
  ChatAPI.stop();
};

export const sendNewMessage =
  (messsage: string): ThunkType =>
  async (dispatch) => {
    await ChatAPI.sendMessage(messsage);
    stopListeningNewMessages();
    startListeningNewMessages();
  };
