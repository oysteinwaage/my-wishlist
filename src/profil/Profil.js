import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {endreHeaderTekst} from "../actions/actions";
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl";
import {updateMyMeasumentOnProfile, fetchUsersMeasurements} from "../Api";
import {finnLabelForStrl, measurementKeys} from "../utils/util";

class Profil extends Component {
    constructor(props) {
        super(props);
        this.state = {sko: null, bukse: null, genser_tskjorte: null, skjorte: null, bh: null, hansker: null, boksershorts: null, hatt: null};
    }

    componentDidMount() {
        const {myUserDbKey, onEndreHeaderTekst, onFetchUsersMeasurements} = this.props;
        onEndreHeaderTekst();
        onFetchUsersMeasurements(myUserDbKey);
    }

    lagreNyttMaal = (sizeKey, newSize) => {
        const {myUserDbKey} = this.props;
        this.setState({[sizeKey]: newSize});
        updateMyMeasumentOnProfile(myUserDbKey, newSize, sizeKey);
    };

    render() {
        const {measurements} = this.props;
        return (
            <div className="ProfilSide">
                <div className="ProfilSide__egne-maal">
                    <h3>Mine generelle mål</h3>
                    <p className="ProfilSide__egne-maal__infotekst">Fyll inn de mål som passer for deg, de du lar stå tomme vil ikke bli vist for andre</p>
                    {Object.values(measurementKeys).map(sizeKey => {
                        return (
                            <FormControl style={{marginRight: 15}} key={sizeKey}>
                                <TextField
                                    margin="dense"
                                    id={sizeKey}
                                    label={finnLabelForStrl(sizeKey)}
                                    value={this.state[sizeKey] !== null ? this.state[sizeKey] : (measurements && measurements[sizeKey]) || ''}
                                    type="text"
                                    onChange={(e) => {
                                        this.setState({[sizeKey]: e.target.value})
                                    }}
                                    onBlur={(e) => this.lagreNyttMaal(sizeKey, e.target.value)}
                                    onKeyDown={this.onKeyPressed}
                                />
                            </FormControl>
                        );
                    })}
                </div>
            </div>
        );
    }
}

Profil.propTypes = {
    myUserDbKey: PropTypes.string,
    onEndreHeaderTekst: PropTypes.func,
    onFetchUsersMeasurements: PropTypes.func,
    measurements: PropTypes.object
};

const mapStateToProps = (state) => ({
    myUserDbKey: state.innloggetBruker.userDbKey,
    measurements: state.innloggetBruker.measurements
});

const mapDispatchToProps = dispatch => ({
    onEndreHeaderTekst: () => dispatch(endreHeaderTekst('Profil')),
    onFetchUsersMeasurements: (userDbKey) => dispatch(fetchUsersMeasurements(userDbKey))

});

export default connect(mapStateToProps, mapDispatchToProps)(Profil);

