import { put, call } from 'redux-saga/effects';
import Services from './services';


const onError = (error) => {
  console.log(error);
};


const onConnect = (userId) => {
  return Services.getCurrentUserAndCurrentRoom(userId).then((currentUserAndRoom) => {
    return currentUserAndRoom;
  });
};


const onJoinRoom = ({ currentUser, roomId }) => {
  return currentUser.joinRoom({ roomId })
    .then(currentRoom => currentRoom);
};

const onGetJoinableRooms = (currentUser) => {
  return currentUser.getJoinableRooms()
    .then(rooms => rooms)
    .catch(err => onError(err));
};


const onCreateUser = (payload) => {
  Services.signIn(payload);
};

export function* connect({ payload }) {
  try {
    const currentUserAndRoom = yield call(onConnect, payload);
    yield put({ type: 'SET_CURRENT_USER', payload: currentUserAndRoom });
  } catch (error) {
    onError(error);
  }
}


export function* joinRoom({ payload }) {
  try {
    const currentRoom = yield call(onJoinRoom, payload);
    yield put({ type: 'SET_CURRENT_ROOM', payload: currentRoom });
  } catch (error) {
    onError(error);
  }
}

export function* getJoinableRooms({ payload }) {
  try {
    const joinableRooms = yield call(onGetJoinableRooms, payload);
    yield put({ type: 'SET_JOINABLE_ROOMS', payload: joinableRooms });
  } catch (error) {
    onError(error);
  }
}

export function* createUser({ payload }) {
  try {
    yield call(onCreateUser, payload);
  } catch (error) {
    onError(error);
  }
}
