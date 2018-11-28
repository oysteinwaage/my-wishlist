import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { fetdhOnskelisteForUid } from '../Api';
import { setValgtVenn } from '../actions/actions';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
    return this.props.allUsers.filter(x => x.uid === valgtUid)
  }

  render() {
    const { classes, allUsers, allowedListsForMe } = this.props;
    const venneliste = allUsers.filter(user => allowedListsForMe.includes(user.uid));
    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="navn-native-simple">Velg ønskeliste</InputLabel>
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
  allUsers: state.config.brukere,
  allowedListsForMe: state.vennersLister.allowedListsForMe,
});

const mapDispatchToProps = dispatch => ({
  onHentValgtVennsListe: (uid) => dispatch(fetdhOnskelisteForUid(uid)),
  onSettValgtVenn: (venn) => dispatch(setValgtVenn(venn)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListeVelger));
