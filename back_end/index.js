// REQUIRE STATEMENTS
let express = require('express');
let database = require('./database.js');
let app = express();

// MIDDLEWARE
app.use(express.json());

let setCORS = (request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  response.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE")
  next()
}
app.use(setCORS)

// CONFIG VARIABLES
const port = 4000;

// ROUTES
app.get('/', (request, response) => {
  response.send('Visit /listings to view our active listings!');
});


// GET ALL LISTINGS
app.get('/api/listings',  (req, res) => {
  const getAllListings = "SELECT *, oid FROM listings";
  database.all(getAllListings, (error, results) => {
    if (error) {
      console.log(new Error('Could not retrieve all listings'), error);
      res.sendStatus(500);
    }
    res.status(200).json(results);
  });
});


// GET ONE LISTING BY ID
app.get('/api/listings/:id',  (req, res) => {
  let listingId = req.params.id;
  const getOneListing = `SELECT * FROM listings WHERE listings.oid = ${listingId}`
  database.all(getOneListing, (error, result) => {
    if (error) {
      console.log("Could not retrieve listing by ID.")
      res.sendStatus(500)
    } else {
      res.status(200).json(result)
    }
  })
});


// CREATE A NEW LISTING
app.post('/api/listings',  (req, res) => {
  let createNewListing = `INSERT into listings VALUES (?, ?, ?, ?, ?)`
  let reqBody = [req.body.name, req.body.apt_location, req.body.price, req.body.roommates_needed, req.body.apt_details];

  database.run(createNewListing, reqBody, (error, result) => {
    if (error) {
      console.log("Error inserting a new listing", error)
    } else {
      res.status(200).json(result);
      console.log (`Added a new listing $ {req.body.name}`)
    }
  })
});


// UPDATE LISTING
app.put('/api/listings/:id', (req,res) => {
  // get book id from url params (`req.params`)
  const listingId = parseInt(req.params.id);

  // Use the keys in req.body to create dynamic SET values for the query string
  const queryHelper = Object.keys(req.body).map(ele => `${ ele.toUpperCase() } = ?`);

  // Use the dynamic SET values in from queryHelper to build full UPDATE string
  const updateOneListing = `UPDATE listings SET ${queryHelper.join(', ')} WHERE listings.oid = ?`;

  // Add values from req.body and the bookId to an array for use in database.run()
  const queryValues = [...Object.values(req.body), listingId];


  database.run(updateOneListing, queryValues, function (error) {
    if (error) {
      console.log(new Error('Could not update listing'), error);
      res.sendStatus(500);
    } else {
      console.log(`listing with ID ${listingId} was updated successfully`);
      res.sendStatus(200);
    }
  });
});


// DELETE LISTING
app.delete('/api/listings/:id',  (req, res) => {
  // get book id from url params (`req.params`)
    let deleteById = `DELETE FROM listings WHERE listings.oid = ?`
    let listingId = req.params.id; 

  database.run(deleteById, listingId, (error) => {
    if (error) {
      res.sendStatus(500);
      console.log("Could not delete listing", error);
    }
    else {
      console.log("listing deleted")
      res.sendStatus(200);
    }
  }) 
});


////////////////////////////////////////////////////////////
//////////////////////USER ROUTES///////////////////////////
////////////////////////////////////////////////////////////
//GET ALL USERS 
app.get('/api/users',  (req, res) => {
  const getAllUsers = "SELECT * FROM users";
  database.all(getAllUsers, (error, results) => {
    if (error) {
      console.log(new Error('Could not retrieve all users'), error);
      res.sendStatus(500);
    }
    res.status(200).json(results);
  });
});


//GET ONE USER
app.get('/api/users/:id',  (req, res) => {
  let userId = req.params.id;
  const getOneUser = `SELECT * FROM users WHERE users.oid = ${userId}`
  database.all(getOneUser, (error, result) => {
    if (error) {
      console.log("Could not retrieve user by ID.")
      res.sendStatus(500)
    } else {
      res.status(200).json(result)
    }
  })
});


//NEW USER
app.post('/api/users',  (req, res) => {
  let createNewUser = `INSERT into users VALUES (?, ?, ?)`
  let reqBody = [req.body.name, req.body.email, req.body.password];

  database.run(createNewUser, reqBody, (error, result) => {
    if (error) {
      console.log("Error inserting a new user", error)
    } else {
      res.status(200).json(result);
      console.log (`Added a new user $ {req.body.name}`)
    }
  })
});


//UPDATE USER
app.put('/api/users/:id', (req,res) => {
  // get book id from url params (`req.params`)
  const userId = parseInt(req.params.id);

  // Use the keys in req.body to create dynamic SET values for the query string
  const queryHelper = Object.keys(req.body).map(ele => `${ ele.toUpperCase() } = ?`);

  // Use the dynamic SET values in from queryHelper to build full UPDATE string
  const updateOneUser = `UPDATE users SET ${queryHelper.join(', ')} WHERE users.oid = ?`;

  // Add values from req.body and the bookId to an array for use in database.run()
  const queryValues = [...Object.values(req.body), userId];


  database.run(updateOneUser, queryValues, function (error) {
    if (error) {
      console.log(new Error('Could not update user'), error);
      res.sendStatus(500);
    } else {
      console.log(`listing with ID ${userId} was updated successfully`);
      res.sendStatus(200);
    }
  });
});


//DELETE USER
app.delete('/api/users/:id',  (req, res) => {
  // get book id from url params (`req.params`)
    let deleteById = `DELETE FROM users WHERE users.oid = ?`
    let userId = req.params.id; 

  database.run(deleteById, userId, (error) => {
    if (error) {
      res.sendStatus(500);
      console.log("Could not delete user", error);
    }
    else {
      console.log("user deleted")
      res.sendStatus(200);
    }
  }) 
});


// Start Server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});