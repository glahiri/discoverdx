import  React, {Component} from 'react';
import { Tab, Header, Segment, Grid, List, ListItem, Form } from "semantic-ui-react";
import ReactJson from 'react-json-view';
import { endpoints } from "../_services/endpoints";
import PegaView from "./PegaView";
import { getAction } from '../_actions/userActions';

import {connect} from 'react-redux';

class PegaActions extends Component {

    displayData = () => {
        if(this.props.user.selectedView.isVisible)
            return this.props.user.selectedView.apiData;
        else
            return ({content: 'Please select an Action to View'});
    };

    displayView = () => {
        if(this.props.user.selectedView.isVisible)
            return (
                <PegaView 
                    key={this.props.user.selectedView.apiData.view.viewID}
                    view={this.props.user.selectedView.apiData.view} 
                />
            );
        return (<div></div>);
    }

    displayActions = () => {
        const options = [];
        if(this.props.user.selectedAction.isVisible){
            this.props.user.selectedAction.apiData.actions.forEach((item) => {
                options.push({
                    key: item.ID,
                    value: item.ID,
                    text: item.ID
                });
            });
        }
        return options;
    }

    getView = (event, data) => {
        if(!(data.value === '')){
            this.props.setAction(
                this.props.user.credentials,
                this.props.user.selectedAction.apiData.ID,
                data.value    
            );
        }
    }

    render(){
        return (
            <Tab.Pane attached={false}>
            <Segment>
                <Header as='h4'>Actions API</Header>
                <Header as='h5'>Endpoint: {this.props.user.credentials.endpoint + endpoints.ASSIGNMENTS + "/{ID}/actions/{ID}"}</Header>
                <List>
                    <ListItem><Header as='h6'>Selected case: {this.props.user.selectedAction.apiData.caseID}</Header></ListItem>
                    <ListItem><Header as='h6'>Selected assignment action: {this.props.user.selectedAction.apiData.ID}</Header></ListItem>
                </List>
                <Form>
                    <Form.Select label='Action' placeholder='Please select action' options={this.displayActions()} onChange={this.getView} />
                </Form>

                <p>Returns details about an action that can be performed against this assignment, including its fields, either within the view or as a list.</p>
            </Segment>
            <Grid columns={1}>
                <Grid.Row>
                    <Grid.Column>
                        <Segment color='olive'>
                            {this.displayView()}
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
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
        setAction : (credentials,id,actionId) => {
            getAction(credentials,id,actionId,dispatch)
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PegaActions)