import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';

import { fetdhMinOnskeliste, removeWishFromMyList, fetchViewersToMyList } from '../Api';
import { toggleLenkeDialog, endreHeaderTekst } from '../actions/actions';
import OnskeDialog from './LeggTilOnskeDialog';
import AddAllowedFriends from './AddViewersToMyListComponent';

class MinListe extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onEndreHeaderTekst('Rediger ønskeliste');
    this.props.onAbonnerPaaMinOnskeliste();
    this.props.onSubscribeToMyAllowedViewers();
  }

  slettOnske(onske) {
    removeWishFromMyList(onske.key);
  }

  populerMinListe() {
    const { mineOnsker, onToggleLenkeDialog } = this.props;
    return mineOnsker.map(value =>
      <div key={value.onskeTekst + mineOnsker.indexOf(value)}>
        <ListItem>
          <ListItemText
            className='wishText'
            primary={value.onskeTekst}
            secondary={value.url && <a href={value.url} target="_blank" rel="noopener noreferrer">Her kan den kjøpes</a>}
          />
          <ListItemSecondaryAction className='wishIconMenu'>
            <Tooltip title='Endre ønske'>
              <IconButton aria-label="Edit" onClick={() => onToggleLenkeDialog(value)}>
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
    const { innloggetBrukerNavn, mineOnsker, onToggleLenkeDialog } = this.props;
    return (
      <div className="minListe">
        <p>
          Velkommen {innloggetBrukerNavn}
        </p>
        <AddAllowedFriends />
        <div className="addNewWish">
          <Button className="addNewWishButton" variant="contained" color="default" onClick={() => onToggleLenkeDialog(-1)} startIcon={<PlaylistAddIcon />}>Legg til ønske </Button>
        </div>

        <div>
          <Grid>
            <h2>Min ønskeliste</h2>
            <div className="minOnskeliste">
              <List dense={false}>
                {mineOnsker.length > 0 && <Divider />}
                {this.populerMinListe()}
              </List>
              <OnskeDialog />
            </div>
          </Grid>
        </div>
      </div>
    );
  }
}

MinListe.propTypes = {
  onAbonnerPaaMinOnskeliste: PropTypes.func,
  onSubscribeToMyAllowedViewers: PropTypes.func,
  onToggleLenkeDialog: PropTypes.func,
  onEndreHeaderTekst: PropTypes.func,
  innloggetBrukerNavn: PropTypes.string,
  mineOnsker: PropTypes.array
};

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
