import React, { Component } from "react";
import {PegaGroup} from './PegaGroup';
import {Container, Header, Grid} from "semantic-ui-react";
import PegaView from "./PegaView";

class PegaLayout extends Component {

	constructor(props){
		super(props);
		this.setLayout = this.setLayout.bind(this);
		this.state={
			visible:true
		};
	}
	
	setLayout(items,layout){
		switch(layout.groupFormat){
			case 'Stacked':
				{
					if(layout.title){
						return (
							<Container>
								<Header>{layout.title}</Header>
								<Grid columns={1}>
									{items}
								</Grid>
							</Container>							
						)
					}
					else{
						return (
							<Container>
								<Grid columns={1}>
									{items}
								</Grid>
							</Container>
						)
					}
				}
			case 'Inline grid triple':
				{
					if(layout.title){
						return (
							<Grid.Column>
								<Header>{layout.title}</Header>
								<Grid columns={3}>
									{items}
								</Grid>
							</Grid.Column>							
						)
					}
					else{
						return (
							<Grid.Column>
								<Grid columns={3}>
									{items}
								</Grid>
							</Grid.Column>
						)
					}
				}
			default:
				return <Grid.Column>{items}</Grid.Column>
		}
	}
	
	render(){
		var groupCounter = 0;
		if(this.props.layout.groups){
			const items = this.props.layout.groups.map((item) => {
				return <PegaGroup groups={item} key={groupCounter++} onContentChange={this.props.handleOnChange} readOnly={this.props.readOnly}/>
			});
			return (
				this.setLayout(items,this.props.layout)
			);
		}
		else if(this.props.layout.view){
			return <Grid.Column><PegaView view={this.props.layout.view} readOnly={this.props.readOnly}/></Grid.Column>
		}
		else{
			return <Grid.Column>Could not render Layout</Grid.Column>
		}
		
	}
}
export {PegaLayout}