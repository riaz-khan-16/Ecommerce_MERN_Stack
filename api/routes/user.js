const User = require("../models/User");  // schema importing

                          




const {                              // importing the methods for verifying token from the verifytoken file
  verifyToken,                       
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");            //to know more about JSON web token ... see the video: https://www.youtube.com/watch?v=S20PCL9e_ks


           




const router = require("express").Router();       //The express.Router() function is used to create a new router object. This function is used when you want to create a new router object in your program to handle requests. 
                                           // to know more about router go https://www.youtube.com/watch?v=iM_S4RczozU
//UPDATE
// when we try to update it will at first authuenticate at first
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {   // giving token verifying function as a middleware 
  if (req.body.password) {                                              // if we got password from request
    req.body.password = CryptoJS.AES.encrypt(                           // if the password matches
      req.body.password,                
      process.env.PASS_SEC                                                // collecting Password from env file
    ).toString();                                                         // converting it into string
  }

  try {                                    // to learn more about try catch go https://www.youtube.com/watch?v=BcAYvnsbmMQ
                                             // try catch method actually used for error handling
    const updatedUser = await User.findByIdAndUpdate(   // The findByIdAndUpdate() function is used to find a matching document, updates it according to the update arg, passing any options, and returns the found document (if any) to the callback.
      req.params.id,            
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);    
  }
});





//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);    // The findByIdAndDelete() function is used to find a matching document, removes it, and passing the found document (if any) to the callback.
    res.status(200).json("User has been deleted...");        
  } catch (err) {
    res.status(500).json(err);
  }
});








//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);  // The findById() function is used to find a single document by its _id field. The _id field is cast based on the Schema before sending the command.
    const { password, ...others } = user._doc;          
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});






//GET ALL USER
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;    
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});






//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
