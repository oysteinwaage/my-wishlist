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
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  innsendigKnappTrykket() {
    if (this.props.visOpprettNyBruker) {
      const suksess = this.props.onRegistrerNyBruker(this.state.username, this.state.password, this.state.name);
      if (suksess) this.setState(initState);
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
          <p>
            Ønskelisten er her!! God Jul :D
          </p>
        </header>
        <div>
          {visOpprettNyBruker &&
          (<div>
            <TextField
              id="navnFelt"
              margin="normal"
              //variant="outlined"
              label="Fyll inn navn"
              onChange={(event) => this.setState({ name: event.target.value })}
            />
          </div>)
          }

          <TextField
            id="emailFelt"
            margin="normal"
            //variant="outlined"
            label="Fyll inn email-adresse"
            onChange={(event) => this.setState({ username: event.target.value })}
          />
          <br />
          <TextField
            id="passordFelt"
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
  onRegistrerNyBruker: (email, passord, name) => dispatch(opprettNyBruker(email, passord, name)),
  onEndreHeaderTekst: (nyTekst) => dispatch(endreHeaderTekst(nyTekst)),
  onToggleVisOpprettBruker: () => dispatch(toggleVisOpprettBruker()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);