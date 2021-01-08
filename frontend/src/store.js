import { createStore, combineReducers, applyMiddleware } from 'redux'; //createStore to create the store, applyMiddleware to be able to use thunks and other middlewares
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  modelListReducer,
  modelDetailsReducer,
  modelLoginReducer,
  modelRegisterReducer,
  modelUpdateProfileReducer,
} from './reducers/modelReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  modelList: modelListReducer,
  modelDetails: modelDetailsReducer,
  modelLogin: modelLoginReducer,
  modelRegister: modelRegisterReducer,
  modelUpdateProfile: modelUpdateProfileReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const modelInfoFromStorage = localStorage.getItem('modelInfo')
  ? JSON.parse(localStorage.getItem('modelInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  modelLogin: { modelInfo: modelInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
