const messageReducer = (currState = {
  currentUser: null,
  currentRoomId: null,
  currentRoom: null,
  messages: [],
  users: [],
  rooms: [],
  joinableRooms: [],
},
action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER': {
      const data = action.payload;
      return {
        ...currState,
        currentUser: data.currentUser,
        currentRoom: data.currentRoom,
        currentRoomId: data.currentRoom.id,
        rooms: data.currentUser.rooms,
        users: data.currentRoom.users,
      };
    }
    case 'SET_CURRENT_ROOM_ID':
      return { ...currState, currentRoomId: action.payload };
    case 'SET_CURRENT_ROOM':
      return {
        ...currState,
        currentRoom: action.payload,
        users: action.payload.users,
        messages: [],
      };
    case 'SET_JOINABLE_ROOMS':
      return { ...currState, joinableRooms: action.payload };
    case 'RECEIVE_MESSAGE':
      return { ...currState, messages: [...currState.messages, action.payload] };
    case 'CREATE_ROOM':
      return { ...currState, rooms: [...currState.rooms, action.payload] };
    case 'USER_CAME_ONLINE':
    {
      const newUsers = currState.users.filter(user => user.id !== action.payload.id);
      return { ...currState, users: [...newUsers, action.payload] };
    }
    default:
      return currState;
  }
};

module.exports = messageReducer;
