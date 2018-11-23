import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { updateLinkOnWishOnMyList } from "../Api";
import connect from "react-redux/es/connect/connect";
import { toggleLenkeDialog } from '../actions/actions';

class LeggTilLenkeDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { url: '' };
  }

  lagreLenke = () => {
    const { openLenkeDialogOnske, onToggleLenkeDialog } = this.props;
    updateLinkOnWishOnMyList(this.state.url, openLenkeDialogOnske.key);
    onToggleLenkeDialog();
    this.setState({url: ''});
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
              onChange={(e) => this.setState({ url: e.target.value })}
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
  openLenkeDialog: state.innloggetBruker.openLenkeDialog,
  openLenkeDialogOnske: state.innloggetBruker.openLenkeDialogOnske,
});

const mapDispatchToProps = dispatch => ({
  onToggleLenkeDialog: () => dispatch(toggleLenkeDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeggTilLenkeDialog);