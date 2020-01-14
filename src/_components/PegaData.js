import  React, {Component} from 'react';
import { Tab, Header, Segment, Grid, Form, Input } from "semantic-ui-react";
import ReactJson from 'react-json-view';
import { endpoints } from "../_services/endpoints";
import {connect} from 'react-redux';
import { getDataPage, resetDataPage } from '../_actions/userActions';

class PegaData extends Component {
    constructor(props) {
        super(props);
        this.state = 
            { 
                dataPage: 
                    {
                        id: (this.props.user.selectedData.id)? this.props.user.selectedData.id : '' ,
                        metadata: {}
                    }
            }
    };

    handleDataPageChange = (event, data) => {
        const metadata = {};
        const state = this.state
        this.setState({
            ...state,
            dataPage: {
                id: data.value,
                metadata: metadata
            }
        });
        
    }

    applyDataPage = () => {
        this.props.getData(
            this.props.user.credentials,
            this.state.dataPage.id,
            this.state.dataPage.metadata
        );
    }

    clearDataPage = () => {
        this.setState({
            dataPage: {
                id: '',
                metadata: {}
            }
        });
        this.props.resetData();
    }

    render(){
        return (
            <Tab.Pane attached={false}>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment>
                                <Header as='h4'>Data API</Header>
                                <Header as='h5'>Endpoint: {this.props.user.credentials.endpoint + endpoints.DATA + '/{ID}'}</Header>
                                <p>Gets the contents of a data view given its name and parameters. Parameters are passed in as query string parameters</p>
                                <Form>
                                    <Form.Field>
                                        <label>Select a Data Page to view </label>
                                        <Input placeholder='D_OperatorID' 
                                            value ={this.state.dataPage.id} onChange={this.handleDataPageChange}/>
                                    </Form.Field>
                                    <Form.Group inline>
                                        <Form.Button primary onClick={this.applyDataPage}>Apply</Form.Button>
                                        <Form.Button onClick={this.clearDataPage}>Reset</Form.Button>
                                    </Form.Group>                                    
                                </Form>
                            </Segment>														
                        </Grid.Column>
                        <Grid.Column>
                            <ReactJson theme='ocean' src={this.props.user.selectedData.apiData}></ReactJson>
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
        getData : (credentials,id,metadata) => {
            getDataPage(credentials,id,metadata,dispatch)
        },
        resetData : () => {
            resetDataPage(dispatch)
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(PegaData)