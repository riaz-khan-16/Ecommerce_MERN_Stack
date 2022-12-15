const Product = require("../models/Product");// import product schema
const {                              
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");     // import the verify token route

const router = require("express").Router();   // import router 

//CREATE                 

router.post("/", verifyTokenAndAdmin, async (req, res) => { // When server gots '/' post request at first it will verify the token then execute the codes
  const newProduct = new Product(req.body);   // Using product schema made an product object

  try {                                  // try the codde below
    const savedProduct = await newProduct.save();  //save the product information
    res.status(200).json(savedProduct);        // if success give this message
  } catch (err) {                              // if failed 
    res.status(500).json(err);                  //  give this error message 
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {   // if the server get put request using "/:id" verify token and run the code below
  try {                                                  // try the  codde below
    const updatedProduct = await Product.findByIdAndUpdate(      // The findByIdAndUpdate() function is used to find a matching document, updates it according to the update arg, passing any options, and returns the found document (if any) to the callback.            
      req.params.id,                                         // the requested ID
      {
        $set: req.body,                                          // Update body
      },
      { new: true }                                              
    );
    res.status(200).json(updatedProduct);               // if try is success give this message
  } catch (err) {                                       // if try is failed
    res.status(500).json(err);                          // give the error message
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {          // of got delete request
  try {                                                                 // try the code 
    await Product.findByIdAndDelete(req.params.id);                   // The findByIdAndDelete() function is used to find a matching document, removes it, and passing the found document (if any) to the callback.

    res.status(200).json("Product has been deleted...");                  // give this success message
  } catch (err) {                                                     // if the try is failed 
    res.status(500).json(err);                                        //give this error message
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {                            //if server got this get "/find/:id" request perform the codde below
  try {                                                               // try this code
    const product = await Product.findById(req.params.id);              // find the matched ID
    res.status(200).json(product);                                        // if success give this message
  } catch (err) {                                                    // if not 
    res.status(500).json(err);                                          //give this message
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {        // when server gets this "/" get request it will run the codes below
  const qNew = req.query.new;                     // In Express.js, you can directly use the req.query() method to access the string variables. As per the documentation, the req.param method only gets the route parameters, whereas the req.query method checks the query string parameters.
  const qCategory = req.query.category;        
  try {                                      // try it
    let products;                              // defining product variable

    if (qNew) {                               // if new query is gotten
      products = await Product.find().sort({ createdAt: -1 }).limit(1);   // The sort() method specifies the order in which the query returns the matching documents from the given collection. You must apply this method to the cursor before retrieving any documents from the database. It takes a document as a parameter that contains a field: value pair that defines the sort order of the result set. The value is 1 or -1 specify an ascending or descending sort respectively.
    } else if (qCategory) {                                //  // if category query is gotten           
      products = await Product.find({    
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
