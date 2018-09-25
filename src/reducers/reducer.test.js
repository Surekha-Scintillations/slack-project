const { createStore } = require('redux');
const should = require('chai').should();
const Reducers = require('.');
const currState = require('./sample-data');

const config = {
  app: {
    instanceLocator: 'v1:us1:c887f7ef-f46b-4b9c-a92d-5baed5338505',
    key: 'd7dca43b-a94d-408b-86f6-e4f83f23cef3:mNf5r5/48fIBlSrZ4ittjWRqtB1QjrCB8nqsSdFeurY=',
  },
  base_url: 'http://localhost:3001/',
  DEFAULT_ROOM_ID: 17038228,
};

const ROOM_ID = config.DEFAULT_ROOM_ID;


describe('Reducers', () => {
  beforeEach(() => {
  });


  it('should RECEIVE_MESSAGE', () => {
    const action = {
      type: 'RECEIVE_MESSAGE',
      payload: {
        roomId: ROOM_ID,
        senderId: 'Admin',
        text: 'Hello',
        sender: {
          customData: { avatar_color: 'blue' },
          id: 'Admin',
          name: 'Admin',
        },
        presence: {
          state: 'online',
        },
      },
    };

    const store = createStore(Reducers, currState);
    store.dispatch(action);
    store.getState().should.have.property('messages').and.be.an('array').of.length(3);
    store.getState().messages[2].should.have.property('sender').and.be.an('object');
    store.getState().messages[2].should.have.property('text').and.be.an('string');
  });

  it('should USER_CAME_ONLINE', () => {
    const action = {
      type: 'USER_CAME_ONLINE',
      payload: {
        customData: { avatar_color: 'red' },
        id: 'Newuser',
        name: 'New User',
      },
    };

    const store = createStore(Reducers, currState);
    store.dispatch(action);
    store.getState().should.have.property('users').and.be.an('array').of.length(3);
    store.getState().users[2].should.have.property('customData').and.be.an('object');
    store.getState().users[2].should.have.property('name').and.be.an('string');
  });

  it('should CREATE_ROOM', () => {
    const action = {
      type: 'CREATE_ROOM',
      payload: {
        id: 123456789,
        name: 'Room 3',
        isPrivate: false,
        users: [
          {
            customData: { avatar_color: 'red' },
            id: 'akula',
            name: 'Akula',
          },
        ],
      },
    };

    const store = createStore(Reducers, currState);
    store.dispatch(action);
    store.getState().should.have.property('rooms').and.be.an('array').of.length(2);
    store.getState().rooms[1].should.have.property('users').and.be.an('array').of.length(1);
    store.getState().rooms[1].should.have.property('isPrivate').and.be.an('boolean');
  });
});
