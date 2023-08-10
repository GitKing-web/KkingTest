const { model, Schema } = require("mongoose");
const UserSchema = new Schema({
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  referral_code: {
    type: String,
  },
  balance: {
    type: Number,
    default: 5000,
  },
});

const User = model("User", UserSchema);
module.exports = User;
