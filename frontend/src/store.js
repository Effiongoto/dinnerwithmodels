import { createStore, combineReducers, applyMiddleware } from "redux"; //createStore to create the store, applyMiddleware to be able to use thunks and other middlewares
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  modelListReducer,
  modelAllReducer,
  modelDetailsReducer,
  modelLoginReducer,
  modelRegisterReducer,
  modelUpdateProfileReducer,
  modelDeleteReducer,
  modelUpdateReducer,
  modelReviewCreateReducer,
} from "./reducers/modelReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userPayReducer,
  userSubscribeReducer,
} from "./reducers/userReducers";
import {
  createPlanReducer,
  planDeleteReducer,
  planDetailsReducer,
  planListReducer,
  planUpdateReducer,
} from "./reducers/paymentReducers";
import {
  createSubReducer,
  subDetailsReducer,
  subDisableReducer,
  subEnableReducer,
  subListReducer,
} from "./reducers/subscriptionReducers";

const reducer = combineReducers({
  modelList: modelListReducer,
  modelAll: modelAllReducer,
  modelDetails: modelDetailsReducer,
  modelLogin: modelLoginReducer,
  modelRegister: modelRegisterReducer,
  modelUpdateProfile: modelUpdateProfileReducer,
  modelDelete: modelDeleteReducer,
  modelUpdate: modelUpdateReducer,
  modelReviewCreate: modelReviewCreateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userPay: userPayReducer,
  userSubscribe: userSubscribeReducer,
  planCreate: createPlanReducer,
  planList: planListReducer,
  planDelete: planDeleteReducer,
  planDetails: planDetailsReducer,
  planUpdate: planUpdateReducer,
  subCreate: createSubReducer,
  subList: subListReducer,
  subDetails: subDetailsReducer,
  subEnable: subEnableReducer,
  subDisable: subDisableReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const modelInfoFromStorage = localStorage.getItem("modelInfo")
  ? JSON.parse(localStorage.getItem("modelInfo"))
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
