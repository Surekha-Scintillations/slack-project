import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


const styles = {
  button: {
    float: 'right',
    marginTop: '4px',
  },
  dialog: {
    width: '400px',
  },
};

export default class AddNewRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      inputValue: '',
      isPrivate: false,
    };
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false, inputValue: '', isPrivate: false });
  }

  onSubmit(event) {
    event.preventDefault();
    const name = this.state.inputValue;
    const { isPrivate } = this.state;
    if (name !== '') {
      this.props.onRoomCreation({ name, isPrivate });
      this.handleClose();
    }
  }

  onChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleSwitchChange(event) {
    this.setState({ isPrivate: event.target.checked });
  }

  render() {
    return (
      <Fragment>
        <Button mini align="right" variant="fab" color="primary" aria-label="Add" style={styles.button} onClick={this.handleClickOpen.bind(this)}>
            <AddIcon />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose.bind(this)}
          aria-labelledby="form-dialog-title"
          maxWidth='sm'
          fullWidth
        >
          <form onSubmit={this.onSubmit.bind(this)}>
          <DialogTitle id="form-dialog-title">Create Room</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the room name
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              required
              type="text"
              fullWidth
              onChange={this.onChange.bind(this)}
              value={this.state.inputValue}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={this.state.isPrivate}
                  onChange={this.handleSwitchChange.bind(this)}
                  value="checkedB"
                  color="primary"
                />
              }
              label="Is Private?"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose.bind(this)} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Create
            </Button>
          </DialogActions>
          </form>
        </Dialog>
      </Fragment>
    );
  }
}
