import React, { Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Lock from '@material-ui/icons/Lock';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    float: 'right',
  },
  icon: {
    margin: 0,
  },
});

class Rooms extends React.PureComponent {
  render() {
    let items = '';
    const { classes } = this.props;
    const AddRooms = this.props.addRoom ? this.props.addRoom : '';
    const inviteToRooms = this.props.inviteToRooms || '';

    if (this.props.rooms) {
      items = this.props.rooms.map((room, index) => {
        const name = `# ${room.name}`;
        const selected = (room.id === this.props.currentRoomId);
        const link = `/messages/${room.id}`;
        const icon = room.isPrivate ? <ListItemIcon className={classes.icon} ><Lock color="primary"/></ListItemIcon> : '';
        return (
          <ListItem key={index} button selected={selected} component={Link} to={link}>
            <ListItemText primary={name} />
            {icon}
          </ListItem>
        );
      });
    }

    return (
      <Fragment>
        <List component="nav"
            subheader={<ListSubheader component="div">{this.props.heading}
            {AddRooms}
            </ListSubheader>}>
          <div>{items}</div>
        </List>
        {inviteToRooms}

      </Fragment>
    );
  }
}


export default (withStyles(styles)(Rooms));
