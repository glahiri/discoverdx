import React, {Component} from 'react';
import {connect} from 'react-redux';
import PortalHeader from './portal/portalHeader';
import { PortalContainer } from './portal/portalContainer';
import PegaLogin from './PegaLogin';
import { Grid } from "semantic-ui-react";
import '../App.css';

class PegaApp extends Component {
    render(){
        if(this.props.user.isLoggedIn === 1){
            return (
                <div className='App-body'>
                    <PortalHeader/>
                    <PortalContainer/>
                </div>
            );
        }
        else{
            return (
                <div className='App-body'>
                    <div className='App-portal-login'>
                        <Grid columns={2} divided>
                            <Grid.Row>
                                <Grid.Column textAlign='center'>
                                    <div className='App-portal-login'>
                                        <PortalHeader/>
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div className='App-portal-login'>
                                        <PegaLogin/>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </div>
            );
        }
        
    }
}

const mapStateToProps = (state)  => {
    return {
        user: state
    }
}

export default connect(mapStateToProps)(PegaApp)