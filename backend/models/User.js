// models User.js

const mongoose = require("mongoose");
const { Schema } = mongoose; // Import Schema from mongoose

const userSchema = mongoose.Schema(
  {
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
          type: Schema.Types.ObjectId, // Use Schema.Types.ObjectId here
          ref: "User",
        },
      },
    ],

    clients: [
      {
        user: {
          type: Schema.Types.ObjectId, // Use Schema.Types.ObjectId here
          ref: "User",
        },
      },
    ],

    requests: [
      {
        user: {
          type: Schema.Types.ObjectId, // Use Schema.Types.ObjectId here
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
          type: Schema.Types.ObjectId, // Use Schema.Types.ObjectId here
          ref: "User",
        },
      },
    ],
    // This is optional, if a company enters details, then another user can search for companies in their area and retrieve a list of companies
    details: {
      accountType: {
        type: String,
        enum: ["personal", "company"],
      },
      companyName: {
        type: String,
      },
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      companyDescription: {
        type: String,
      },
      bio: {
        type: String,
      },
      vatNumber: {
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
      servicesOrProducts: {
        type: String,
      },
      reviewScore: {
        type: Number, // Or any other type to represent the review score
      },
      memberSince: {
        type: Date,
        default: Date.now,
      },
      socialLinks: {
        website: {
          type: String,
        },
        youtube: {
          type: String,
        },
        linkedin: {
          type: String,
        },
        twitter: {
          type: String,
        },
        facebook: {
          type: String,
        },
        instagram: {
          type: String,
        },
      },
    },
  },
  {
    // To keep track of when a user requested a stock item
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
