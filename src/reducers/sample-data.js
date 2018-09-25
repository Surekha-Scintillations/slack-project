const config = {
  app: {
    instanceLocator: 'v1:us1:c887f7ef-f46b-4b9c-a92d-5baed5338505',
    key: 'd7dca43b-a94d-408b-86f6-e4f83f23cef3:mNf5r5/48fIBlSrZ4ittjWRqtB1QjrCB8nqsSdFeurY=',
  },
  base_url: 'http://localhost:3001/',
  DEFAULT_ROOM_ID: 17038228,
};

const ROOM_ID = config.DEFAULT_ROOM_ID;
const defautUsers = [
  {
    customData: { avatar_color: 'white' },
    id: 'Surekha',
    name: 'Surekha',
  },
  {
    customData: { avatar_color: 'red' },
    id: 'Akula',
    name: 'Akula',
  },
];

const currState = {
  messages: [
    {
      roomId: ROOM_ID,
      senderId: 'Surekha',
      text: 'Good Morning',
      sender: defautUsers[0],
      presence: {
        state: 'online',
      },
    },
    {
      roomId: ROOM_ID,
      senderId: 'Akula',
      text: 'hi',
      sender: defautUsers[1],
      presence: {
        state: 'online',
      },
    },
  ],

  users: defautUsers,

  rooms: [
    {
      id: 15827188,
      name: 'Room 1',
      isPrivate: false,
      users: defautUsers,
    },

  ],
};

module.exports = currState;
