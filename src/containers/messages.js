import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';


const LinearQuery = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LinearProgress variant="query" />
      <br />
      <LinearProgress color="secondary" variant="query" />
    </div>
  );
};


const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    overflowY: 'scroll',
    height: '480px',
  },
  listItem: {

  },
  avatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: 'red',
  },
});


class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noMessage: false,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.messages.length > 0) {
      return {
        messages: nextProps.messages,
      };
    }
    return {
      loading: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.messages.length === 0) {
        setTimeout(() => {
          if (this.props.messages.length === 0) {
            this.setState({ noMessage: true });
          }
        }, 3000);
      } else {
        this.setState({ noMessage: false });
      }
    }
  }

  render() {
    const { classes } = this.props;
    const noMessage = this.state.noMessage ? <div>No messages found</div> : '';
    if (this.props.messages.length === 0 && (!this.state.noMessage)) {
      return (
        <LinearQuery classes={classes} />
      );
    }

    return (
      <div className={classes.root}>
        {noMessage}
        <List>
          {this.props.messages.map((message, index) => {
            const inLineStyles = {
              avatar: {
                backgroundColor: message.sender.customData.avatar_color,
              },
            };
            return (
              <ListItem key={index} dense button className={classes.listItem}>
                <Avatar className={classes.avatar} style={inLineStyles.avatar}>
                  {message.sender.name.charAt(0).toUpperCase()}
                </Avatar>
                <ListItemText primary={message.sender.name} secondary={message.text} />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    loading: true,
  };
};

export default connect(mapStateToProps, null)(withStyles(styles)(Messages));
