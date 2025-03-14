import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId; // Password required only for email signups
    },
  },
  googleId: {
    type: String, // This field is only used for Google OAuth
  },
});

export default mongoose.model("User", userSchema);
