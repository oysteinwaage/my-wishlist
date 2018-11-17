import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
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
        <div>
          <TextField
            id="emailFelt"
            margin="normal"
            //variant="outlined"
            label="Fyll inn email-addresse"
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
          <Button variant="contained" color="primary" onClick={() => this.handleClick()} style={style}>
            Logg inn
          </Button>
        </div>
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