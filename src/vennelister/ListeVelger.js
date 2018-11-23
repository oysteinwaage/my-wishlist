import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { fetdhOnskelisteForUid } from '../Api';
import { setValgtVenn } from '../actions/actions';
import { myWishlistId } from "../utils/util";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});


class ListeVelger extends Component {
  constructor(props) {
    super(props);
    this.state = { valgtVennUid: '' }
  }

  handleChange = () => event => {
    const valgtBrukerUid = event.target.value;
    if (valgtBrukerUid !== '') {
      this.setState({ valgtVennUid: event.target.value });
      this.props.onHentValgtVennsListe(valgtBrukerUid);
      this.props.onSettValgtVenn(this.finnValgtVennObjekt(valgtBrukerUid)[0]);
    }
  }

  finnValgtVennObjekt = (valgtUid) => {
    return this.props.mineVenner.filter(x => x.uid === valgtUid)
  }

  render() {
    const { classes, mineVenner } = this.props;
    // TODO midlertidig fix for å ikke få opp egen liste
    const venneliste = mineVenner.filter(b => b.uid !== myWishlistId());
    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="navn-native-simple">Velg venn</InputLabel>
          <Select
            native
            value={this.state.valgtVennUid}
            onChange={this.handleChange()}
            inputProps={{
              name: 'navn',
              id: 'navn-native-simple',
            }}
          >
            <option value="" />
            {venneliste.map(venn => {
              return (<option key={venn.uid} value={venn.uid}>{venn.navn}</option>);
            })}
          </Select>
        </FormControl>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mineVenner: state.vennersLister.venner,
});

const mapDispatchToProps = dispatch => ({
  onHentValgtVennsListe: (uid) => dispatch(fetdhOnskelisteForUid(uid)),
  onSettValgtVenn: (venn) => dispatch(setValgtVenn(venn)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListeVelger));
