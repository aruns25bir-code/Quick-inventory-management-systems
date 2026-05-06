const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const http = require("http");
const socketHelper = require("./socket");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketHelper.init(server);

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/suppliers", require("./routes/supplierRoutes"));
app.use("/api/stock", require("./routes/stockRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/settings", require("./routes/settingRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));

app.get("/", (req, res) => res.send("Quick Inventory API Running with Real-time Support"));

const PORT = process.env.PORT || 5003;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("disconnect", () => console.log("User disconnected"));
});
