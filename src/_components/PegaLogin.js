import  React, {Component} from 'react';
import { Tab, Container, Grid, Divider,	Form, Message } from "semantic-ui-react";
import {endpoints} from '../_services/endpoints';
import {login} from '../_actions/userActions';

import {connect} from 'react-redux';

class PegaLogin extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            credentials: {
                endpoint: (this.props.user.isLoggedIn === 1) ? 
                    this.props.user.credentials.endpoint:endpoints.BASEURL,
                username: (this.props.user.isLoggedIn === 1) ? 
                    this.props.user.credentials.username:'',
                password: (this.props.user.isLoggedIn === 1) ? 
                    this.props.user.credentials.password:''
            }
         };
    }
   
      
    displayMessage = () => {
        if(this.props.user.isLoggedIn === 1){
            return (
                <Message 
                    header='Welcome'
                    content='You have successfully logged into the Discover app'
                    positive
                />
            );
        }
        else if (this.props.user.isLoggedIn === 2){
            return (
                <Message 
                    header='Sorry'
                    content='Please check your credentials and try again.'
                    negative
                />
            );
        }
        else
            return (<div></div>);
            
    }

    setCreds = (event,data) => {
        var newState = this.state;
        newState.credentials[data.id] = data.value;
        newState.messageHidden = false;
        this.setState(newState);
    };

    applyCreds = () => {
        this.props.login(this.state.credentials);
    };

    render(){
        return(
            <Tab.Pane attached={false}>
                {this.displayMessage()}
                <Grid columns={1}>
                    <Grid.Row>
                        <Grid.Column>
                            <Form onSubmit={this.applyCreds}>
                                <Form.Input 
                                    label='Pega API endpoint' 
                                    placeholder={endpoints.BASEURL} 
                                    id='endpoint'
                                    value={this.state.credentials.endpoint} 
                                    onChange={this.setCreds}
                                />
                                <Form.Group grouped>
                                    <Form.Input 
                                        label='Username' 
                                        placeholder='Username' 
                                        id='username' 
                                        onChange={this.setCreds} 
                                        value={this.state.credentials.username}
                                    />
                                    <Form.Input 
                                        label='Password' 
                                        placeholder='Password' 
                                        id='password' onChange={this.setCreds} 
                                        type='password' 
                                        value={this.state.credentials.password}
                                    />
                                </Form.Group>
                                <Divider/>
                                <Container textAlign='right'>
                                    <Form.Button type='submit' primary>Login</Form.Button>
                                </Container>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Tab.Pane>
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
        login : (credentials) => {
            login(credentials,dispatch)
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PegaLogin)