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
import { fetdhUsers } from '../Api';

class VenneLister extends Component {
  componentDidMount() {
    this.props.onEndreHeaderTekst('Venners lister');
    this.props.onHentBrukere();
  }

  populerOnskeliste(onskeliste) {
    return onskeliste.map(value =>
      <div key={value.onskeTekst + onskeliste.indexOf(value)}>
        <ListItem>
          <ListItemText
            primary={value.onskeTekst}
            secondary={value.url && <a href={value.url} target="_blank" rel="noopener noreferrer">Her kan den kjøpes</a>}
          />
          <ListItemSecondaryAction>
            <Tooltip title='Kjøpt'>
              <Checkbox/>
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
          <h2>{`Ønskelisten til ${valgtVenn && valgtVenn.navn}`}</h2>
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
  valgtVennsListe: state.vennersLister.valgtVennsListe || [],
});

const mapDispatchToProps = dispatch => ({
  onEndreHeaderTekst: (nyTekst) => dispatch(endreHeaderTekst(nyTekst)),
  onHentBrukere: () => dispatch(fetdhUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VenneLister);
