import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import WebLinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit'
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';

import { fetdhMinOnskeliste, addWishToMyList, removeWishFromMyList, fetchViewersToMyList } from '../Api';
import { toggleLenkeDialog, endreHeaderTekst } from '../actions/actions';
import LenkeDialog from './LeggTilLenkeDialog';
import AddAllowedFriends from './AddViewersToMyListComponent';

class MinListe extends Component {
  constructor(props) {
    super(props);
    this.state = { nyttOnskeTekst: '' }
  }

  componentDidMount() {
    this.props.onEndreHeaderTekst('Rediger ønskeliste');
    this.props.onAbonnerPaaMinOnskeliste();
    this.props.onSubscribeToMyAllowedViewers();
  }

  lagreOnske() {
    const { nyttOnskeTekst } = this.state;
    if (nyttOnskeTekst) {
      addWishToMyList({ onskeTekst: nyttOnskeTekst });
    }
    this.setState({ nyttOnskeTekst: '' })
  }

  slettOnske(onske) {
    removeWishFromMyList(onske.key);
  }

  endreOnske(onske) {
    //const { mineOnsker } = this.props;
    // updateMyList(fjernOnskeFraListe(mineOnsker, onske));
    // TODO fikse endring. Men hvordan? popoup-input? rad blir plutselig editerbar?
  }

  onKeyPressed = event => {
    if (event.keyCode === 13) {
      this.lagreOnske();
    }
  };

  populerMinListe() {
    const { mineOnsker, onToggleLenkeDialog } = this.props;
    return mineOnsker.map(value =>
      <div key={value.onskeTekst + mineOnsker.indexOf(value)}>
        <ListItem>
          <ListItemText
            primary={value.onskeTekst}
            secondary={value.url && <a href={value.url} target="_blank" rel="noopener noreferrer">Her kan den kjøpes</a>}
          />
          <ListItemSecondaryAction className='wishIconMenu'>
            <Tooltip title='Legg til lenke'>
              <IconButton aria-label="AddLink" onClick={() => onToggleLenkeDialog(value)}>
                <WebLinkIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Endre ønske'>
              <IconButton aria-label="Edit" onClick={() => this.endreOnske(value)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Slett'>
              <IconButton aria-label="Delete" onClick={() => this.slettOnske(value)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </div>,
    );
  }

  render() {
    const { innloggetBrukerNavn, mineOnsker } = this.props;
    return (
      <div className="minListe">
        <p>
          Velkommen {innloggetBrukerNavn}
        </p>
        <AddAllowedFriends />
        <div className="addNewWish">
          <TextField
            id="addNewWishField"
            label="Legg til nytt ønske"
            className="addNewWishField"
            value={this.state.nyttOnskeTekst}
            onChange={(e) => this.setState({ nyttOnskeTekst: e.target.value })}
            margin="normal"
            variant="outlined"
            onKeyDown={this.onKeyPressed}
          />
          <Button className="addNewWishButton" onClick={() => this.lagreOnske()} variant="fab" color="primary" aria-label="Add">
            <AddIcon />
          </Button>
        </div>

        <div>
          <Grid>
            <h2>Min ønskeliste</h2>
            <div className="minOnskeliste">
              <List dense={false}>
                {mineOnsker.length > 0 && <Divider />}
                {this.populerMinListe()}
              </List>
              <LenkeDialog />
            </div>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  innloggetBrukerNavn: state.innloggetBruker.navn,
  mineOnsker: state.innloggetBruker.mineOnsker,
});

const mapDispatchToProps = dispatch => ({
  onAbonnerPaaMinOnskeliste: () => dispatch(fetdhMinOnskeliste()),
  onSubscribeToMyAllowedViewers: () => dispatch(fetchViewersToMyList()),
  onToggleLenkeDialog: (index) => dispatch(toggleLenkeDialog(index)),
  onEndreHeaderTekst: (nyTekst) => dispatch(endreHeaderTekst(nyTekst)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MinListe);
