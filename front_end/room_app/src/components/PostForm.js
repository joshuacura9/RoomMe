//TodoForm.js
import React, { Component } from 'react';

class PostForm extends Component {
  state = {
    name: '',
    apt_location: '',
    price: '',
    roommates_needed: '',
    apt_details: ''
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    
    const post = {
      rowid: this.props.post.rowid,
      name: this.state.name,
      apt_location: this.state.apt_location,
      price: this.state.price,
      roommates_needed: this.state.roommates_needed,
      apt_details: this.state.roommates_needed
    }

    
    this.props.updatePost(post);
    this.setState({ post: '' });

  };

  render() {
    return (
      <div style={this.props.style} className='postForm'>
        <form onSubmit={ this.onSubmit }>
          <input
            name = "name"
            autoFocus={this.props.autoFocus}
            onChange={ this.onChange }
            placeholder='Edit Name'
            type='text'/>
          <input
            name="apt_location"
            autoFocus={this.props.autoFocus}
            onChange={ this.onChange }
            placeholder='Edit Location'
            type='text'/>
          <input
            name="price"
            autoFocus={this.props.autoFocus}
            onChange={ this.onChange }
            placeholder='Edit Price'
            type='text'/>
          <input
            name="roommates_needed"
            autoFocus={this.props.autoFocus}
            onChange={ this.onChange }
            placeholder='Edit Roomates needed'
            type='text'/>
           <input
            name="apt_details"
            autoFocus={this.props.autoFocus}
            onChange={ this.onChange }
            placeholder='Edit Details'
            type='text'/>
          <button type='submit'>Save</button>
        </form>
      </div>
    );
  };
};

export default PostForm;