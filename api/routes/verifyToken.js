


                         //This file is created for verifying the togen



const { request } = require("express");
const jwt = require("jsonwebtoken");       

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;              //taking the togen from request
  if (authHeader) {                                  // if the token is gotten
    const token = authHeader.split(" ")[1];                  // The split() method splits a string into a list. You can specify the separator, default separator is any whitespace. Note: When maxsplit is specified, the list will contain the specified number of elements plus one.
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {    //use the verify() method to validate the claims    
      if (err) res.status(403).json("Token is not valid!");        // if not verified
      req.user = user;                                          // if valid,take user from request
      next();                                                   //If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging
    });
  } else {                                              // if the token is not gotten
    return res.status(401).json("You are not authenticated!");       // return error message
  }                                                              
};

const verifyTokenAndAuthorization = (req, res, next) => {                   
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) { // if the user id and parameter id is same or User is an admin
      next();                                                   
    } else {   
      res.status(403).json("You are not alowed to do that!");// give error message
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {     // verify the user is admin or not
  verifyToken(req, res, () => {                         
    if (req.user.isAdmin) {                          // if admin
      next();                                        //  next() is used to call other “middle-ware” functions with Express
    } else {                                        //if not admin
      res.status(403).json("You are not alowed to do that!");      // give error message
    }
  });
};

module.exports = {                                   // export all the methods
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
