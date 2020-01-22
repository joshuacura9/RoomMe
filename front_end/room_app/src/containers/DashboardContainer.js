import React, { Component } from 'react';
import Listings from '../components/Listings';

import ListModel from '../models/List';


class DashboardContainer extends Component {
  	render() {
  		ListModel.all().then((res) => {
  			console.log(res);
  		});
    	return (
        <div className="container">
            
                
                  < Listings />
                
            
        </div>
    	);
  	};
};

export default DashboardContainer;