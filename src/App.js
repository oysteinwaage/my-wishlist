import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import './App.css';
import { fetdhUsers } from './Api';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Login from './login/Login';
import MinListe from './minliste/MinListe';

class App extends Component {
  componentDidMount() {
    this.props.hentBrukere();
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <div>
            <AppBar
              title="Login"
            />
          </div>
        </MuiThemeProvider>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/minliste" component={MinListe} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  hentBrukere: () => dispatch(fetdhUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
