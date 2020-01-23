// REQUIRE STATEMENTS
let express = require('express');
let database = require('./database.js');
let app = express();
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let validate = require('./validation')
// MIDDLEWARE
app.use(express.json());

let setCORS = (request, response, next) => {
  response.set('Access-Control-Allow-Origin', '*')
  response.set('Access-Control-Allow-Headers', '*')
  response.set('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS")
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

// Create a new user (POST)
app.post('/register', (req, res)=>{
  const {errors, notValid} = validate(req.body)

  if(notValid){
    console.log(1)
    return res.status(400).json({status: 400, errors})
  }


  const checkUser = `SELECT * FROM user WHERE user.email = ${req.body.email}`

  database.all(checkUser, (err, checkedUser) => {
    if(checkedUser){
      console.log(2)
      return res.status(400).json({
        status: 400,
        message: 'email is already registered'
      })
    }

    const createNewUser = `INSERT INTO user VALUES (?, ?, ?)`
    bcrypt.genSalt(10, (err, salt) => {
      if(err){
        return res.status(500).json({
          status: 500,
          message: 'something went wrong. try again1'
        })
      }
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if(err){
          return res.status(500).json({
            status: 500,
            message: 'something went wrong. try again2'
          })
        }
        database.run(createNewUser, [req.body.username, req.body.email, hash], (err) => {
          if(err){
            return res.status(500).json({
              status: 500,
              err
            })
          }else{
            res.status(201).json({
              status: 201,
              message: 'success'
            })
          }
        })
      })
    })
  })
})

// Login (POST)
app.post('/login', (req, res) => {
  if(!req.body.email || !req.body.password){
    return res.status(400).json({
      status: 400,
      message: "enter email and password"
    })
  }

  const checkUser = `SELECT *, oid FROM user WHERE user.email = ?`

  database.all(checkUser, [req.body.email], (err, checkedUser) => {
    if(err){
      return res.status(500).json({
        status: 500,
        message: 'something went wrong. try again'
      })
    }else if(!checkedUser){
      return res.status(400).json({
        status: 400,
        message: 'email or password is incorrect'
      })
    }else{
      bcrypt.compare(req.body.password, checkedUser[0].password, (err, isMatch) => {
        if(err){
          return res.status(500).json({
            status: 500,
            message: 'something went wrong. try again'
          })
        }else if(!isMatch){
          return res.status(400).json({
            status: 400,
            message: 'something went wrong. try again'
          })
        }else if(isMatch){
          let user = {
            id: checkedUser[0].rowid
          }

          jwt.sign(user, /*process.env.JWT_SECRET*/ 'testing', {expiresIn: "1hr"}, (err, signedJwt) => {
            if (err){
              return res.status(500).json({
                status:500,
                message: 'something went wrong. try again'
              })
            }
            return res.status(200).json({
              status: 200,
              message: 'success',
              id: checkedUser[0].rowid,
              signedJwt
            })
          })
        }
      })
    }
  })
})


// app.get('/api/users',  (req, res) => {
//   const getAllUsers = "SELECT * FROM users";
//   database.all(getAllUsers, (error, results) => {
//     if (error) {
//       console.log(new Error('Could not retrieve all users'), error);
//       res.sendStatus(500);
//     }
//     res.status(200).json(results);
//   });
// });


// //GET ONE USER
// app.get('/api/users/:id',  (req, res) => {
//   let userId = req.params.id;
//   const getOneUser = `SELECT * FROM users WHERE users.oid = ${userId}`
//   database.all(getOneUser, (error, result) => {
//     if (error) {
//       console.log("Could not retrieve user by ID.")
//       res.sendStatus(500)
//     } else {
//       res.status(200).json(result)
//     }
//   })
// });


//NEW USER
// app.post('/api/users',  (req, res) => {
//   let createNewUser = `INSERT into users VALUES (?, ?, ?)`
//   let reqBody = [req.body.name, req.body.email, req.body.password];

//   database.run(createNewUser, reqBody, (error, result) => {
//     if (error) {
//       console.log("Error inserting a new user", error)
//     } else {
//       res.status(200).json(result);
//       console.log (`Added a new user $ {req.body.name}`)
//     }
//   })
// });


// //UPDATE USER
// app.put('/api/users/:id', (req,res) => {
//   // get book id from url params (`req.params`)
//   const userId = parseInt(req.params.id);

//   // Use the keys in req.body to create dynamic SET values for the query string
//   const queryHelper = Object.keys(req.body).map(ele => `${ ele.toUpperCase() } = ?`);

//   // Use the dynamic SET values in from queryHelper to build full UPDATE string
//   const updateOneUser = `UPDATE users SET ${queryHelper.join(', ')} WHERE users.oid = ?`;

//   // Add values from req.body and the bookId to an array for use in database.run()
//   const queryValues = [...Object.values(req.body), userId];


//   database.run(updateOneUser, queryValues, function (error) {
//     if (error) {
//       console.log(new Error('Could not update user'), error);
//       res.sendStatus(500);
//     } else {
//       console.log(`listing with ID ${userId} was updated successfully`);
//       res.sendStatus(200);
//     }
//   });
// });


//DELETE USER
// app.delete('/api/users/:id',  (req, res) => {
//   // get book id from url params (`req.params`)
//     let deleteById = `DELETE FROM users WHERE users.oid = ?`
//     let userId = req.params.id; 

//   database.run(deleteById, userId, (error) => {
//     if (error) {
//       res.sendStatus(500);
//       console.log("Could not delete user", error);
//     }
//     else {
//       console.log("user deleted")
//       res.sendStatus(200);
//     }
//   }) 
// });


// Start Server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});