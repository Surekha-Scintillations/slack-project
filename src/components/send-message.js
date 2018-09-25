import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import ContentSend from '@material-ui/icons/Send';

const styles = () => ({
  form: {
    display: 'flex',
    marginTop: 'auto',
    paddingLeft: '24px',
  },
  container: {
    background: '#fff',
    borderTop: '1px #4C758F solid',
    marginLeft: '-24px',
    marginRight: '-24px',
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  input: {
    color: 'inherit',
    background: 'none',
    outline: 'none',
    width: '100%',
    fontSize: 14,
    border: 'none',
  },
  sendIcon: {
    fontSize: '24px',
  },
});

class SendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.text);
    this.setState({ text: '' });
  }

  onChange(e) {
    this.setState({ text: e.target.value });
    if (this.props.onChange) {
      this.props.onChange();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="Type some message and ENTER"
              onChange={this.onChange}
              value={this.state.text}
              className={classes.input}
            />
           <IconButton className={classes.sendIcon} color="primary" aria-label="Send">
            <ContentSend onClick={this.onSubmit}/>
          </IconButton>
           {}
          </form>
      </div>
    );
  }
}

export default withStyles(styles)(SendMessage);
