import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { updateMyList } from "../Api";
import connect from "react-redux/es/connect/connect";
import { toggleLenkeDialog } from '../actions/actions';
import { myWishlistId, leggTilLenkeTilOnske } from '../utils/util';

let url = '';

class LeggTilLenkeDialog extends Component {

  onChangeTextField = e => {
    url = e.target.value;
  };

  lagreLenke = () => {
    const { innloggetBrukerMail, mineOnsker, openLenkeDialogOnske, onToggleLenkeDialog } = this.props;
    updateMyList(myWishlistId(innloggetBrukerMail), leggTilLenkeTilOnske(mineOnsker, url, openLenkeDialogOnske));
    onToggleLenkeDialog();
    url = '';
  };

  render() {
    const { openLenkeDialog, onToggleLenkeDialog } = this.props;
    return (
      <div>
        <Dialog
          open={openLenkeDialog}
          onClose={onToggleLenkeDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Legg til lenke</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Her kan du legge til lenke til et sted hvor man kan få kjøpt det du ønsker deg.
              Har du lagt inn en lenke og ønsker å fjerne den igjen, bare lagre uten å skrive inn noe i feltet.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="link"
              label="http://www.eksempel.com"
              type="url"
              fullWidth
              onChange={this.onChangeTextField}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onToggleLenkeDialog} color="primary">
              Avbryt
            </Button>
            <Button onClick={() => this.lagreLenke()} color="primary">
              Lagre
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  innloggetBrukerMail: state.innloggetBruker.email,
  mineOnsker: state.innloggetBruker.mineOnsker,
  openLenkeDialog: state.innloggetBruker.openLenkeDialog,
  openLenkeDialogOnske: state.innloggetBruker.openLenkeDialogOnske,
});

const mapDispatchToProps = dispatch => ({
  onToggleLenkeDialog: () => dispatch(toggleLenkeDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeggTilLenkeDialog);