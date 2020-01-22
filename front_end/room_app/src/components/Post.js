import React, { Component } from 'react';
import ListModel from '../models/List';
import Card from 'react-bootstrap/Card';
import PostForm from './PostForm';


class Post extends Component {
  
  state = {
    formStyle: {
      display: 'none'
    }
  }

  toggleBodyForm = () => {
    this.state.formStyle.display === 'block'
    ? this.setState({ formStyle: { display: 'none' } })
    : this.setState({ formStyle: { display: 'block' } })
  }

  deleteClickedPost = () => {
    this.props.deletePost(this.props.post);
  };

   



  render() {
	  ListModel.all()
	 .then( (res) => {
		console.log(res)
	});
	return(
		// <li data-post-index={this.props.post.rowid}>
  		// <span className="post-item">{this.props.post.name} - {this.props.post.apt_details} - {this.props.post.price} </span>
  		//  </li> 
    <div>
  	     <Card style={{ width: `$ {50}%` }}>
  		       <Card.Img style={{ 'maxHeight': '480px'}} variant="top" src={this.props.post.roommates_needed} />
  		       <Card.Body>
    	         <Card.Title>{this.props.post.name} {this.props.post.apt_location}</Card.Title>
    	         <Card.Text>
		              {this.props.post.price}
    	            {this.props.post.apt_details}
    	         </Card.Text>
    	       </Card.Body>
		     </Card>
        <div data-todos-index={this.props.rowid }>
            <span className="todo-item">{this.props.post.body} </span>
            <button 
              style = {{'backgroundColor': 'rgb(35,31,32)', 'padding': '12px','color': 'white', }} 
              className='remove' 
              onClick={this.deleteClickedPost}
            >
              Remove
            </button>
            <button style = {{'backgroundColor': 'rgb(35,31,32)', 'padding': '12px','color': 'white', }} onClick={this.toggleBodyForm}>Edit Form</button>
        </div>
         <PostForm 
              post={this.props.post}
              style={this.state.formStyle}
              autoFocus={true}
              buttonName="Update Listing!"
              updatePost={this.props.updatePost}
          /> 
    </div>

  		// <div className="card" style={{width: `${50}%`}}>
  		// 	<div className="card-body">
				// <h5 className="card-title">{this.props.post.name}</h5>
				// <h5>{this.props.post.apt_location} {this.props.post.price}</h5>
				// <h5>{this.props.post.roommates_needed}</h5>
				// <p class="card-text">{this.props.post.apt_details}</p>
  		// 	</div>
  		// </div>

	)};
};

export default Post;