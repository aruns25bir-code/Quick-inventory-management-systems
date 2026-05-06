const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Customer = require("./models/Customer");

dotenv.config();

const customers = [
  {
    name: "John Smith",
    email: "john@example.com",
    phone: "9876543210",
    address: "123 Tech Park, Bangalore",
    type: "Regular",
    totalSpent: 15000
  },
  {
    name: "Alice Johnson",
    email: "alice@gmail.com",
    phone: "8888877777",
    address: "45 Garden View, Mumbai",
    type: "New",
    totalSpent: 0
  },
  {
    name: "Robert Brown",
    email: "robert@outlook.com",
    phone: "9990001112",
    address: "12 Industrial Area, Delhi",
    type: "Regular",
    totalSpent: 55000
  },
  {
    name: "Sarah Williams",
    email: "sarah.w@yahoo.com",
    phone: "7776665554",
    address: "88 Skyline Apts, Chennai",
    type: "New",
    totalSpent: 2500
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/quick-inventory-system");
    await Customer.deleteMany({});
    await Customer.insertMany(customers);
    console.log("Database Seeded with Customers!");
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDB();
