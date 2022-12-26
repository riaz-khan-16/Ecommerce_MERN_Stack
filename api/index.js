
                                  //  100%/
                                  
const express = require("express");            // import express
const app = express();                            // initialization of express
const mongoose = require("mongoose");             // import mongoose
const dotenv = require("dotenv");                  // for security
dotenv.config();                                    // initialization of dot env
const userRoute = require("./routes/user");        // User related routes   
const authRoute = require("./routes/auth");         // authentication  routes
const productRoute = require("./routes/product");    // for products    
const cartRoute = require("./routes/cart");    // for cart                    
const orderRoute = require("./routes/order"); // for oder routes
const stripeRoute = require("./routes/stripe");  // for payment system
const cors = require("cors");     // The CORS mechanism supports secure cross-origin requests and data transfers between browsers and servers. Modern browsers use CORS in APIs such as XMLHttpRequest or Fetch to mitigate the risks of cross-origin HTTP requests.






mongoose             // in order to make connection with mongo DB ..
  .connect("mongodb://riazkhan:222666@ac-vpy6anf-shard-00-00.ipm1yks.mongodb.net:27017,ac-vpy6anf-shard-00-01.ipm1yks.mongodb.net:27017,ac-vpy6anf-shard-00-02.ipm1yks.mongodb.net:27017/?ssl=true&replicaSet=atlas-ghqfqe-shard-0&authSource=admin&retryWrites=true&w=majority"
  )         // the connection string is uesd 
  .then(() => console.log("DB Connection Successfull!")) // if connection is success this message will log
  .catch((err) => {   // if connection is failed this error message will be shown
    console.log(err);
  });














app.use(cors());   // CORS comes in to handle cross-origin requests.Cross-Origin Resource Sharing
                    // https://blog.knoldus.com/a-guide-to-cors-in-node-js-with-express/
                       
app.use(express.json());   // The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use("/api/auth", authRoute);  //done
app.use("/api/users", userRoute); //done
app.use("/api/products", productRoute); // done
app.use("/api/carts", cartRoute);  //done
app.use("/api/orders", orderRoute); //done
app.use("/api/checkout", stripeRoute); //done

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});



