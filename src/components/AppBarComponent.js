import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import GiftIcon from '@material-ui/icons/CardGiftcard';
import Exit from '@material-ui/icons/ExitToApp';
import ListeIcon from '@material-ui/icons/FormatListBulleted';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { logOut } from '../Api';

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

class AppBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { drawerOpen: false }
  }

  menyValgTrykket(valg) {
    switch (valg) {
      case 'venneLister':
        this.props.onAapneVennersListerSide();
        break;
      case 'minListe':
        this.props.onAapneMinOnskelisteSide();
        break;
      case 'loggUt':
        this.props.onLogOut();
        break;
      default:
      //doNothing
    }
    this.setState({ drawerOpen: false })
  }

  render() {
    const { classes, headerTekst } = this.props;
    const visHamburgerMeny = headerTekst !== 'Innlogging' && headerTekst !== 'Opprett ny bruker';
    return (
      <AppBar position="static">
        <Toolbar>
          {visHamburgerMeny &&
          <IconButton className={classes.menuButton} onClick={() => this.setState({ drawerOpen: true })} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          }
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {this.props.headerTekst}
          </Typography>
        </Toolbar>
        <SwipeableDrawer open={this.state.drawerOpen} onOpen={() => this.setState({ drawerOpen: true })} onClose={() => this.setState({ drawerOpen: false })}
                         disableBackdropTransition={!iOS} disableDiscovery={iOS}>
          <div className={classes.list}>
            <List>
              <ListItem button onClick={() => this.menyValgTrykket('minListe')} key='minListe'>
                <ListItemIcon>
                  <div><ListeIcon /></div>
                </ListItemIcon>
                <ListItemText primary='Min ønskeliste' />
              </ListItem>
              <Divider />
              <ListItem button onClick={() => this.menyValgTrykket('venneLister')} key='venneLister'>
                <ListItemIcon>
                  <div><GiftIcon /></div>
                </ListItemIcon>
                <ListItemText primary='Venners lister' />
              </ListItem>
              <Divider />
              <ListItem button onClick={() => this.menyValgTrykket('loggUt')} key='loggUt'>
                <ListItemIcon>
                  <div><Exit /></div>
                </ListItemIcon>
                <ListItemText primary='Logg ut' />
              </ListItem>
              <Divider />
            </List>
          </div>
        </SwipeableDrawer>
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
  list: {
    width: 250,
  },
};

const mapStateToProps = state => ({
  headerTekst: state.config.headerTekst,
});

const mapDispatchToProps = dispatch => ({
  onAapneVennersListerSide: () => dispatch(push('vennelister')),
  onAapneMinOnskelisteSide: () => dispatch(push('minliste')),
  onLogOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppBarComponent));
