import React, { Component } from "react";
import {PegaGroup} from './PegaGroup';
import {
	Form,
	Message,
	Container,
	Divider} from "semantic-ui-react";
import axios from "axios";
import { endpoints } from "../_services/endpoints";


class PegaView extends Component {
	constructor(props){
		super(props);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRefresh = this.handleRefresh.bind(this);
		this.dismissMessage = this.dismissMessage.bind(this);

		this.state={
			visible: true,
			content: {},
			message: {
				hidden: true,
				positive: true,
				negative: false,
				visible: false,
				result: ''
			}
		};
	}
	
	handleSubmit(event, data){
		
		const encodedUser = btoa(this.props.credentials.username + ":" + this.props.credentials.password);
		
		const requestBody = {
			content: this.state.content
		};
  
		return axios
			.post(this.props.credentials.endpoints + endpoints.ASSIGNMENTS + '/' + this.props.assignID + '?actionID=' + this.props.actionID, requestBody,{
			  headers: { Authorization: "Basic " + encodedUser }
			})
			.then((response) => {
				console.log('Posted success');
				this.setState({
					message: {
						hidden: false,
						positive: true,
						negative: false,
						visible: true,
						result: 'Action completed successfully.'
					}
				});
				return true;
			})
			.catch((error) => {
				console.log(error);
				this.setState({
					content:{},
					message: {
						hidden: false,
						positive: false,
						negative: true,
						visible: true,
						result: 'Action could not be completed.'
					}
				});
				return true;
			});
	}
	
	handleRefresh(){
		
		const encodedUser = btoa(this.props.credentials.username + ":" + this.props.credentials.password);
		
		const requestBody = {
			content: this.state.content
		};
  
		return axios
			.put(this.props.credentials.endpoint + endpoints.ASSIGNMENTS + '/' + this.props.assignID + '/actions/' + this.props.actionID + '/refresh', requestBody,{
			  headers: { Authorization: "Basic " + encodedUser }
			})
			.then((response) => {
				console.log('Refresh success');
				this.props.handleChange(response.data);
				return true;
			})
			.catch((error) => {
				console.log(error);
				this.setState({
					content:{},
					message: {
						hidden: false,
						positive: false,
						negative: true,
						visible: true,
						result: 'Refresh could not be completed.'
					}
				});
				return true;
			});
	}
	
	handleOnChange(field,data){
		const content = this.state.content;
		if(data.type === 'checkbox')
			data.value = data.checked;
		content[data.id] = data.value;
		this.setState({
			content: content
		});

		if(field.control.actionSets && field.control.actionSets.length > 0){
			if(field.control.actionSets[0].actions){
				field.control.actionSets[0].actions.forEach((item) => {
					if(item.action && item.action === 'refresh'){						
						this.handleRefresh();
					}
					return true;
				});
			}
		}
	}
	
	dismissMessage(event,data){
		var myState = this.state;
		myState.message = {
			hidden: true,
			visible: false
		};
		this.setState(myState);
	}
			
	
	render(){
		const items = this.props.view.groups.map((item) =>
				<PegaGroup groups={item} key={this.props.view.viewID} onContentChange={this.handleOnChange}/>
		);
		return (
			<Form onSubmit={this.handleSubmit}>
				<Message 
					header='Result'
					content={this.state.message.result}
					positive={this.state.message.positive}
					negative={this.state.message.negative}
					hidden={this.state.message.hidden}
					visible={this.state.message.visible}
					onDismiss={this.dismissMessage}
				/>
				{items}
				<Divider/>
				<Container textAlign='right'><Form.Button type='submit' primary>Submit</Form.Button></Container>
			</Form>	
		);
	}
}
export {PegaView}
		