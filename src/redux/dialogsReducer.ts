import { InferActionsTypes } from './reduxStore';

export type initialStateType = {
  dialogItems: {
    id: number;
    name: string;
  }[];

  messageItems: {
    id: number;
    message: string;
  }[];

  messageText: string;
};

let initialState: initialStateType = {
  dialogItems: [
    { id: 1, name: 'Илья' },
    { id: 2, name: 'Витя' },
    { id: 3, name: 'Саша' },
    { id: 4, name: 'Тимур' },
    { id: 5, name: 'Вова' },
  ],
  messageItems: [
    { id: 1, message: 'yoo' },
    { id: 2, message: 'как дела' },
    { id: 3, message: 'у меня хорошо' },
  ],
  messageText: '',
};

export default function dialogsReducer(
  state = initialState,
  action: ActionTypes,
): initialStateType {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      return {
        ...state,
        messageItems: [
          ...state.messageItems,
          {
            id: 6,
            message: action.newMessage,
          },
        ],
      };
    }

    default:
      return state;
  }
}

type ActionTypes = InferActionsTypes<typeof actions>;

export const actions = {
  addMessage: (newMessage: string) =>
    ({
      type: 'ADD_MESSAGE',
      newMessage,
    }) as const,
};
