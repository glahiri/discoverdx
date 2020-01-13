import React, { Component } from "react";
import {PegaGroup} from './PegaGroup';
import {
	Form,
	Message,
	Container,
	Divider,
	Modal,
	Header,
	Icon,
	Grid } from "semantic-ui-react";
import {connect} from 'react-redux';
import ReactJson from 'react-json-view';

import { updateAction, postAction, resetActionMessage } from '../_actions/userActions';


class PegaView extends Component {
	constructor(props){
		super(props);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRefresh = this.handleRefresh.bind(this);
		this.dismissMessage = this.dismissMessage.bind(this);

		this.state={
			visible: true,
			content: {}
		};
	}
	
	handleSubmit(event, data){
		
		const requestBody = {
			content: this.state.content
		};

		this.props.submitView(
			this.props.user.credentials,
			this.props.user.selectedAction.apiData.ID,
			this.props.user.selectedView.apiData.actionID,
			requestBody
		);

	}
	
	handleRefresh(){
		
		const requestBody = {
			content: this.state.content
		};

		this.props.updateView(
			this.props.user.credentials,
			this.props.user.selectedAction.apiData.ID,
			this.props.user.selectedView.apiData.actionID,
			requestBody
		);
  
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
		this.props.resetMessage();
	}

	displayMessage = (output) => {
		if(output === 'success')
			return (
				<Message 
					header='Thank You'
					content='The action has been completed successfully'
					positive
					onDismiss={this.dismissMessage}
				/>
			);
		else if (output === 'fail'){
			const messages = [];
			if(this.props.user.selectedAction.actionErrors.errors.errors){
				this.props.user.selectedAction.actionErrors.errors.errors.forEach(
					(error) => {
						if(error.ValidationMessages){
							error.ValidationMessages.forEach((item) => {
								const createMsg = (msg) => {
									if(msg.Path)
										return (
											<Message.Item>{msg.Path} - {msg.ValidationMessage}</Message.Item>
										);
									else
										return (
											<Message.Item>{msg.ValidationMessage}</Message.Item>
										)
									}
								messages.push(createMsg(item));
							});
						}					
					}
				);
				return (
					<Message negative onDismiss={this.dismissMessage}>
						<Message.Header>
							Errors!&nbsp;
							<Modal trigger={<Icon link name='info circle'/>}>
								<Header>DX API Data</Header>
								<Modal.Content>
									<ReactJson theme='ocean' src={this.props.user.selectedAction.actionErrors.errors}></ReactJson>
								</Modal.Content>
							</Modal>
						</Message.Header>
						<Message.List>
							{messages}
						</Message.List>
					</Message>
				);
			}
		}
		else
		return (<div></div>);
	}
			
	
	render(){
		const items = this.props.view.groups.map((item) => {
			if(!item.viewID)
				return (	
					<PegaGroup groups={item} key={this.props.view.viewID} onContentChange={this.handleOnChange}/>
				);
			return (<div></div>);
		});
		return (
			<Form onSubmit={this.handleSubmit}>
				{this.displayMessage(this.props.user.actionStatus)}
				<Grid>
					{items}
				</Grid>				
				<Divider/>
				<Container textAlign='right'><Form.Button type='submit' primary>Submit</Form.Button></Container>
			</Form>	
		);
	}
}

const mapStateToProps = (state)  => {
    return {
        user: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateView : (credentials,id,actionId, content) => {
            updateAction(credentials,id,actionId,content,dispatch)
		},
		submitView : (credentials,id,actionId, content) => {
			postAction(credentials,id,actionId,content,dispatch)
		},
		resetMessage: () => {
			resetActionMessage(dispatch);
		}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PegaView)
		