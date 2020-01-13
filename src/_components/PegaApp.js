import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../_actions/userActions';
import { PortalHeader } from './portal/portalHeader';
import { PortalContainer } from './portal/portalContainer';
import '../App.css';

class PegaApp extends Component {

    render(){
        return (
            <div className='App-body'>
                <PortalHeader/>
                <PortalContainer/>
            </div>
        );
    }
}

const mapStateToProps = (state)  => {
    return {
        user: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login : (name) => {
            dispatch(login(name))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PegaApp)