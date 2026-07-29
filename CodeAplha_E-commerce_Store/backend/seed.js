const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const Product = require("./models/Product");
const User = require("./models/User");

dotenv.config();

const products = [
  {
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
    price: 199.99,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    category: "Electronics",
    countInStock: 10,
  },
  {
    name: "Smartphone Pro",
    description: "The latest smartphone with an advanced camera system.",
    price: 999.99,
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    category: "Electronics",
    countInStock: 5,
  },
  {
    name: "Running Shoes",
    description: "Comfortable running shoes for all terrains.",
    price: 120.0,
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    category: "Apparel",
    countInStock: 20,
  },
  {
    name: "Gaming Mouse",
    description: "Ergonomic gaming mouse with customizable RGB.",
    price: 59.99,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSECOLt2IaVrTOFhHA1NhS-wk6OHUTCEWJ_2HCDkPqRVg&s=10",
    category: "Gaming",
    countInStock: 15,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Seeding");

    await Product.deleteMany();
    await User.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin@123321", salt);

    await User.create({
      name: "Admin User",
      email: "admin@admin.com",
      password: hashedPassword,
      isAdmin: true,
      isMainAdmin: true,
    });

    await Product.insertMany(products);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error("Error importing data:", error);
    process.exit(1);
  }
};

seedDatabase();
