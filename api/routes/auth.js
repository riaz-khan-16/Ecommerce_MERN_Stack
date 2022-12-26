const router = require("express").Router();  // importing router
const User = require("../models/User");    // schema of User          
const CryptoJS = require("crypto-js");      // Crypto is a module ... performs data encryption and decryption. This is used for security purpose like user authentication where storing the password in Database in the encrypted form. Crypto module provides set of classes like hash, HMAC, cipher, decipher, sign, and verify.
const jwt = require("jsonwebtoken");          // JWT, or JSON Web Token, is an open standard used to share information between two parties securely — a client and a server. In most cases, it's an encoded JSON containing a set of claims and a signature.







//For REGISTER a new User 
router.post("/register", async (req, res) => {   // When it gets /register end point it will perform this post method
  const newUser = new User({                  // creating an User object    
    username: req.body.username,         // assigningin username from request object that is send from form
    email: req.body.email,                // assigningin email from request object that is send from form
    password: CryptoJS.AES.encrypt(            // encryption of the password
      req.body.password,                   // collecting password from request
      process.env.PASS_SEC                 // collecting from env file   
    ).toString(),                         
  });

  try {                        // try to do this
    const savedUser = await newUser.save();     // save the user information into database      
    res.status(201).json(savedUser);          /// if it is done give this messsage
  } catch (err) {                     // if try is failed 
    res.status(500).json(err);             // give this error message 
  }
});















//For LOGIN                         

router.post("/login", async (req, res) => {     // when server got /login post request it will perform this code
  try {                                                                 // try to do code below
    const user = await User.findOne({ username: req.body.username });     // The findOne() function is used to find one document according to the condition. If multiple documents match the condition, then it returns the first document satisfying the condition.
    !user && res.status(401).json("Wrong credentials!");          // if not found give this message

    const hashedPassword = CryptoJS.AES.decrypt(                    // take the password and decrypt it
      user.password,                                                
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8); // convert to string

    OriginalPassword !== req.body.password &&                             // if original pass doesen't match with requested pass
      res.status(401).json("Wrong credentials!");              // show this message

    const accessToken = jwt.sign(                       // to generate web token sign() method is used for authentication
      {
        id: user._id,                     
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      {expiresIn:"3d"}
    );

    const { password, ...others } = user._doc;

    res.status(200).json({...others, accessToken});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
