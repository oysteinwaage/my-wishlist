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
import { fetdhUsers, updateWishOnListWith } from '../Api';
import { erInnloggetBrukersUid, myWishlistId, myName } from '../utils/util';

const kjoptOnskeClassname = onske => onske.kjopt ? erInnloggetBrukersUid(onske.kjoptAv) ? 'onskeKjopt kjoptAvDeg' : 'onskeKjopt' : '';

class VenneLister extends Component {
  componentDidMount() {
    this.props.onEndreHeaderTekst('Venners lister');
    this.props.onHentBrukere();
  }

  onMarkerOnskeSomKjopt = onske => event => {
    const { valgtVenn } = this.props;
    const newValues = {
      kjopt: event.target.checked,
      kjoptAv: event.target.checked ? myWishlistId() : '',
      kjoptAvNavn: event.target.checked ? myName() : '',
    };
    updateWishOnListWith(newValues, onske, valgtVenn.uid);
  }

  lenkeEllerKjoptAv(onske) {
    if (onske.kjopt) {
      return 'Tatt av ' + (erInnloggetBrukersUid(onske.kjoptAv) ? 'deg' : onske.kjoptAvNavn);
    }
    return onske.url && (<a href={onske.url} target="_blank" rel="noopener noreferrer">Her kan den kjøpes</a>);
  }

  populerOnskeliste(onskeliste) {
    return onskeliste.map(onske =>
      <div key={onske.onskeTekst + onskeliste.indexOf(onske)}>
        <ListItem className={kjoptOnskeClassname(onske)}>
          <ListItemText
            className={onske.kjopt ? 'onskeKjoptTekst' : ''}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(VenneLister);

