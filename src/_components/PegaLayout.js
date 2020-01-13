import React, { Component } from "react";
import {PegaGroup} from './PegaGroup';
import {Container, Header, Grid} from "semantic-ui-react";

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
		const items = this.props.layout.groups.map((item) => {
			return <PegaGroup groups={item} onContentChange={this.props.handleOnChange}/>
		});
		return (
			this.setLayout(items,this.props.layout)
		);
	}
}
export {PegaLayout}