import React, { Component } from "react";
import axios from "axios";
import {
	Tab,
	Container,
	Grid,
	Segment,
	Dropdown,
	Header,
	Label,
	List,
	ListItem,
	Input,
	Button,
	Divider,
	Form,
	Message } from "semantic-ui-react";
import ReactJson from 'react-json-view';
import { endpoints } from "../_services/endpoints";
import { PegaView } from "./PegaView";


const my_json = {
	json:" Waiting for API to load"
}

function caseTypes(component){
  const encodedUser = btoa(component.state.credentials.username + ":" + component.state.credentials.password);

  return axios
    .get(component.state.credentials.endpoint + endpoints.CASETYPES, {
      headers: { Authorization: "Basic " + encodedUser }
    })
    .then(function(response) {
		var myState = component.state;
		myState.caseTypes = response.data;
		myState.message = {
			result:'Login successful',
			header:'Welcome',
			hidden: false,
			visible: true,
			positive: true,
			negative: false
		};
		component.setState(myState);
		cases(component);
      return true;
    })
    .catch(function(error) {
		console.log(error);
		var myState = component.state;
		myState.message = {
			result:'Login failed',
			header:'Sorry',
			hidden: false,
			visible: true,
			positive: false,
			negative: true
		};
		component.setState(myState);
      return true;
    });
}


function cases(component){
  const encodedUser = btoa(component.state.credentials.username + ":" + component.state.credentials.password);
  
  return axios
    .get(component.state.credentials.endpoint + endpoints.CASES, {
      headers: { Authorization: "Basic " + encodedUser }
    })
    .then(function(response) {
		var caseList = [];
		response.data.cases.forEach(function (item){
			caseList.push({
				key:item.ID,
				text:item.ID,
				value:item.ID
			})
		});	
		var myState = component.state;
		myState.cases = response.data;
		myState.caseList = caseList;
		component.setState(myState);
		assignments(component);
      return true;
    })
    .catch(function(error) {
		console.log(error);
      return true;
    });
}

function assignments(component){
  const encodedUser = btoa(component.state.credentials.username + ":" + component.state.credentials.password);

  return axios
    .get(component.state.credentials.endpoint + endpoints.ASSIGNMENTS, {
      headers: { Authorization: "Basic " + encodedUser }
    })
    .then(function(response) {
		var myState = component.state;
		myState.assignments = response.data;
		component.setState(myState);
		getDataPage(component);
      return true;
    })
    .catch(function(error) {
		console.log(error);
      return true;
    });
}

function getDataPage(component){
  const encodedUser = btoa(component.state.credentials.username + ":" + component.state.credentials.password);

  return axios
    .get(component.state.credentials.endpoint + endpoints.DATA + '/' + component.state.dataPage.ID, {
      headers: { Authorization: "Basic " + encodedUser }
    })
    .then(function(response) {
		var myState = component.state;
		myState.dataPage = {
			ID: component.state.dataPage.ID,
			content: response.data
		};
		component.setState(myState);
      return true;
    })
    .catch(function(error) {
		console.log(error);
      return true;
    });
}

const actionData = {
	groups: []
}

class PegaApp extends Component {
	constructor(props) {
		super(props);
		this.caseData = this.caseData.bind(this);
		this.handleDataPageChange = this.handleDataPageChange.bind(this);
		this.applyDataPage = this.applyDataPage.bind(this);
		this.setActionData = this.setActionData.bind(this);
		this.setCreds = this.setCreds.bind(this);
		this.applyCreds = this.applyCreds.bind(this);
		this.dismissMessage = this.dismissMessage.bind(this);

		this.state = {
		  visible: false,
		  isLoggedIn:false,
		  caseTypes: {my_json},
		  cases:{my_json},
		  assignments:{my_json},
		  caseList:{my_json},
		  caseData:{my_json},
		  actionData:{actionData},
		  credentials:{
			  endpoint:endpoints.BASEURL,
			  username:'',
			  password:''
		  },
		  dataPage:{
			  ID: 'D_OperatorID',
			  content: {}
		  },
		  message:{
			hidden: true,
			positive: true,
			negative: false,
			visible: false,
			result: '',
			header: ''
		  }
		};
	}
	
	applyCreds(event, data){
		caseTypes(this);
	}
	
	componentDidMount(){
		console.log('mounted');
	}
	
	
	caseData(event,data){
		
		const myState = this.state;
		myState.caseData = my_json;
		this.setState(myState);
		
		const encodedUser = btoa(this.state.credentials.username + ":" + this.state.credentials.password);
		return axios
			.get(this.state.credentials.endpoint + endpoints.CASES + "/" + data.value, {
				headers: { Authorization: "Basic " + encodedUser }
			})
			.then((response) => {
				var assignList = [];
				var assignID = "";
				var actionID = "";
				var caseData = response.data;
				var myState = this.state;
				myState.caseData = caseData;
				this.setState(myState);
				if(response.data.assignments){
					response.data.assignments.forEach(function (item){
						assignID = item.ID;
						actionID = item.actions[0].ID;
						assignList.push({
							key:item.ID,
							text:item.ID,
							value:item.ID
							})
					});
				}
				else
					return true;
				
				return axios
					.get(this.state.credentials.endpoint + endpoints.ASSIGNMENTS + "/" + assignID + "/actions/" + actionID, {
						headers: { Authorization: "Basic " + encodedUser }
					})
					.then((response) => {
						var myState = this.state;
						myState.assignmentList = assignList;
						myState.actionData = response.data;
						this.setState(myState);
						return true;
					})
					.catch(function(error) {
						console.log(error);
						return true;
					});
			})
			.catch(function(error) {
				console.log(error);
				return true;
			});
	}
	
	setCreds(event,data){
		var myState = this.state;
		myState.credentials[data.id] = data.value;
		this.setState(myState);
	}
	
	handleDataPageChange(event,data){
		this.setState({
			visible:true,
			isLoggedIn: true,
			caseTypes: this.state.caseTypes,
			cases: this.state.cases,
			assignments: this.state.assignments,
			caseList: this.state.caseList,
			assignmentList: this.state.assignmentList,
			caseData: this.state.caseData,
			actionData:this.state.actionData,
			dataPage:{
				ID: data.value,
				content:{my_json}
			}
		});
	}
	
	dismissMessage(event,data){
		var myState = this.state;
		myState.message = {
			hidden: true,
			visible: false
		};
		this.setState(myState);
	}
	
	setActionData(actionData){
		let myState = this.state;
		myState.actionData = actionData;
		this.setState(myState);
	}
	
	applyDataPage(event,data){
		getDataPage(this);
	}
	
	render(){
		return (
			<div>
				<div>
					<Container><Header as="h1">Discover DX API using React</Header></Container>
				</div>
				<Container>
					<Tab menu={{ pointing: true}} panes={[
						{
							menuItem: 'Getting Started',
							render: () => <Tab.Pane attached={false}>
											<Grid columns={2}>
												<Grid.Row>
													<Grid.Column>
														<Form onSubmit={this.applyCreds}>
															<Form.Input label='Pega API endpoint' placeholder={endpoints.BASEURL} value={this.state.credentials.endpoint} id='endpoint' onChange={this.setCreds}/>
															<Form.Group grouped>
																<Form.Input label='Username' placeholder='Username' id='username' onChange={this.setCreds} value={this.state.credentials.username}/>
																<Form.Input label='Password' placeholder='Password' id='password' onChange={this.setCreds} type='password' value={this.state.credentials.password}/>
															</Form.Group>
															<Divider/>
															<Container textAlign='right'>
																<Form.Button type='submit' primary>Submit</Form.Button>
															</Container>
														</Form>
													</Grid.Column>
													<Grid.Column>
														<Message 
															header={this.state.message.header}
															content={this.state.message.result}
															positive={this.state.message.positive}
															negative={this.state.message.negative}
															hidden={this.state.message.hidden}
															visible={this.state.message.visible}
															onDismiss={this.dismissMessage}
														/>
													</Grid.Column>
												</Grid.Row>
											</Grid>
										  </Tab.Pane>,
						},					
						{
							menuItem: 'Case Types',
							render: () => <Tab.Pane attached={false}>
											<Grid columns={2}>
												<Grid.Row>
													<Grid.Column>
														<Segment>
															<Header as='h4'>CaseTypes API</Header>
															<Header as='h5'>Endpoint: {this.state.credentials.endpoint + endpoints.CASETYPES}</Header>
															<p>Gets the case types from the authenticated user's application</p>
														</Segment>	
													</Grid.Column>
													<Grid.Column>
														<ReactJson theme='ocean' src={this.state.caseTypes}></ReactJson>
													</Grid.Column>
												</Grid.Row>
											</Grid>
										  </Tab.Pane>,
						},
						{
							menuItem: 'Cases',
							render: () => <Tab.Pane attached={false}>
											<Grid columns={2}>
												<Grid.Row>
													<Grid.Column>
														<Segment>
															<Header as='h4'>Case API</Header>
															<Header as='h5'>Endpoint: {this.state.credentials.endpoint + endpoints.CASES}</Header>
															<p>Gets all cases that the authenticated user has created in the default work pool.</p>
														</Segment>	
													</Grid.Column>
													<Grid.Column>
														<ReactJson theme='ocean' src={this.state.cases}></ReactJson>
													</Grid.Column>
												</Grid.Row>
											</Grid>
										  </Tab.Pane>,
						},
						{
							menuItem: 'Assignments',
							render: () => <Tab.Pane attached={false}>
											<Grid columns={2}>
												<Grid.Row>
													<Grid.Column>
														<Segment>
															<Header as='h4'>Assignments API</Header>
															<Header as='h5'>Endpoint: {this.state.credentials.endpoint + endpoints.ASSIGNMENTS}</Header>
															<p>Returns the authenticated user's list of assignments.</p>
														</Segment>
													</Grid.Column>
													<Grid.Column>
														<ReactJson theme='ocean' src={this.state.assignments}></ReactJson>
													</Grid.Column>
												</Grid.Row>
											</Grid>
										  </Tab.Pane>,
						},
						{
							menuItem: 'Case',
							render: () => <Tab.Pane attached={false}>
											<Grid columns={2}>
												<Grid.Row>
													<Grid.Column>
														<Segment>
															<Header as='h4'>Case API</Header>
															<Header as='h5'>Endpoint: {this.state.credentials.endpoint + endpoints.CASES + '/{ID}'}</Header>
															<p>Gets the details of a case given its ID.</p>
															<Form>
																<Label pointing='below'>Select a case</Label><br/>
																<Dropdown 
																	placeholder=' Select a case to view '
																	selection
																	defaultValue={this.state.caseData.ID}
																	options={this.state.caseList}
																	onChange={this.caseData}
																/>
																<Button content='Reload' icon='sync' labelPosition='left' attached='right' color='blue' onClick={this.caseData} value={this.state.caseData.ID}/>
															</Form>
														</Segment>
													</Grid.Column>
													<Grid.Column>
														<ReactJson theme='ocean' src={this.state.caseData}></ReactJson>
													</Grid.Column>
												</Grid.Row>
											</Grid>
										  </Tab.Pane>,
						},
						{
							menuItem: 'View',
							render: () => <Tab.Pane attached={false}>
											<Segment>
												<Header as='h4'>Actions API</Header>
												<Header as='h5'>Endpoint: {this.state.credentials.endpoint + endpoints.ASSIGNMENTS + "/{ID}/actions/{ID}"}</Header>
												<List>
													<ListItem><Header as='h6'>Selected case: {this.state.caseData.ID}</Header></ListItem>
													<ListItem><Header as='h6'>Selected assignment action: {this.state.actionData.view.viewID}</Header></ListItem>
												</List>
												<p>Returns details about an action that can be performed against this assignment, including its fields, either within the view or as a list.</p>
											</Segment>
											<Grid columns={2}>
												<Grid.Row>
													<Grid.Column>
														<ReactJson theme='ocean' src={this.state.actionData}></ReactJson>
													</Grid.Column>
													<Grid.Column>
														<Segment color='olive'>
															<PegaView view={this.state.actionData.view} assignID={this.state.caseData.assignments[0].ID} actionID={this.state.caseData.assignments[0].actions[0].ID} handleChange={this.setActionData} credentials={this.state.credentials}/>
														</Segment>
													</Grid.Column>
												</Grid.Row>
											</Grid>
										  </Tab.Pane>,
						},
						{
							menuItem: 'Data',
							render: () => <Tab.Pane attached={false}>
											<Grid columns={2}>
												<Grid.Row>
													<Grid.Column>
														<Segment>
															<Header as='h4'>Data API</Header>
															<Header as='h5'>Endpoint: {this.state.credentials.endpoint + endpoints.DATA + '/{ID}'}</Header>
															<p>Gets the contents of a data view given its name and parameters. Parameters are passed in as query string parameters</p>
															<Form>
																<Label pointing='below'>Select a Data Page to view </Label><br/>
																<Input placeholder='D_OperatorID' onChange={this.handleDataPageChange}/>
																<Button attached='right' color='blue' onClick={this.applyDataPage}>Apply</Button>
															</Form>
														</Segment>														
													</Grid.Column>
													<Grid.Column>
														<ReactJson theme='ocean' src={this.state.dataPage.content}></ReactJson>
													</Grid.Column>
												</Grid.Row>
											</Grid>
										  </Tab.Pane>,
						}
					]}></Tab>
				</Container>
			</div>
		);
	}
}

export {PegaApp};
	