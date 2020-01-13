import React, {Component} from 'react';
import { Container } from "semantic-ui-react";
import '../../App.css';

class PortalHeader extends Component {
    render(){
        return(
            <div className='App-portal-header'>
                <Container>
                    <h1>Discover DX API</h1>
                </Container>
            </div>
        );
    }
}

export {PortalHeader};