import  React, {Component} from 'react';
import { Tab, Header, Segment, Grid, Form } from "semantic-ui-react";
import ReactJson from 'react-json-view';
import { endpoints } from "../_services/endpoints";

import {connect} from 'react-redux';
import { addCase, resetCreatedCase } from '../_actions/userActions';

class PegaCaseTypes extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            caseType: {
                caseTypeID:''
            }
         };
    }

    displayData = () => {
        if(this.props.user.createdCase.isVisible)
            return this.props.user.createdCase.apiData;
        else if(this.props.user.caseTypes.isVisible)
            return this.props.user.caseTypes.apiData;
        else
            return ({});
    }

    caseTypes = () => {
        const options = [];
        if(this.props.user.caseTypes.isVisible){
            this.props.user.caseTypes.apiData.caseTypes.forEach(
                (item) => {
                    if(item.CanCreate)
                        options.push({
                            key: item.ID,
                            value: item.ID,
                            text: item.name
                        });
                }
            )
        }
        return options;
    }

    setCaseType = (event,data) => {
        if(data.value){
            const state = this.state;
            var startingProcess = '';
            this.props.user.caseTypes.apiData.caseTypes.forEach(
                (item) => {
                    if(item.startingProcesses){
                        item.startingProcesses.forEach(
                            (process) => {
                                startingProcess = process.ID;
                            }
                        );
                    }
                }
            );
            this.setState({
                ...state,
                caseType: {
                    caseTypeID: data.value,
                    startingProcess: startingProcess
                }
            });
        }
    }

    createCase = (event,data) => {
        this.props.createCase(
            this.props.user.credentials,
            this.state.caseType
        );
    }

    reset = (event,data) => {
        const state = { 
                caseType: {
                    caseTypeID:''
                }
            };
        this.setState(state);
        this.props.resetCase();
    }

    render(){
        return(
            <Tab.Pane attached={false}>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment>
                                <Header as='h4'>CaseTypes API</Header>
                                <Header as='h5'>Endpoint: {this.props.user.credentials.endpoint}{endpoints.CASETYPES} </Header>
                                <p>Gets the case types from the authenticated user's application</p>
                                <Form>
                                    <Form.Select label='Select CaseType' placeholder='Select casetype'
                                        options={this.caseTypes()} 
                                        value={this.state.caseType.caseTypeID}
                                        onChange={this.setCaseType}/>
                                    <Form.Group inline>
                                        <Form.Button primary onClick={this.createCase}>Create</Form.Button>
                                        <Form.Button onClick={this.reset}>Reset</Form.Button>
                                    </Form.Group>                                    
                                </Form>
                            </Segment>	
                        </Grid.Column>
                        <Grid.Column>
                            <ReactJson theme='ocean' src={this.displayData()}></ReactJson>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Tab.Pane>
        );
    }
};

const mapStateToProps = (state)  => {
    return {
        user: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createCase : (credentials,caseType) => {
            const content = {};
            addCase(credentials,caseType,'',content,dispatch)
        },
        resetCase : () => {
            resetCreatedCase(dispatch)
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(PegaCaseTypes)

