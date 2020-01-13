import  React, {Component} from 'react';
import { Tab, Header, Segment, Grid, Form, Container } from "semantic-ui-react";
import ReactJson from 'react-json-view';
import { endpoints } from "../_services/endpoints";
import { getAssignmentByID, resetAction } from '../_actions/userActions';

import {connect} from 'react-redux';

class PegaAssignments extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectedAssignment: ''
         };
    }
    displayData = () => {
        if(this.props.user.selectedAction.isVisible)
            return this.props.user.selectedAction.apiData;
        else if(this.props.user.assignments.isVisible)
            return this.props.user.assignments.apiData;
        else
            return ({});
    };

    getAssignments = () => {
        const options = [{
            key: 'Select',
            value: '',
            text: 'Please select a case'
        }];
        if(!this.props.user.assignments.isVisible)
            return options;
        this.props.user.assignments.apiData.assignments.forEach((item) => {
                options.push({
                    key:item.ID,
                    value:item.ID,
                    text:item.caseID
                });
            }
        );
        return options;
    };

    selectAssignment = (event,data) => {
        const state = this.state;
        this.setState({
            ...state,
            selectedAssignment: data.value
        });
        if(data.value === "")
            this.clearSelectedAssignment();
        this.props.getAssignment(
            this.props.user.credentials,
            data.value
        );
    }

    clearSelectedAssignment = () => {
        const state = this.state;
        this.setState({
            ...state,
            selectedAssignment: ''
        });
        this.props.removeAssignment();
    }

    render(){
        return (
            <Tab.Pane attached={false}>
                <Segment>
                    <Header as='h4'>Assignments API</Header>
                    <Header as='h5'>Endpoint: {this.props.user.credentials.endpoint}{endpoints.ASSIGNMENTS} </Header>
                    <p>Returns the authenticated user's list of assignments.</p>
                </Segment>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <Form>
                                <Form.Select label='Work list' placeholder='Please select a case' 
                                    value={
                                        (this.state.selectedAssignment)
                                            ? this.state.selectedAssignment :
                                            ((this.props.user.selectedAction.apiData.ID) ?
                                            this.props.user.selectedAction.apiData.ID : '')
                                    }
                                    options={this.getAssignments()} onChange={this.selectAssignment}/>
                                <Container textAlign='right'>
                                    <Form.Button onClick={this.clearSelectedAssignment}>Reset</Form.Button>
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
        getAssignment : (credentials,id) => {
            getAssignmentByID(credentials,id,dispatch)
        },
        removeAssignment: () => {
            resetAction(dispatch);
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PegaAssignments)