import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {addWishToMyList, updateLinkOnWishOnMyList, updateWishTextOnMyList} from "../Api";
import connect from "react-redux/es/connect/connect";
import {toggleLenkeDialog} from '../actions/actions';
import {opprettUrlAv} from "../utils/util";

const initState = {url: null, text: null, urlChanged: false, textChanged: false};

class LeggTilOnskeDialog extends Component {
    constructor(props) {
        super(props);
        this.state = initState;
    }

    resettState = () => {
        this.setState(initState)
    };

    cancel = () => {
        const {onToggleLenkeDialog} = this.props;
        onToggleLenkeDialog();
        this.resettState();
    };

    onKeyPressed = event => {
        if (event.keyCode === 13 && this.state.text) {
            this.saveChanges();
        }
    };

    saveChanges = () => {
        const {openLenkeDialogOnske, onToggleLenkeDialog} = this.props;
        if (!openLenkeDialogOnske.key) {
          addWishToMyList(
              {
                onskeTekst: this.state.text,
                url: opprettUrlAv(this.state.url)
              }
          )
        } else {
            if (this.state.urlChanged) {
                updateLinkOnWishOnMyList(this.state.url, openLenkeDialogOnske.key);
            }
            if (this.state.textChanged && this.state.text) {
                updateWishTextOnMyList(this.state.text, openLenkeDialogOnske.key);
            }
        }
        onToggleLenkeDialog();
        this.resettState();
    };

    render() {
        const {openLenkeDialog, onToggleLenkeDialog, openLenkeDialogOnske} = this.props;
        const defaultUrl = openLenkeDialogOnske && openLenkeDialogOnske.url;
        const defaultText = openLenkeDialogOnske && openLenkeDialogOnske.onskeTekst;
        const erNyttOnske = !(openLenkeDialogOnske && openLenkeDialogOnske.key);

        return (
            <div>
                <Dialog
                    open={openLenkeDialog}
                    onClose={onToggleLenkeDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                      {erNyttOnske ? "Legg til ønske" :  "Oppdater ønske"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                          { erNyttOnske ? "Ønsketekst er eneste obligatoriske felt, men jo mer informasjon du legger inn " +
                              "jo mer sannsynlig er det at du får det du faktisk ønsker deg! :)"
                              : "Har du lagt inn en lenke og ønsker å fjerne den igjen, bare tøm feltet og trykk lagre."
                          }
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="text"
                            label='Hva ønsker du deg'
                            value={this.state.text !== null ? this.state.text : defaultText}
                            type="text"
                            fullWidth
                            onChange={(e) => {
                                this.setState({text: e.target.value, textChanged: true})
                            }}
                            onKeyDown={this.onKeyPressed}
                        />
                        <TextField
                            margin="dense"
                            id="link"
                            label="lenke - http://www.eksempel.com"
                            type="url"
                            value={this.state.url || (!this.state.urlChanged && defaultUrl) || ''}
                            fullWidth
                            onChange={(e) => {
                                this.setState({url: e.target.value, urlChanged: true})
                            }}
                            onKeyDown={this.onKeyPressed}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.cancel()} color="primary">
                            Avbryt
                        </Button>
                        <Button disabled={!this.state.text && !openLenkeDialogOnske.onskeTekst || this.state.text === ""} onClick={() => this.saveChanges()} color="primary">
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

export default connect(mapStateToProps, mapDispatchToProps)(LeggTilOnskeDialog);
