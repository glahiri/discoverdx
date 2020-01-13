import React, {Component} from 'react';
import { Container } from "semantic-ui-react";

class PortalHeader extends Component {
    render(){
        return(
            <div>
                <Container>
                    <h1>Discover DX API</h1>
                </Container>
            </div>
        );
    }
}

export {PortalHeader};