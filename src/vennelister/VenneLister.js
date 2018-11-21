import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';

import ListeVelger from './ListeVelger';
import { endreHeaderTekst } from '../actions/actions';
import { fetdhUsers, updateWishlistFor } from '../Api';
import { markerOnskeSomKjopt, finnPersonMedUid, erInnloggetBrukersUid } from '../utils/util';

class VenneLister extends Component {
  componentDidMount() {
    this.props.onEndreHeaderTekst('Venners lister');
    this.props.onHentBrukere();
  }

  onMarkerOnskeSomKjopt = onske => event => {
    const { valgtVenn, valgtVennsListe, onUpdateWishlistFor } = this.props;

    onUpdateWishlistFor(valgtVenn.uid, markerOnskeSomKjopt(valgtVennsListe, onske, event.target.checked));
  }

  lenkeEllerKjoptAv(onske) {
    if (onske.kjopt) {
      return 'Kjøpt av ' + finnPersonMedUid(onske.kjoptAv, this.props.mineVenner).navn;
    }
    return onske.url && (<a href={onske.url} target="_blank" rel="noopener noreferrer">Her kan den kjøpes</a>);
  }

  populerOnskeliste(onskeliste) {
    const { classes } = this.props;
    return onskeliste.map(onske =>
      <div key={onske.onskeTekst + onskeliste.indexOf(onske)} className={onske.kjopt ? classes.onskeKjopt : ''}>
        <ListItem className='onskeKjopt'>
          <ListItemText
            primary={onske.onskeTekst}
            secondary={this.lenkeEllerKjoptAv(onske)}
          />
          <ListItemSecondaryAction>
            <Tooltip title='Kjøpt'>
              <Checkbox checked={onske.kjopt} disabled={onske.kjopt && !erInnloggetBrukersUid(onske.kjoptAv)} onChange={this.onMarkerOnskeSomKjopt(onske)} />
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </div>,
    );
  }

  render() {
    const { valgtVenn, valgtVennsListe } = this.props;
    return (
      <div className="VennersListeSide">
        <ListeVelger />
        <Grid item xs={12} md={6}>
          <h2>{valgtVenn && valgtVenn.navn && `Ønskelisten til ${valgtVenn.navn}`}</h2>
          <div className="minOnskeliste">
            <List dense={false}>
              {valgtVennsListe.length > 0 && <Divider />}
              {this.populerOnskeliste(valgtVennsListe)}
            </List>
          </div>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  valgtVenn: state.vennersLister.valgtVenn,
  mineVenner: state.vennersLister.venner,
  valgtVennsListe: state.vennersLister.valgtVennsListe || [],
});

const mapDispatchToProps = dispatch => ({
  onEndreHeaderTekst: (nyTekst) => dispatch(endreHeaderTekst(nyTekst)),
  onHentBrukere: () => dispatch(fetdhUsers()),
  onUpdateWishlistFor: (uid, newList) => dispatch(updateWishlistFor(uid, newList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VenneLister);

