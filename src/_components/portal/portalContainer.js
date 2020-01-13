import React, {Component} from 'react';
import { Container, Tab } from "semantic-ui-react";
import { PortalPanes } from './portalPanes';

class PortalContainer extends Component {
    render(){
        return(
            <div>
                <Container>
                <Tab menu={{ pointing: true}} panes={PortalPanes}/>
                </Container>
            </div>
        );
    }
}

export {PortalContainer};