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
  {
    name: "Leather Tote Bag",
    description:
      "Spacious leather tote crafted for daily elegance and comfort.",
    price: 89.5,
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    category: "Accessories",
    countInStock: 12,
  },
  {
    name: "Ceramic Coffee Mug",
    description: "Handmade ceramic mug with a smooth matte finish.",
    price: 24.0,
    imageUrl:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
    category: "Home",
    countInStock: 18,
  },
  {
    name: "Ultra HD Monitor",
    description:
      "Crisp display with vibrant colors for work and entertainment.",
    price: 349.99,
    imageUrl:
      "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=800&q=80",
    category: "Electronics",
    countInStock: 8,
  },
  {
    name: "Winter Jacket",
    description: "Water-resistant jacket designed for cold weather comfort.",
    price: 149.0,
    imageUrl:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80",
    category: "Apparel",
    countInStock: 14,
  },
  {
    name: "Smart Watch Lite",
    description: "Track your fitness and stay connected with a sleek design.",
    price: 159.99,
    imageUrl:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
    category: "Electronics",
    countInStock: 9,
  },
  {
    name: "Portable Blender",
    description: "Compact blender perfect for smoothies on the go.",
    price: 54.99,
    imageUrl:
      "https://static-01.daraz.pk/p/0ebadcb3310c433535e61e14c809fc37.jpg",
    category: "Home",
    countInStock: 11,
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable speaker with deep bass and long battery life.",
    price: 79.99,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVms6oIFaHz0stn7WkzgGdersf8ShDHlpg_zG0t_5hQQ&s=10",
    category: "Electronics",
    countInStock: 13,
  },
  {
    name: "Office Chair",
    description: "Ergonomic chair designed for long working hours.",
    price: 229.99,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtzGIupgsPgNcaG8onNl-Kp7Q8ukRSpgGTeioPjcMebA&s=10",
    category: "Furniture",
    countInStock: 6,
  },
  {
    name: "Backpack",
    description: "Durable backpack with multiple compartments.",
    price: 49.99,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDFwd-e8R-FtNN6YwElkMBb10hBmzVMdPwXfZ1wcudyA&s=10",
    category: "Accessories",
    countInStock: 25,
  },
  {
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with tactile switches.",
    price: 129.99,
    imageUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    category: "Gaming",
    countInStock: 10,
  },
  {
    name: "Desk Lamp",
    description: "LED desk lamp with adjustable brightness levels.",
    price: 34.99,
    imageUrl:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    category: "Home",
    countInStock: 16,
  },
  {
    name: "Fitness Tracker",
    description: "Track steps, calories, and heart rate easily.",
    price: 69.99,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuhtVcQefHvJXLlqqf3V47j3LptY65xuOEr4oDcU6Bhg&s=10",
    category: "Electronics",
    countInStock: 14,
  },
  {
    name: "Sunglasses",
    description: "Stylish UV-protection sunglasses for daily wear.",
    price: 39.99,
    imageUrl:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    category: "Accessories",
    countInStock: 22,
  },
  {
    name: "Electric Kettle",
    description: "Fast boiling kettle with auto shut-off feature.",
    price: 44.99,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-st7pRyc-814pfRIIL5mDOYTIYB3dx3kRGo5kJ23Lcg&s=10",
    category: "Home",
    countInStock: 17,
  },
  {
    name: "Laptop Stand",
    description: "Adjustable stand for better posture and airflow.",
    price: 29.99,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROAYo1XYt9Vx28PaduN2OrTVvrSIwBzkQ0ihfPp7YxRA&s=10",
    category: "Accessories",
    countInStock: 19,
  },
  {
    name: "Gaming Chair",
    description: "Comfortable chair with lumbar support for gamers.",
    price: 299.99,
    imageUrl:
      "https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=800&q=80",
    category: "Gaming",
    countInStock: 7,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Seeding");

    await Product.deleteMany();
    await User.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin", salt);

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
