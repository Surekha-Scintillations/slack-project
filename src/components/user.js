import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
  ListItemText: {
    paddingLeft: '20px',
  },
};

class User extends Component {
  render() {
    return (
      <ListItem button>
        <ListItemText primary={this.props.user.name} className={this.props.user.presence.state}
        style={styles.ListItemText} />
      </ListItem>
    );
  }
}

export default User;
