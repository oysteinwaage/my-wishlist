import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import logo from "../img/logo.svg";
import { loggInn } from "../Api";
import connect from "react-redux/es/connect/connect";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  handleClick() {
    this.props.onLoggInn(this.state.username, this.state.password);
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Ønskelisten er her!! God Jul :D
          </p>
        </header>
        <MuiThemeProvider>
          <div>
            <TextField
              hintText="Fyll inn email-addresse"
              floatingLabelText="E-Mail"
              onChange={(event, newValue) => this.setState({ username: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Fyll inn passord"
              floatingLabelText="Passord"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <RaisedButton label="Logg inn" primary={true} style={style}
                          onClick={(event) => this.handleClick(event)} />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};
const mapDispatchToProps = dispatch => ({
  onLoggInn: (brukernavn, passord) => dispatch(loggInn(brukernavn, passord)),
});

export default connect(null, mapDispatchToProps)(Login);