import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dialog: {
    width: '400px',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});


class AddUsersToRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectValue: '',
      isPrivate: false,
      name: [],
    };
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false, selectValue: '', isPrivate: false });
  }

  onSubmit(event) {
    event.preventDefault();
    const roomId = this.state.selectValue;
    const userIds = this.state.name;
    if (roomId && userIds.length > 0) {
      this.props.onUsersAddedToRoom({ roomId, userIds });
      this.handleClose();
    }
  }

  handleSelectChange(event) {
    this.setState({ selectValue: event.target.value });
  }

  handleUserChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSwitchChange(event) {
    this.setState({ isPrivate: event.target.checked });
  }

  render() {
    const privateRooms = this.props.rooms.filter(room => room.isPrivate
     && (room.createdByUserId === this.props.currentUser.id));
    if (privateRooms.length === 0) {
      return '';
    }
    const { classes, theme } = this.props;
    const menuItems = privateRooms.map(room => <MenuItem key={room.id}
      value={room.id}>{room.name}</MenuItem>);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };

    return (
      <Fragment>
        <Button color="primary" onClick={this.handleClickOpen.bind(this)}>
          Add Users to Private rooms
         </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose.bind(this)}
          aria-labelledby="form-dialog-title"
          maxWidth='sm'
          fullWidth
        >
          <form onSubmit={this.onSubmit.bind(this)}>
          <DialogTitle id="form-dialog-title">Add Users To Private Room</DialogTitle>
          <DialogContent>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="room">Select Room</InputLabel>
              <Select
                value={this.state.selectValue}
                onChange={this.handleSelectChange.bind(this)}
                inputProps={{
                  name: 'room',
                  id: 'room',
                }}
              >
                {menuItems}
              </Select>
            </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-chip">Users</InputLabel>
            <Select
              multiple
              value={this.state.name}
              onChange={this.handleUserChange.bind(this)}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {this.props.users.map(user => (
                <MenuItem
                  key={user.id}
                  value={user.id}
                  style={{
                    fontWeight:
                      this.state.name.indexOf(user.id) === -1
                        ? theme.typography.fontWeightRegular
                        : theme.typography.fontWeightMedium,
                  }}
                >
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose.bind(this)} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Add
            </Button>
          </DialogActions>
          </form>
        </Dialog>
      </Fragment>
    );
  }
}

AddUsersToRoom.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AddUsersToRoom);
