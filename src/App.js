import React, {Component} from 'react';
import {connect} from "react-redux";
import {push} from 'connected-react-router';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router';
import firebase from "firebase/app";
import Login from './login/Login';
import MinListe from './minliste/MinListe';
import Vennelister from './vennelister/VenneLister';
import Profil from './profil/Profil';
import AppBar from './components/AppBarComponent';
import {brukerLoggetInn} from "./actions/actions";
import {fetchListsIAmAllowedToView, fetchUsers, fetchViewersToMyList, fetdhMinOnskeliste} from "./Api";

class App extends Component {

    componentDidMount() {
        const {onSendTilLogin, onBrukerLoggetInn, onAbonnerPaaMinOnskeliste, onSubscribeToMyAllowedViewers, onFetchListsICanView, onFetchAllUsers} = this.props;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                onBrukerLoggetInn(user);
                onFetchAllUsers();
                onAbonnerPaaMinOnskeliste();
                onSubscribeToMyAllowedViewers();
                onFetchListsICanView();
            } else {
                onSendTilLogin();
            }
        });
    }


    render() {
        return (
            <div className="App">
                <AppBar/>
                <div className="content">
                    <Switch>
                        <Route exact path="/" component={Login}/>
                        <Route path="/minliste" component={MinListe}/>
                        <Route path="/vennelister" component={Vennelister}/>
                        <Route path="/profil" component={Profil}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    onSendTilLogin: PropTypes.func,
    onAbonnerPaaMinOnskeliste: PropTypes.func,
    onSubscribeToMyAllowedViewers: PropTypes.func,
    onBrukerLoggetInn: PropTypes.func,
    onFetchListsICanView: PropTypes.func,
    onFetchAllUsers: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
    onAbonnerPaaMinOnskeliste: () => dispatch(fetdhMinOnskeliste()),
    onSubscribeToMyAllowedViewers: () => dispatch(fetchViewersToMyList()),
    onBrukerLoggetInn: (user) => dispatch(brukerLoggetInn(user)),
    onFetchListsICanView: () => dispatch(fetchListsIAmAllowedToView()),
    onFetchAllUsers: () => dispatch(fetchUsers()),
    onSendTilLogin: () => dispatch(push('/'))
});

export default connect(null, mapDispatchToProps)(App);
