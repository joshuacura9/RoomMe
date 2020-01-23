import React, { Component } from 'react';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password2: '',
    errors: null,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Register Submit - ', this.state);
    const newUser = this.state;
   	fetch(`http://localhost:4000/register`, {
   		method: 'POST',
   		headers: {
   		  
	      'Content-type': 'application/json'
	    },
    	body: JSON.stringify(newUser)
	})
		.then(response => response.json())
  		.then((responseJson) => console.log(responseJson))
		.catch(error => console.log(error));
	}

  render() {
    return (
      <div className="row">
        {this.state.errors && this.state.errors.map((e, i) => (
          <div className="alert alert-danger alert-dismissible fade show" style={{width: '100%'}} role="alert" key={i}>
            {e.message}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ))}
        <section id="register" className="col-md-6 offset-md-3">
          <h2 className="mb-4">Register</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="username" id="username" name="username" value={this.state.username} onChange={this.handleChange} className="form-control form-control-lg" placeholder="Username"/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control form-control-lg" placeholder="email@whatever.com"/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control form-control-lg" />
            </div>
            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <input type="password" id="password2" name="password2" value={this.state.password2} onChange={this.handleChange} className="form-control form-control-lg" />
            </div>
            <button style= {{ backgroundColor: 'rgb(35,31,32)', color: 'white', borderColor:'black' }} type="submit" className="btn btn-primary float-right">Register</button>
          </form>
        </section>
      </div>
    );
  };
};

export default Register;