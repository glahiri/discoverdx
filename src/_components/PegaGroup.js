import React, { Component } from "react";
import {PegaField} from './PegaField';
import {PegaLayout} from './PegaLayout';
import {Grid} from "semantic-ui-react";

class PegaGroup extends Component {
	constructor(props){
		super(props);
		this.getField = this.getField.bind(this);
		this.state={
			visible:true
		};
	}
	
	getField(item){
		return <PegaField label={item.label} key={item.fieldID} content={item} handleChange={this.props.onContentChange}/>;
	}
	
	
	
	render(){
		var items = [];
		if(this.props.groups.layout){
			return (
				<Grid.Column>
					<PegaLayout layout={this.props.groups.layout} 
						handleOnChange={this.props.onContentChange} readOnly={this.props.readOnly}/>
				</Grid.Column>
			)
		}
		else if(Array.isArray(this.props.groups.field)){
			items = this.props.groups.field.map((item) => {
				return <PegaField label={item.field.label} key={item.field.fieldID} content={item.field} handleChange={this.props.onContentChange}/>;
			});
		}
		else if (this.props.groups.field) {
			var item = this.props.groups.field;
			items.push(this.getField(item));
		}
		return (
			 <Grid.Column>
				 {items}
			 </Grid.Column>
			 
		);
	}
}
export {PegaGroup}