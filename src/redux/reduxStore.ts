import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from 'redux';
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import userReducer from './userReducer';
import authReducer from './authReducer';
import appReducer from './appReducer';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import chatReducer from './chatReducer';

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: userReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
  chat: chatReducer,
});

type rootReducer = typeof reducers;
export type AppStateType = ReturnType<rootReducer>;

// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

// type PropertyTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type InferActionsTypes<T> = T extends {
  [keys: string]: (...args: any[]) => infer U;
}
  ? U
  : never;

// export type InferActionsTypes<
//   T extends { [key: string]: (...args: any[]) => any },
// > = ReturnType<PropertyTypes<T>>;

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>;

// window.store = store;

export default store;
