import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class AppBarComponent extends Component {

  render() {
    const { classes } = this.props
    console.log(this.props);
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {this.props.headerTekst}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const mapStateToProps = state => ({
  headerTekst: state.config.headerTekst,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppBarComponent));
