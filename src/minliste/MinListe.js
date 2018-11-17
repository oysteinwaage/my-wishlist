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

import { fetdhMinOnskeliste, updateMyList } from '../Api';
import { toggleLenkeDialog, endreHeaderTekst } from '../actions/actions';
import { fjernOnskeFraListe, leggTilNyttOnskeIListe, myWishlistId } from '../utils/util';
import LenkeDialog from './LeggTilLenkeDialog';

let nyttOnskeTekst = '';

class MinListe extends Component {
  componentDidMount() {
    this.props.onEndreHeaderTekst('Rediger ønskeliste');
    this.props.onAbonnerPaaMinOnskeliste(myWishlistId(this.props.innloggetBrukerMail));
  }

  lagreOnske() {
    const { innloggetBrukerMail, mineOnsker } = this.props;
    if (nyttOnskeTekst) {
      updateMyList(myWishlistId(innloggetBrukerMail), leggTilNyttOnskeIListe(mineOnsker, nyttOnskeTekst))
    }
    nyttOnskeTekst = '';
  }

  slettOnske(onske) {
    const { innloggetBrukerMail, mineOnsker } = this.props;
    updateMyList(myWishlistId(innloggetBrukerMail), fjernOnskeFraListe(mineOnsker, onske));
  }

  endreOnske(onske) {
    //const { innloggetBrukerMail, mineOnsker } = this.props;
    // updateMyList(myWishlistId(innloggetBrukerMail), fjernOnskeFraListe(mineOnsker, onske));
    // TODO fikse endring. Men hvordan? popoup-input? rad blir plutselig editerbar?
  }

  onChangeTextField = event => {
    nyttOnskeTekst = event.target.value;
    this.forceUpdate();
  };

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
          <ListItemSecondaryAction>
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
    const { innloggetBrukerMail, mineOnsker } = this.props;
    return (
      <div className="MinListe">
        <p>
          Velkommen {innloggetBrukerMail}
        </p>
        <div className="leggTilNyttOnske">
          <TextField
            id="nyttOnskeFelt"
            label="Legg til nytt ønske"
            className="nyttOnskeFelt"
            value={nyttOnskeTekst}
            onChange={this.onChangeTextField}
            margin="normal"
            variant="outlined"
            onKeyDown={this.onKeyPressed}
          />
          <Button className="leggTilNyttOnskeKnapp" onClick={() => this.lagreOnske()} variant="fab" color="primary" aria-label="Add">
            <AddIcon />
          </Button>
        </div>

        <div>
          <Grid item xs={12} md={6}>
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
  innloggetBrukerMail: state.innloggetBruker.email,
  mineOnsker: state.innloggetBruker.mineOnsker,
});

const mapDispatchToProps = dispatch => ({
  onAbonnerPaaMinOnskeliste: (userId) => dispatch(fetdhMinOnskeliste(userId)),
  onToggleLenkeDialog: (index) => dispatch(toggleLenkeDialog(index)),
  onEndreHeaderTekst: (nyTekst) => dispatch(endreHeaderTekst(nyTekst)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MinListe);
