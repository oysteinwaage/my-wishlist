import React, { Component } from 'react';
import { connect } from 'react-redux';
import {endreHeaderTekst} from "../actions/actions";

class Profil extends Component {
  componentDidMount() {
    const {onEndreHeaderTekst } = this.props;
    onEndreHeaderTekst();
  }

  render() {
    return (
      <div className="ProfilSide">
        Her kommer funksjonalitet rundt din bruker mm.
      </div>
    );
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  onEndreHeaderTekst: () => dispatch(endreHeaderTekst('Profil')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profil);

