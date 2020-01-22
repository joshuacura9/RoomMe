const endPoint = 'http://localhost:4000/api/listings';

class ListModel {
  static all = () => {
    return fetch(endPoint)
      // return a promise with response.json() that we can use to load todos from the DB in frontend components
      .then(response => response.json())
      .catch(err => console.log('Could not get all listings', err));
  };

    static create = (e) => {
		return fetch(endPoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(e)
		})
		.then(res=>res.json())
		.catch(err => console.log('error', err))
	}

    static delete = (post) => {
    	return fetch(`${endPoint}/${post}`, { 
      		method: "DELETE" 
    	})
      	.then(response => response.json())
      	.catch(err => console.log('Could not delete listing \n', err));
  	};

     static update = (post) => {
      return fetch(`${endPoint}/${post.rowid}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(post)
    })
        .then(response => response.json())
        .catch(err => console.log('Could not update post \n', err));


  };

};

	

export default ListModel;