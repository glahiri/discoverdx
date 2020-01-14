import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Container, Button, Grid } from "semantic-ui-react";
import '../../App.css';
import { logoutUser } from '../../_actions/userActions';

class PortalHeader extends Component {

    performLogout = () => {
        this.props.logout();
    }

    displayUser = () => {
        if(this.props.user.isLoggedIn === 1){
            return(
                <Container>
                    <Grid columns={2}>  
                        <Grid.Row>
                            <Grid.Column>
                                <Container>
                                    <div className='App-portal-header'>
                                        <h1>Discover DX API</h1>
                                    </div>
                                </Container>
                            </Grid.Column>
                            <Grid.Column>
                                <Container textAlign='right'>
                                    <div className='App-portal-header'> 
                                        <Grid columns={2}>
                                            <Grid.Row>
                                                <Grid.Column verticalAlign='middle'>
                                                    <h4>Welcome {this.props.user.credentials.username} !</h4>
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <Button onClick={this.performLogout} color='red'>Logout</Button>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </div>                        
                                </Container>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>              
            );
        }
        else{
            return(
                <Container>
                    <div className='App-portal-header'>
                        <h1>Discover DX API</h1>
                    </div>
                </Container>
            );
        }
    }

    render(){
        return(
            <div>{this.displayUser()}</div>
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
        logout: () => {
            logoutUser(dispatch)
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PortalHeader)
