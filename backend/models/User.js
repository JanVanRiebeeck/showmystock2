// models User.js

const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.ObjectID;

const userSchema = mongoose.Schema(
  {
    // Let user set his Company name or Personal name
    username: {
      type: String,
      required: [true, "username (Company or personal) is required"],
      trim: true,
      text: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique: true,
    },
    // TODO: use brypt to hash passwords before saving to DB
    password: {
      type: String,
      required: [true, "password is required"],
    },
    picture: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.2.752573479.1691064452&semt=country_rows_v2",
    },
    // False until he received an email and verified it
    verified: {
      type: Boolean,
      default: false,
    },
    // each user can request to be a client of any user, so that user will be their supplier, suppliers will be able to accept, reject applications
    // so that they can control who has access to their stock
    suppliers: [
      {
        user: {
          type: ObjectID,
          ref: "User",
        },
      },
    ],

    clients: [
      {
        user: {
          type: ObjectID,
          ref: "User",
        },
      },
    ],

    requests: [
      {
        user: {
          type: ObjectID,
          ref: "User",
        },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
        },
      },
    ],

    // Allow other companies to search and receive information about other users (Suppliers)
    search: [
      {
        user: {
          type: ObjectID,
          ref: "User",
        },
      },
    ],
    // This is optional, if a company enters details, then another user can search for companies in their area and retrieve a list of companies
    details: {
      companyName: {
        type: String,
      },
      companyDescription: {
        type: String,
      },
      contactDetails: {
        type: String,
      },
      AddressLine: {
        type: String,
      },
      Town: {
        type: String,
      },
      City: {
        type: String,
      },
      Country: {
        type: String,
      },
    },
  },
  {
    // To keep track of when a user requested a stock item
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
