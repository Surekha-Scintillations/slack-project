import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import Reducers from './reducers';
import {
  createUser, connect, joinRoom, getJoinableRooms,
} from './saga';
import App from './App';
import './index.css';

function* watchRequest() {
  yield takeLatest('CONNECT', connect);
  yield takeLatest('JOIN_ROOM', joinRoom);
  yield takeLatest('CREATE_USER', createUser);
  yield takeLatest('GET_JOINABLE_ROOMS', getJoinableRooms);
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(Reducers, applyMiddleware(sagaMiddleware));

store.subscribe(() => {
});

sagaMiddleware.run(watchRequest);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'),
);
