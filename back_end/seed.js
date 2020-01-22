//require the database model 
const db = require('./database.js');

//starter data think about what you really want here!

const users_list = [
	{
	name: "Joshua Cura",
	email: "jjjjjjj@gmail.com",
	password: "Pizza5"
	},
	{
	name: "Troy Cura",
	email: "tttttt@gmail.com",
	password: "Pizza"
	}
];


const posting_list = [
	{	
	name: "Josh",
 	apt_location: "San Francisco",
 	price: "$2250",
 	roommates_needed: "./image1.jpg",
 	apt_details: "2 bedrooms 2 bathrooms, 1 million square feet, overlooking Bay Bridge"
	},
	{
	name: "Troy",
	apt_location: "Oakland",
	price: "$1400",
	roommates_needed: "./image2.jpg",
	apt_details: "2 bedrooms 1 bathroom, located close to Bart"	
	},
	{
	name: "Sarah",
	apt_location: "Mountain View",
	price: "$2200",
	roommates_needed: "./image3.jpg",
	apt_details: "2 bedrooms 2 bathroom, located close to Bart"	
	},
	{
	name: "Dann",
	apt_location: "Fremont",
	price: "$1500",
	roommates_needed: "image4.jpg",
	apt_details: "3 bedrooms 2 bathroom, located close to Bart"	
	}
];

const deletePosting = 'DELETE FROM listings'; 
const insertIntoPosting = 'INSERT INTO listings VALUES (?, ?, ?, ?, ?)';
const deleteUser = 'DELETE FROM users';
const insertIntoUser = 'INSERT INTO users VALUES (?, ?, ?)';

db.run(deletePosting, error => {
  	if (error) console.log(new Error('Could not delete posting'), error);
  	else {
    	posting_list.forEach(posting => {
      		db.run(insertIntoPosting, [posting.name, posting.apt_location, posting.price, posting.roommates_needed, posting.apt_details], error => {
        		if (error) console.log(new Error('Could not add posting'), error);
        		else {
          			console.log(`${posting.name} successfully added to the database!`);
          		}
      		});
    	});
    		db.run(deleteUser, error => {
    			if (error) console.log(new Error('Could not delete users'), error);
      			else {
        			users_list.forEach(users => {
          				db.run(insertIntoUser, [users.name, users.email, users.password], error => {
            				if (error) console.log(new Error('Could not add users'), error);
            				else {
              					console.log(`${users.name} successfully added to the database!`);
							              			
              			}
              		});	
            	});
			};
		})
	}
});


