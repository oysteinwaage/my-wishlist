import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import logo from '../img/logo.svg';
import { loggInn, opprettNyBruker } from '../Api';
import { endreHeaderTekst, toggleVisOpprettBruker } from '../actions/actions';

const initState = {
  username: '',
  password: '',
  name: '',
  firstName: '',
  lastName: '',
  nameMissing: false,
  firstNameMissing: false,
  lastNameMissing: false,
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  innsendigKnappTrykket() {
    if (this.props.visOpprettNyBruker) {
      let firstNameMissing = this.state.firstName === '';
      let lastNameMissing = this.state.lastName === '';
      if (firstNameMissing || lastNameMissing) {
        this.setState({ firstNameMissing: firstNameMissing, lastNameMissing: lastNameMissing })
      } else {
        const suksess = this.props.onRegistrerNyBruker(this.state.username, this.state.password, this.state.firstName, this.state.lastName);
        if (suksess) this.setState(initState);
      }
    } else {
      this.props.onLoggInn(this.state.username, this.state.password);
    }
  }

  endreVisningTrykket() {
    const { visOpprettNyBruker, onToggleVisOpprettBruker, onEndreHeaderTekst } = this.props;
    const nyHeaderTekst = visOpprettNyBruker ? 'Innlogging' : 'Opprett ny bruker';
    onEndreHeaderTekst(nyHeaderTekst);
    onToggleVisOpprettBruker();
  }

  render() {
    const { visOpprettNyBruker } = this.props;
    const innsendingKnappTekst = visOpprettNyBruker ? 'Registrer bruker' : 'Logg inn';
    const endreVisningKnappTekst = visOpprettNyBruker ? 'Tilbake til login' : 'Opprett ny bruker';
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div>
          {visOpprettNyBruker &&
          (<div>
            <TextField
              id="firstNameField"
              className="inputTextField"
              margin="normal"
              label="Fyll inn fornavn"
              required
              error={this.state.firstNameMissing}
              onChange={(event) => this.setState({ firstName: event.target.value, firstNameMissing: false })}
            />
            <br />
            <TextField
              id="lastNameField"
              className="inputTextField"
              margin="normal"
              label="Fyll inn etternavn"
              required
              error={this.state.lastNameMissing}
              onChange={(event) => this.setState({ lastName: event.target.value, lastNameMissing: false })}
            />
          </div>)
          }

          <TextField
            id="emailFelt"
            className="inputTextField"
            margin="normal"
            label="Fyll inn email-adresse"
            onChange={(event) => this.setState({ username: event.target.value })}
          />
          <br />
          <TextField
            id="passordFelt"
            className="inputTextField"
            type="password"
            label="Fyll inn passord"
            onChange={(event) => this.setState({ password: event.target.value })}
          />
          <br />
          <Button variant="contained" color="primary" onClick={() => this.innsendigKnappTrykket()} style={style}>
            {innsendingKnappTekst}
          </Button>
        </div>
        <Button variant="outlined" onClick={() => this.endreVisningTrykket()}>
          {endreVisningKnappTekst}
        </Button>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

const mapStateToProps = state => ({
  visOpprettNyBruker: state.config.visOpprettNyBruker,
});

const mapDispatchToProps = dispatch => ({
  onLoggInn: (brukernavn, passord) => dispatch(loggInn(brukernavn, passord)),
  onRegistrerNyBruker: (email, passord, firstName, lastName) => dispatch(opprettNyBruker(email, passord, firstName, lastName)),
  onEndreHeaderTekst: (nyTekst) => dispatch(endreHeaderTekst(nyTekst)),
  onToggleVisOpprettBruker: () => dispatch(toggleVisOpprettBruker()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);