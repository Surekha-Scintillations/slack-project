import React from 'react';
import { connect } from 'react-redux';
import Rooms from '../components/rooms';

class JoinableRooms extends React.PureComponent {
  render() {
    return <Rooms rooms={this.props.joinableRooms} currentRoomId={this.props.currentRoomId} heading="Joinable Rooms" />;
  }
}


const mapStateToProps = (state) => {
  return {
    joinableRooms: state.joinableRooms,
    currentUser: state.currentUser,
    currentRoomId: state.currentRoomId,
  };
};


export default connect(mapStateToProps, null)(JoinableRooms);
