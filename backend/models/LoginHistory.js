const mongoose = require("mongoose");

const loginHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  loginTime: { type: Date, default: Date.now },
  ip: { type: String, default: "" },
  userAgent: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("LoginHistory", loginHistorySchema);
