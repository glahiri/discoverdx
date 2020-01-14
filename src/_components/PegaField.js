import React, { Component } from "react";
import {Form, Icon, Input, Modal, Header, Select, Checkbox, TextArea} from "semantic-ui-react";
import ReactJson from 'react-json-view';



class PegaField extends Component {
	constructor(props){
		super(props);
		this.handleChange=this.handleChange.bind(this);
		
		this.state={
			visible: true,
			value: null
		};
	}

	modalInfo = (content) => {
		return (
			<Modal trigger={<Icon link name='info circle'/>}>
				<Header>DX API Data</Header>
				<Modal.Content>
					<ReactJson theme='ocean' src={content}></ReactJson>
				</Modal.Content>
			</Modal>
		);
	}
	
	switchControl(label,content,processChange){
		if(!content.visible)
			return <div/>
		const control = content.control.type;

		switch(control){
			case 'pxTextInput':
				{
					const value = (this.state.value)?this.state.value : ((content.value)?content.value:'');
					if(!content.readOnly)
						return (
							<Form.Field required={content.required}>
								<label>{label + ' '}{this.modalInfo(content)}</label>
								<Input 
									id={content.fieldID} 
									value={value} 
									placeholder={label} 
									required={content.required} 
									onChange={processChange}
								/>
							</Form.Field>
						);
					else
						return (
							<Form.Field>
								<label>{label + ' '}{this.modalInfo(content)}</label>
								{value}
							</Form.Field>
						);
				}				
			case 'pxAutoComplete':
				{	
					const options = [];
					const value = (this.state.value)?this.state.value : ((content.value)?content.value:'');	
					content.control.modes[0].options.forEach((item) => {
						options.push({
							key:item.key,
							value:item.value,
							text:item.value
						})
					})
					if(!content.readOnly)
						return (
							<Form.Field required={content.required}>
								<label>{label + ' '}{this.modalInfo(content)}</label>
								<Select id={content.fieldID}  
									placeholder={label} value={value} 
									search options={options} 
									onChange={processChange}/>
							</Form.Field>
						)
					else
						return (
							<Form.Field required={content.required}>
								<label>{label + ' '}{this.modalInfo(content)}</label>
								{value}
							</Form.Field>
						)	
				}
			case 'pxDropdown':
				{	
					const options = [];
					const value = (this.state.value)?this.state.value : ((content.value)?content.value:'');	
					content.control.modes[0].options.forEach((item) => {
						options.push({
							key:item.key,
							value:item.key,
							text:item.value
						})
					})
					if(!content.readOnly)
						return (
							<Form.Field required={content.required}>
								<label>{label + ' '}{this.modalInfo(content)}</label>
								<Select id={content.fieldID} value={value}
									placeholder={label} search options={options} 
									onChange={processChange}/>
							</Form.Field>
						)
					else
						return (
							<Form.Field required={content.required}>
								<label>{label + ' '}{this.modalInfo(content)}</label>
								{value}
							</Form.Field>
						)
				}
			case 'pxDateTime':
				return (
					<Form.Field required={content.required}>
						<label>{label + ' '}{this.modalInfo(content)}</label>
						<Input id={content.fieldID} placeholder={label} 
							required={content.required} type='date' onChange={processChange}
							readOnly={content.readOnly}
						/>
					</Form.Field>
				)
			case 'pxCheckbox':
				{
					const checked = !(this.state.value === null)?this.state.value : (!(content.value === null)?content.value:false);	
					return (
						<Form.Group inline>
							<Form.Field required={content.required}>
								<Checkbox id={content.fieldID} checked={checked} 
									onClick={processChange} label={label}
									disabled={content.readOnly}
								/>
								{this.modalInfo(content)}						
							</Form.Field>							
						</Form.Group>
					)
				}
				
			case 'pxRadioButtons':
				{
					var options = [];
					const value = (this.state.value)?this.state.value : ((content.value)?content.value:'');
					options = content.control.modes[0].options.map((item) => {;	
						return (
							<Form.Radio
								label={item.value}
								value={item.key}
								key={item.key}
								name={content.fieldID}
								checked={value === item.key}
								disabled={content.readOnly}
								onChange={processChange}
							/>);
					});
					return (
						<Form.Group grouped required={content.required}>
							<label>{label + ' '}{this.modalInfo(content)}</label>
							{options}
						</Form.Group>
					)
				}

			case 'pxButton':
				return <Form.Button>{content.control.label}</Form.Button>
			case 'pxTextArea':
				{
					const value = (this.state.value)?this.state.value : ((content.value)?content.value:'');
					return (
						<Form.Field required={content.required}>
							<label>{label + ' '}{this.modalInfo(content)}</label>
							<TextArea id={content.fieldID} value={value} 
							placeholder={label} onChange={processChange} readOnly={content.readOnly}/>
						</Form.Field>
					)
				}				
			default:
				{
					const value = (this.state.value)?this.state.value : ((content.value)?content.value:'');
					if(!content.readOnly)
						return (
							<Form.Field required={content.required}>
								<label>{label + ' '}{this.modalInfo(content)}</label>
								<Input 
									id={content.fieldID} 
									value={value} 
									placeholder={label} 
									required={content.required} 
									onChange={processChange}
								/>
							</Form.Field>
						);
					else
						return (
							<Form.Field>
								<label>{label + ' '}{this.modalInfo(content)}</label>
								{value}
							</Form.Field>
						);
				}
				
		}
	}
	
	handleChange(event,data){
		if(data.type === 'checkbox')
			data.value = data.checked;
		this.setState({
			value: data.value
		});
		if(!data.id)
			data.id = data.name;
		this.props.handleChange(this.props.content, data);
	}
	
	render(){
		return (
			this.switchControl(this.props.label, this.props.content, this.handleChange)	
		);
	}
}
export {PegaField}