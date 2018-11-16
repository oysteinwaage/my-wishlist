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
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import Divider from '@material-ui/core/Divider';

import { fetdhMinOnskeliste, updateMyList } from '../Api';
import { fjernOnskeFraListe, leggTilNyttOnskeIListe, myWishlistId } from '../utils/util';

let nyttOnskeTekst = '';

class MinListe extends Component {
  componentDidMount() {
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

  populerMinListe() {
    const { mineOnsker } = this.props;
    return mineOnsker.map(value =>
      <div key={value.onskeTekst}>
        <ListItem>
          <ListItemText
            primary={value.onskeTekst}
            secondary={value.url ? 'lag tekst med url?' : null}
          />
          <ListItemSecondaryAction>
            <IconButton aria-label="Edit" onClick={() => this.endreOnske(value)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="Delete" onClick={() => this.slettOnske(value)}>
              <DeleteIcon />
            </IconButton>
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
          />
          <Button className="leggTilNyttOnskeKnapp" onClick={() => this.lagreOnske()} variant="fab" color="primary" aria-label="Add">
            <AddIcon />
          </Button>
        </div>

        <div>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className="overskrift">
              Min ønskeliste
            </Typography>
            <div className="minOnskeliste">
              <List dense={false}>
                {mineOnsker.length > 0 && <Divider />}
                {this.populerMinListe()}
              </List>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(MinListe);
