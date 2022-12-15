const Cart = require("../models/Cart");       // importing schema or structure
const {
  verifyToken,                            // Importing Authentication Tokens
  verifyTokenAndAuthorization,                 
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();        // imporing routers

//CREATE

router.post("/", verifyToken, async (req, res) => {   // if server gots "/" post request
  const newCart = new Cart(req.body);                  // it will creat an cart object using Cart Schema

  try {                                          // it will try the code below
    const savedCart = await newCart.save();       // save into mongoDB
    res.status(200).json(savedCart);             // is success it will give this message
  } catch (err) {                               // if try is failed 
    res.status(500).json(err);                     // it will give this error messsage
  }
});                                                 

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => { // if server gots "/:id " put request.
  try {                                                             //it wil try this 
    const updatedCart = await Cart.findByIdAndUpdate(                // find id to update
      req.params.id,                                                // the desired ID
      {
        $set: req.body,                                            // Update values
      },
      { new: true }                                                  
    );
    res.status(200).json(updatedCart);                                 // if success give this message
  } catch (err) {                                               //if error
    res.status(500).json(err);                                // give this error mesasge
  } 
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {        //delete the record by id
  try {
    await Cart.findByIdAndDelete(req.params.id);                  // the required id
    res.status(200).json("Cart has been deleted...");             // if success give this success message
  } catch (err) {                                            // if error find
    res.status(500).json(err);                                 /// give this  error message
  }
});

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {   // find any cart by id
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });              
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {//find all cart
  try {
    const carts = await Cart.find();   
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
