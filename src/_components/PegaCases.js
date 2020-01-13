import  React, {Component} from 'react';
import { Form, Tab, Header, Segment, Grid, Container } from "semantic-ui-react";
import ReactJson from 'react-json-view';
import { endpoints } from "../_services/endpoints";
import { getCase, resetCase } from '../_actions/userActions';

import {connect} from 'react-redux';

class PegaCases extends Component {

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

    displayCase = (event,data) => {
        if(data.value){
            this.props.fetchCase(this.props.user.credentials,data.value);
        }
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
                                        (this.props.user.selectedCase.apiData.ID) ?
                                            this.props.user.selectedCase.apiData.ID :''
                                        } 
                                    options={this.getCases()} onChange={this.displayCase} />
                                <Container textAlign='right'>
                                    <Form.Button onClick={this.props.reset}>Reset</Form.Button>
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