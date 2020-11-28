import {applyMiddleware, createStore, compose} from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers";
import rootSaga from "../saga";

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
    : compose;

const sagaMiddleware = createSagaMiddleware();

const configStore = () => {
    const middlewares = [sagaMiddleware];
    const enhaners = [applyMiddleware(...middlewares)];
    const store = createStore(rootReducer,composeEnhancers(...enhaners));
    sagaMiddleware.run(rootSaga);
    return store;
}
export default configStore;