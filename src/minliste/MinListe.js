import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {

  render() {
    return (
      <div className="MinListe">
        <p>
          Velkommen {this.props.innloggetBrukerMail}
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  innloggetBrukerNavn: state.innloggetBruker.navn,
  innloggetBrukerMail: state.innloggetBruker.email,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
