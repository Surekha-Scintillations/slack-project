import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import User from '../components/user';

class Users extends Component {
  renderUsers() {
    const users = this.props.users.map((user, index) => {
      return (
        <User key={index} user={user} />
      );
    });
    return (
      <List component="nav"
          subheader={<ListSubheader component="div">Users</ListSubheader>}>
        {users}
      </List>
    );
  }

  render() {
    if (this.props.users) {
      return this.renderUsers();
    }
    return '';// <p>Loading...</p>
  }
}


const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return bindActionCreators({connectChatkit}, dispatch);
// }

export default connect(mapStateToProps, null)(Users);
