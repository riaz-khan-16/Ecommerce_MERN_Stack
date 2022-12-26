const Order = require("../models/Order"); //create an schema for  order informations
const {
  verifyToken,                            
  verifyTokenAndAuthorization,             // import verification tokens
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();    //omport router

//CREATE

router.post("/", verifyToken, async (req, res) => {   //when you got "/" post request
  const newOrder = new Order(req.body);               // creat an object using oder model

  try {                                           // try this
    const savedOrder = await newOrder.save();    // save the information collected from req into MOngoDB
    res.status(200).json(savedOrder);        //if success give this message
  } catch (err) {                                  //if failed
    res.status(500).json(err);                   // give error message
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {   // when got "/:id" post request
  try {                                                      //try this
    const updatedOrder = await Order.findByIdAndUpdate(   //find the id to update
      req.params.id,                                   
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);          //if updated successfully give this message
  } catch (err) {              // if failed 
    res.status(500).json(err);     //give this error message
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {        // if you got this delete requet
  try {                                                     //try to do this
    await Order.findByIdAndDelete(req.params.id);              // find that id and delete his information
    res.status(200).json("Order has been deleted...");    // if deleted successfully give this message
  } catch (err) {                                   // if failed
    res.status(500).json(err);                // give this error message
  }
});

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {       // to find the orders of any users
  try {
    const orders = await Order.find({ userId: req.params.userId });  // find by uesr id
    res.status(200).json(orders);                                   // get the information in json format
  } catch (err) {                                           //if failed
    res.status(500).json(err);                               //give this error message
  }
});

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {        //getting the list of alll oredes
  try {
    const orders = await Order.find();                             //find all orders
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});                                           

// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {           // to get the total income of the month by selling products          
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;                      
