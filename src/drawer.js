import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Messages from './containers/messages';
import SendMessage from './components/send-message';
import UserRooms from './containers/user-rooms';
import JoinableRooms from './containers/joinable-rooms';
import Users from './containers/users';

const drawerWidth = 320;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
    paddingBottom: 0,
  },
  toolbar: theme.mixins.toolbar,
});

const ClippedDrawer = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <UserRooms />
        <Divider />
        <Users />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.wrapper}>
          <Messages />
          <SendMessage onSubmit={props.onSubmit} onChange={props.onChange} />
        </div>
      </main>
       <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        >
        <JoinableRooms />
      </Drawer>
    </div>
  );
};

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);
