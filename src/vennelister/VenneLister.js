import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';

import { endreHeaderTekst } from '../actions/actions';

class VenneLister extends Component {
  componentDidMount() {
    this.props.onEndreHeaderTekst('Venners lister');
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
    const enPersonsOnsker = [];
    return (
      <div className="VennersListeSide">
        <Grid item xs={12} md={6}>
          <h2>XXX's ønskeliste</h2>
          <div className="minOnskeliste">
            <List dense={false}>
              {enPersonsOnsker.length > 0 && <Divider />}
              {this.populerOnskeliste(enPersonsOnsker)}
            </List>
          </div>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onEndreHeaderTekst: (nyTekst) => dispatch(endreHeaderTekst(nyTekst)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VenneLister);
