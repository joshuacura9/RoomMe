import React, { Component } from 'react';



class CreatePostFrom extends Component {
	state = {
		name: "",
 		apt_location: "",
 		price: "",
 		roommates_needed: "",
 		apt_details: "", 
	}

	onInputChange = (event) => {
		
		let target = event.target
		let name = target.name 
		let value = target.value 
		this.setState({[name]:value})
	}

	onFormSubmit = (event) => {
		event.preventDefault();
		let post = this.state;
		this.props.createPost(post);
		// this.setState({
		// 	name: '',
		// 	apt_location: "",
 		// 		price: "",
 		// 		roommates_needed: "",
 		// 		apt_details: "",

		// })
	};

	render () {
		return (
			<div style = {{'padding': '50px'}}> 
				<h1 style = {{'textAlign': 'center'}}>Add New Listing </h1>
				<form onSubmit={this.onFormSubmit} id="taskForm">
					<input style = {{'padding': '12px'}} 
						onChange={this.onInputChange} 
            		 	type="text"  
            		 	placeholder ="Name" 
     					value={this.state.name}
            		 	name='name'
            		/>

            		<input style = {{'padding': '12px'}} 
            			onChange={this.onInputChange}
            			type="text"
            			placeholder="Location"
            			value={this.state.apt_location}
            			name='apt_location'
            		/>

            		<input style = {{'padding': '12px'}} 
            			onChange={this.onInputChange}
            			type="text"
            			placeholder="Price"
            			value={this.state.price}
            			name='price'
            		/>

            		<input style = {{'padding': '12px'}} 
            			onChange={this.onInputChange}
            			type="text"
            			placeholder="Roommates Needed"
            			value={this.state.roommates_needed}
            			name='roommates_needed'
            		/>

            		<input style = {{'padding': '12px'}} 
            			onChange={this.onInputChange}
            			type="text"
            			placeholder="Apartment Details"
            			value={this.state.apt_details}
            			name='apt_details'
            		/>
            		<button style = {{'backgroundColor': 'rgb(35,31,32)', 'padding': '12px', 
            		'color': 'white', }}  type="submit" id="addPost" className="btn">Add New Listing</button>
            	</form>
        	</div>
        );
	}
}

export default CreatePostFrom;