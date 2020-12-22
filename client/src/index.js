import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
// import postReducer from '../src/reducer/PostReducer';
import rootReducer from './reducers';
import App from "./App/App"
// import App from "./"
const store = createStore(rootReducer);
ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
     document.getElementById("root")
);