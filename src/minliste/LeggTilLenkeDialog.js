import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { updateLinkOnWishOnMyList, updateWishTextOnMyList } from "../Api";
import connect from "react-redux/es/connect/connect";
import { toggleLenkeDialog } from '../actions/actions';

const initState = { url: '', text: '', urlChanged: false, textChanged: false };

class LeggTilLenkeDialog extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  resettState = () => {
    this.setState(initState)
  }

  cancel = () => {
    const { onToggleLenkeDialog } = this.props;
    onToggleLenkeDialog();
    this.resettState();
  }

  onKeyPressed = event => {
    if (event.keyCode === 13) {
      this.saveChanges();
    }
  };

  saveChanges = () => {
    const { openLenkeDialogOnske, onToggleLenkeDialog } = this.props;
    if (this.state.urlChanged) {
      updateLinkOnWishOnMyList(this.state.url, openLenkeDialogOnske.key);
    }
    if (this.state.textChanged) {
      updateWishTextOnMyList(this.state.text, openLenkeDialogOnske.key);
    }
    onToggleLenkeDialog();
    this.resettState();
  };

  render() {
    const { openLenkeDialog, onToggleLenkeDialog, openLenkeDialogOnske } = this.props;
    const defaultUrl = openLenkeDialogOnske && openLenkeDialogOnske.url;
    const defaultText = openLenkeDialogOnske && openLenkeDialogOnske.onskeTekst;
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
              value={this.state.url || (!this.state.urlChanged && defaultUrl) || ''}
              fullWidth
              onChange={(e) => {
                this.setState({ url: e.target.value, urlChanged: true })
              }}
              onKeyDown={this.onKeyPressed}
            />
            <TextField
              autoFocus
              margin="dense"
              id="text"
              label='Endre ønske tekst'
              value={this.state.text || defaultText}
              type="text"
              fullWidth
              onChange={(e) => {
                this.setState({ text: e.target.value, textChanged: true })
              }}
              onKeyDown={this.onKeyPressed}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.cancel()} color="primary">
              Avbryt
            </Button>
            <Button onClick={() => this.saveChanges()} color="primary">
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