import React, { Component } from 'react';

class Login extends Component {
state = {
    email: '',
    password: '',
    error: null,
};

handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

handleSubmit = (event) => {
    event.preventDefault();
    console.log('Register Submit - ', this.state);
    const loggedUser = this.state;
    fetch(`http://localhost:4000/login`, {
      method: 'POST',
      headers: {
        
        'Content-type': 'application/json'
      },
      body: JSON.stringify(loggedUser)
  })
    .then(response => response.json())
      .then((responseJson) => console.log(responseJson))
    .catch(error => console.log(error));
}

render() {
	return (
      <div className="row">
        {this.state.error && (
          <div className="alert alert-danger alert-dismissible fade show" style={{width: '100%'}} role="alert">
            {this.state.error}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        <section id="login" className="col-md-6 offset-md-3">
          <h2 className="mb-4">Login</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control form-control-lg" placeholder="example@example.com"/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Password</label>
              <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control form-control-lg" />
            </div>
            <button style= {{ backgroundColor: 'rgb(35,31,32)', color: 'white', borderColor:'black' }} type="submit" className="btn btn-primary float-right">Login</button>
          </form>
        </section>
      </div>
    );
  };
 };



export default Login; 