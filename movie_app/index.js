import React from "react"

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import middleWare from "redux-thunk";
import rootReducers from "./src/redux/reducers/index";
const store = createStore(rootReducers, applyMiddleware(middleWare));

const AppContainer = () => (
    <Provider store={store}>
        <App />
    </Provider>
);
AppRegistry.registerComponent(appName, () => AppContainer);