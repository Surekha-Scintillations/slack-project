import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddNewRoom from '../components/create-room';
import InviteToRoom from '../components/add-user-to-room';
import Rooms from '../components/rooms';
import { createRoom } from '../actions';


class UserRooms extends React.PureComponent {
  onRoomCreation({ name, isPrivate }) {
    this.props.currentUser.createRoom({
      name,
      private: isPrivate,
      // addUserIds: [this.props.currentUser.id]
    }).then((room) => {
      this.props.createRoom(room);
    })
      .catch((err) => {
        console.log(`Error creating room ${err}`);
      });
  }

  onUsersAddedToRoom({ roomId, userIds }) {
    userIds.map((userId) => {
      return this.props.currentUser.addUserToRoom({
        userId,
        roomId,
      })
        .then(() => {
          return userId;
        }).catch((err) => {
          console.log(`Error adding users to room: ${err}`);
        });
    });
  }

  render() {
    const addRoom = <AddNewRoom onRoomCreation={this.onRoomCreation.bind(this)} />;
    const inviteToRooms = <InviteToRoom currentUser={this.props.currentUser}
    rooms={this.props.rooms} users={this.props.users}
    onUsersAddedToRoom={this.onUsersAddedToRoom.bind(this)} />;
    return <Rooms rooms={this.props.rooms} addRoom={addRoom}
    currentRoomId={this.props.currentRoomId}
    heading="Rooms" inviteToRooms={inviteToRooms} />;
  }
}


const mapStateToProps = (state) => {
  return {
    rooms: state.rooms,
    users: state.users,
    currentUser: state.currentUser,
    currentRoomId: state.currentRoomId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ createRoom }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRooms);
