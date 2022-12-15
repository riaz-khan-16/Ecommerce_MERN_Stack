
                                  // I fully understand the code//
                                  
const express = require("express");            // import express
const app = express();                            // initialization of express
const mongoose = require("mongoose");             // import mongoose
const dotenv = require("dotenv");                  // for security
dotenv.config();                                    // initialization of dot env
const userRoute = require("./routes/user");        // User related routes   
const authRoute = require("./routes/auth");         // authentication  routes
const productRoute = require("./routes/product");    // for products    
const cartRoute = require("./routes/cart");    // for cart
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");


mongoose
  .connect("mongodb://riazkhan:222666@ac-vpy6anf-shard-00-00.ipm1yks.mongodb.net:27017,ac-vpy6anf-shard-00-01.ipm1yks.mongodb.net:27017,ac-vpy6anf-shard-00-02.ipm1yks.mongodb.net:27017/?ssl=true&replicaSet=atlas-ghqfqe-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});



