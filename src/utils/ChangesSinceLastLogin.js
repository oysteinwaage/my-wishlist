import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {updateLastSeenVersion} from '../Api';

const currentVersion = 2.2;

const changes = [
    {
        version: 2.0,
        releaseDate: "19.11.2020",
        changes: [
            "Single-sign-on: Forblir nå pålogget til man eksplisitt logger ut slik at man ikke trenger å logge inn på nytt hver gang",
            "Antall: Kan nå legge til antall på et ønske",
            "Vennevelger: Oppdatert velgeren av hvem som kan se din liste til å bli enklere og finere"
        ]
    },
    {
        version: 2.1,
        releaseDate: "21.11.2020",
        changes: ["Spinner: Viser nå spinner mens data laster eller man venter på sjekken om man er logget inn fra før"]
    },
    {
        version: 2.2,
        releaseDate: "22.11.2020",
        changes: [
            "Endringer-liste: Denne listen du ser nå med endringer siden sist innlogging",
            "Favoritter: Mulig å stjerne-markere de ønskene du har mest lyst på. Disse vil også legges øverst i listen din for å videre fremheve dem"
        ]
    }
];

class ChangesSinceLastLogin extends Component {

    handleClose = () => this.props.onUpdateLastSeenVersion(currentVersion, this.props.myUserDbKey);

    render() {
        const {lastSeenVersion} = this.props;
        return (
            <Dialog
                open={currentVersion > lastSeenVersion && window.location.pathname !== '/'}
                scroll='paper'
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Endringer siden sist!</DialogTitle>
                <DialogContent dividers={true}>
                    {changes.map(change =>
                        <DialogContentText
                            id="scroll-dialog-description"
                            tabIndex={-1}
                            className="changesContent"
                            key={change.version}
                        >
                            <span className="changesHeader">
                                {"v.".concat(change.version, " - ", change.releaseDate)}
                            </span>
                            {change.changes.map(text =>
                                <li className="changesText" key={text.split(':')[0]}>
                                  <span className="header">{text.split(':')[0].concat(":")}</span>
                                  <span className="text">{text.split(':')[1]}</span>
                                </li>
                            )}
                        </DialogContentText>
                    )
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.handleClose()} color="primary">
                        Lukk
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ChangesSinceLastLogin.propTypes = {
    onUpdateLastSeenVersion: PropTypes.func,
    lastSeenVersion: PropTypes.number,
    myUserDbKey: PropTypes.string
};

const mapStateToProps = state => ({
    lastSeenVersion: state.innloggetBruker.lastSeenVersion,
    myUserDbKey: state.innloggetBruker.userDbKey
});

const mapDispatchToProps = dispatch => ({
    onUpdateLastSeenVersion: (currentVersion, dbKey) => dispatch(updateLastSeenVersion(currentVersion, dbKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangesSinceLastLogin);

