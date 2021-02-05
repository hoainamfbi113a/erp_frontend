import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import reducer from "./features/reducers";
import { rootSaga } from "./sagas/rootSaga";
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

export default store;
