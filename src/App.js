import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import Login from './login/Login';
import MinListe from './minliste/MinListe';
import Vennelister from './vennelister/VenneLister';
import AppBar from './components/AppBarComponent';

class App extends Component {

  render() {
    return (
      <div className="App">
        <AppBar />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/minliste" component={MinListe} />
            <Route path="/vennelister" component={Vennelister} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  headerTekst: state.config.headerTekst,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
