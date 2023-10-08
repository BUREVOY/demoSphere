import { ThunkAction } from 'redux-thunk';
import { getUserData } from './authReducer';
import { AppStateType, InferActionsTypes } from './reduxStore';

let initialState = {
  initialized: false,
};

type initialStateType = typeof initialState;

export default function appReducer(
  state = initialState,
  action: ActionTypes,
): initialStateType {
  switch (action.type) {
    case 'SET_INITIALIZED': {
      return {
        ...state,
        initialized: true,
      };
    }

    default:
      return state;
  }
}

type ActionTypes = InferActionsTypes<typeof actions>;
export const actions = {
  setInitialize: () =>
    ({
      type: 'SET_INITIALIZED',
    }) as const,
};

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const initializeApp = (): ThunkType => async (dispatch) => {
  let promice = dispatch(getUserData());

  Promise.all([promice]).then(() => {
    dispatch(actions.setInitialize());
  });
};
