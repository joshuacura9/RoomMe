import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../App.css';

class Carouselpic extends Component {
  render() {
  		return (
  		<div className="Testimonial">
    	<Carousel>
  		<Carousel.Item>
    	<img
      	className="d-block w-100"
     	 src="https://images1.apartments.com/i2/T6uRs5zTtiJThdIbUlWJVkCFR1qHmIevGYffjhnogPI/117/bay-bridge-views-unit-3308-san-francisco-ca-building-photo.jpg"
      	alt="First slide"
    	/>
    	<Carousel.Caption>
    	
      </Carousel.Caption>
  		</Carousel.Item>
  		<Carousel.Item>
    	<img
      	className="d-block w-100"
      	src="https://s.hdnux.com/photos/76/17/32/16316071/5/920x920.jpg"
      	alt="Third slide"
    	/>

    	<Carousel.Caption>
      	
    
    	</Carousel.Caption>
  		</Carousel.Item>
  		<Carousel.Item>
    	<img
      	className="d-block w-100"
      	src="https://r-cf.bstatic.com/images/hotel/max1024x768/765/76537112.jpg"
      	alt="Third slide"
    	/>

    	<Carousel.Caption>
      
    	</Carousel.Caption>
  		</Carousel.Item>
		</Carousel>
		</div>
		);
	};
}
export default Carouselpic;