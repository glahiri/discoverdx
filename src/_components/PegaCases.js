import  React, {Component} from 'react';
import { Form, Tab, Header, Segment, Grid, Container, Modal } from "semantic-ui-react";
import ReactJson from 'react-json-view';
import { endpoints } from "../_services/endpoints";
import { getCase, resetCase } from '../_actions/userActions';

import {connect} from 'react-redux';
import { PegaGroup } from './PegaGroup';

class PegaCases extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectedCase: ''
         };
    }
    displayData = () => {
        if(this.props.user.selectedCase.isVisible)
            return this.props.user.selectedCase.apiData;
        else if(this.props.user.cases.isVisible)
            return this.props.user.cases.apiData;
        else
            return ({});
    };

    getCases = () => {
        const options = [];
        if(this.props.user.cases.isVisible){
            this.props.user.cases.apiData.cases.forEach((item) => {
                options.push({
                    key:item.ID,
                    value:item.ID,
                    text:item.ID
                });
            });
        }
        return options;
    }

    resetCases = () => {
        const state = this.state;
        this.setState({
            ...state,
            selectedCase: ''
        });
        this.props.reset();
    }

    displayCase = (event,data) => {
        const state = this.state;
        this.setState({
            ...state,
            selectedCase: data.value
        });
        if(data.value){
            this.props.fetchCase(this.props.user.credentials,data.value);
        }
    }

    displayPage = () => {
        var items = [];
        if(this.props.user.selectedPage.isVisible){
            items = this.props.user.selectedPage.apiData.groups.map(
                (item) => {
                    return (
                        <PegaGroup groups={item} readOnly={true}/>
                    )
                }
            )
        }

        const panes = [
            {
                menuItem: 'Content',
                render: () => 
                        <Tab.Pane attached={false}>
                            <Grid>
                               {items}
                            </Grid>                               
                        </Tab.Pane>
            },
            {
                menuItem: 'API Data',
                render: () => 
                            <Tab.Pane attached={false}>
                                <ReactJson theme='ocean' src={this.props.user.selectedPage.apiData}></ReactJson>
                            </Tab.Pane>
            }
        ];
        return (
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />            
        );
    }

    render(){
        return (
            <Tab.Pane attached={false}>
                <Segment>
                    <Header as='h4'>Cases API</Header>
                    <Header as='h5'>Endpoint: {this.props.user.credentials.endpoint}{endpoints.CASES} </Header>
                    <p>Gets all cases that the authenticated user has created in the default work pool.</p>
                </Segment>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <Form>
                                <Form.Select label='Case' placeholder='Select a case' 
                                    value={
                                        (this.state.selectedCase) ? this.state.selectedCase:
                                        ((this.props.user.selectedCase.apiData.ID) ?
                                            this.props.user.selectedCase.apiData.ID :''
                                        )
                                    } 
                                    options={this.getCases()} onChange={this.displayCase} />
                                <Container>
                                    <Form.Group inline>
                                        <Modal trigger={<Form.Button primary>View</Form.Button>}>
                                            <Header>Review</Header>
                                            <Modal.Content>
                                                {this.displayPage()}
                                            </Modal.Content>
                                        </Modal>
                                        <Form.Button onClick={this.resetCases}>Reset</Form.Button>
                                    </Form.Group>                                                                
                                </Container>
                            </Form>
                        </Grid.Column>
                        <Grid.Column>
                            <ReactJson theme='ocean' src={this.displayData()}></ReactJson>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Tab.Pane>
        )
    }
}

const mapStateToProps = (state)  => {
    return {
        user: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCase : (credentials,id) => {
            getCase(credentials,id,dispatch)
        },
        reset: () => {
            resetCase(dispatch);
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PegaCases)