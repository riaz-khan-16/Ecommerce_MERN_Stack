const mongoose = require("mongoose");           // imporing mongooes for handling MOngoDB

const UserSchema = new mongoose.Schema(                    // creating an structure of USer information
  {
    username: { type: String, required: true, unique: true },   // User name is a string and it is required value
    email: { type: String, required: true, unique: true },          // email is a string and it is required value
    password: { type: String, required: true },            // password is a string and it is required value
    isAdmin: {                                              // it is an boolean  data means true or false
      type: Boolean,
      default: false,                                     // 
    },
    img: { type: String },                              // img is an string type data
  },
  { timestamps: true }                                  //  Mongoose timestamps are supported by the schema. Timestamps save the current time of the document created and also when it was updated in form of a Date by turning it true. When set to true, the mongoose creates two fields as follows: createdAt: Date representing when the document was created.
);                                                       // updatedAt: Date representing when this document was last updated

module.exports = mongoose.model("User", UserSchema);             // exporting the schema of User
