import React, { Component } from 'react';
import ListModel from '../models/List';
import Posts from './Posts';
import CreatePostForm from './CreatePostForm';

class Listings extends Component {
	constructor() {
		super();
		this.state = {
			posts: []
		}
	}

	componentDidMount(){
		this.fetchData();
	}

	fetchData = () => {
		ListModel.all().then((res) => {
			this.setState({
				posts: res
			});
		});
	}
	

	createPost = (data) => {
    // 	let newPost = {
    //     	name: data.name,
    //     	apt_location: data.apt_location,
    //     	price: data.price,
 	// 		roommates_needed: data.roommates_needed,
 	// 		apt_details: data.apt_details 
    // 	};
    
    	ListModel.create(data)
    	.then((res) => {
        	this.fetchData()
   		})
   		.catch(err => {
   			console.log(err)
   			return err
   		});
	};

	deletePost = (post) => {
		let idToDelete = post.rowid
  			ListModel.delete(idToDelete).then(res => {
    			let posts = this.state.posts.filter(post => {
      			return post.rowid !== idToDelete;
    		})
    		this.setState({ posts })
  		})
	}

	updatePost = (post) => {
		ListModel.update(post)
		.then(data => {
			this.setState({ post: data }) 
				this.fetchData()
		

		})
	}
	

	render() {
 		 return (
 		 	<div className="Listings">

 		 	<CreatePostForm 
 		 	createPost= { this.createPost } />

 		 	<h1 style = {{'textAlign': 'center'}}> Available Listings </h1>
  			{ this.state.posts ? 
  			<Posts 
  			posts = {this.state.posts}  
  			deletePost={this.deletePost}
  			updatePost={this.updatePost}
  			/> : "Loading.." } 
  			</div>
  		);
 	};
};

export default Listings;