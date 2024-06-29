import mongoose from "mongoose";
import { CategoryModel } from "../../routes/v1/Category/model";

const categories = [
  { name: "Women's Fashion", level: 1 },
  { name: "Women's Tops", parent: "Women's Fashion", level: 2 },
  { name: "Blouses", parent: "Women's Tops", level: 3 },
  { name: "T-shirts", parent: "Women's Tops", level: 3 },
  { name: "Tank Tops", parent: "Women's Tops", level: 3 },
  { name: "Women's Bottoms", parent: "Women's Fashion", level: 2 },
  { name: "Jeans", parent: "Women's Bottoms", level: 3 },
  { name: "Skirts", parent: "Women's Bottoms", level: 3 },
  { name: "Shorts", parent: "Women's Bottoms", level: 3 },
  { name: "Leggings", parent: "Women's Bottoms", level: 3 },
  { name: "Women's Dresses", parent: "Women's Fashion", level: 2 },
  { name: "Casual Dresses", parent: "Women's Dresses", level: 3 },
  { name: "Evening Dresses", parent: "Women's Dresses", level: 3 },
  { name: "Maxi Dresses", parent: "Women's Dresses", level: 3 },
  { name: "Women's Shoes", parent: "Women's Fashion", level: 2 },
  { name: "Women's Sneakers", parent: "Women's Shoes", level: 3 },
  { name: "Women's Boots", parent: "Women's Shoes", level: 3 },
  { name: "Women's Sandals", parent: "Women's Shoes", level: 3 },
  { name: "Women's Accessories", parent: "Women's Fashion", level: 2 },
  { name: "Bags", parent: "Women's Accessories", level: 3 },
  { name: "Scarves", parent: "Women's Accessories", level: 3 },
  { name: "Hats", parent: "Women's Accessories", level: 3 },

  { name: "Health & Beauty", level: 1 },
  { name: "Skincare", parent: "Health & Beauty", level: 2 },
  { name: "Cleansers", parent: "Skincare", level: 3 },
  { name: "Moisturizers", parent: "Skincare", level: 3 },
  { name: "Serums", parent: "Skincare", level: 3 },
  { name: "Makeup", parent: "Health & Beauty", level: 2 },
  { name: "Foundation", parent: "Makeup", level: 3 },
  { name: "Lipstick", parent: "Makeup", level: 3 },
  { name: "Eyeshadow", parent: "Makeup", level: 3 },
  { name: "Haircare", parent: "Health & Beauty", level: 2 },
  { name: "Shampoo", parent: "Haircare", level: 3 },
  { name: "Conditioner", parent: "Haircare", level: 3 },
  { name: "Hair Treatments", parent: "Haircare", level: 3 },
  { name: "Hair Oils & Serums", parent: "Haircare", level: 3 },
  { name: "Hair Loss Products", parent: "Haircare", level: 3 },
  { name: "Personal Care", parent: "Health & Beauty", level: 2 },
  { name: "Oral Care", parent: "Personal Care", level: 3 },
  { name: "Bath & Body", parent: "Personal Care", level: 3 },
  { name: "Shaving & Hair Removal", parent: "Personal Care", level: 3 },
  { name: "Sun Care", parent: "Personal Care", level: 3 },

  { name: "Men's Fashion", level: 1 },
  { name: "Men's Shirts", parent: "Men's Fashion", level: 2 },
  { name: "Men's Casual Shirts", parent: "Men's Shirts", level: 3 },
  { name: "Men's Formal Shirts", parent: "Men's Shirts", level: 3 },
  { name: "Men's T-Shirts", parent: "Men's Shirts", level: 3 },
  { name: "Men's Dress Shirts", parent: "Men's Shirts", level: 3 },
  { name: "Men's Pants", parent: "Men's Fashion", level: 2 },
  { name: "Men's Jeans", parent: "Men's Pants", level: 3 },
  { name: "Men's Dress Pants", parent: "Men's Pants", level: 3 },
  { name: "Men's Sweatpants", parent: "Men's Pants", level: 3 },
  { name: "Men's Shorts", parent: "Men's Pants", level: 3 },
  { name: "Men's Shoes", parent: "Men's Fashion", level: 2 },
  { name: "Men's Sneakers", parent: "Men's Shoes", level: 3 },
  { name: "Men's Dress Shoes", parent: "Men's Shoes", level: 3 },
  { name: "Men's Boots", parent: "Men's Shoes", level: 3 },
  { name: "Men's Accessories", parent: "Men's Fashion", level: 2 },
  { name: "Ties", parent: "Men's Accessories", level: 3 },
  { name: "Belts", parent: "Men's Accessories", level: 3 },
  { name: "Men's Watches", parent: "Men's Accessories", level: 3 },

  { name: "Watches & Accessories", level: 1 },
  { name: "Wrist Watches", parent: "Watches & Accessories", level: 2 },
  { name: "Analog Watches", parent: "Wrist Watches", level: 3 },
  { name: "Digital Watches", parent: "Wrist Watches", level: 3 },
  { name: "Smart Watches", parent: "Wrist Watches", level: 3 },
  { name: "Jewelry", parent: "Watches & Accessories", level: 2 },
  { name: "Necklaces", parent: "Jewelry", level: 3 },
  { name: "Bracelets", parent: "Jewelry", level: 3 },
  { name: "Earrings", parent: "Jewelry", level: 3 },
  { name: "Eyewear", parent: "Watches & Accessories", level: 2 },
  { name: "Sunglasses", parent: "Eyewear", level: 3 },
  { name: "Contact Lenses", parent: "Eyewear", level: 3 },
  { name: "Reading Glasses", parent: "Eyewear", level: 3 },

  { name: "Electronic Devices", level: 1 },
  { name: "Smartphones", parent: "Electronic Devices", level: 2 },
  { name: "Android Phones", parent: "Smartphones", level: 3 },
  { name: "iPhones", parent: "Smartphones", level: 3 },
  { name: "Foldable Phones", parent: "Smartphones", level: 3 },
  { name: "Laptops", parent: "Electronic Devices", level: 2 },
  { name: "Ultrabooks", parent: "Laptops", level: 3 },
  { name: "Gaming Laptops", parent: "Laptops", level: 3 },
  { name: "Chromebooks", parent: "Laptops", level: 3 },
  { name: "MacBooks", parent: "Laptops", level: 3 },
  { name: "Tablets", parent: "Electronic Devices", level: 2 },
  { name: "Android Tablets", parent: "Tablets", level: 3 },
  { name: "iPad & iOS Tablets", parent: "Tablets", level: 3 },
  { name: "Wearables", parent: "Electronic Devices", level: 2 },
  { name: "Fitness Trackers", parent: "Wearables", level: 3 },
  { name: "VR Headsets", parent: "Wearables", level: 3 },

  { name: "TV & Home Appliances", level: 1 },
  { name: "Televisions", parent: "TV & Home Appliances", level: 2 },
  { name: "Refrigerators", parent: "TV & Home Appliances", level: 2 },
  { name: "Washing Machines", parent: "TV & Home Appliances", level: 2 },
  { name: "Microwaves", parent: "TV & Home Appliances", level: 2 },

  { name: "Electronic Accessories", level: 1 },
  { name: "Headphones", parent: "Electronic Accessories", level: 2 },
  { name: "Chargers", parent: "Electronic Accessories", level: 2 },
  { name: "Cables", parent: "Electronic Accessories", level: 2 },
  { name: "Batteries", parent: "Electronic Accessories", level: 2 },

  { name: "Groceries & Pets", level: 1 },
  { name: "Food", parent: "Groceries & Pets", level: 2 },
  { name: "Pet Supplies", parent: "Groceries & Pets", level: 2 },
  { name: "Home Essentials", parent: "Groceries & Pets", level: 2 },

  { name: "Barbies & Toys", level: 1 },
  { name: "Dolls", parent: "Barbies & Toys", level: 2 },
  { name: "Action Figures", parent: "Barbies & Toys", level: 2 },
  { name: "Board Games", parent: "Barbies & Toys", level: 2 },
  { name: "Strategy Games", parent: "Board Games", level: 3 },
  { name: "Family Games", parent: "Board Games", level: 3 },
  { name: "Educational Games", parent: "Board Games", level: 3 },
  { name: "Outdoor Toys", parent: "Barbies & Toys", level: 2 },
  { name: "Swing Sets", parent: "Outdoor Toys", level: 3 },
  { name: "Trampolines", parent: "Outdoor Toys", level: 3 },
  { name: "Water Toys", parent: "Outdoor Toys", level: 3 },

  { name: "Home & Lifestyle", level: 1 },
  { name: "Furniture", parent: "Home & Lifestyle", level: 2 },
  { name: "Decor", parent: "Home & Lifestyle", level: 2 },
  { name: "Kitchenware", parent: "Home & Lifestyle", level: 2 },
  { name: "Bedding", parent: "Home & Lifestyle", level: 2 },

  { name: "Sports & Outdoor", level: 1 },
  { name: "Sportswear", parent: "Sports & Outdoor", level: 2 },
  { name: "Fitness Equipment", parent: "Sports & Outdoor", level: 2 },
  { name: "Treadmills", parent: "Fitness Equipment", level: 3 },
  { name: "Dumbbells", parent: "Fitness Equipment", level: 3 },
  { name: "Yoga Mats", parent: "Fitness Equipment", level: 3 },
  { name: "Outdoor Gear", parent: "Sports & Outdoor", level: 2 },
  { name: "Camping & Hiking", parent: "Sports & Outdoor", level: 2 },

  { name: "Motors, Tools & DIY", level: 1 },
  { name: "Automotive", parent: "Motors, Tools & DIY", level: 2 },
  { name: "Tools", parent: "Motors, Tools & DIY", level: 2 },
  { name: "Home Improvement", parent: "Motors, Tools & DIY", level: 2 },
  { name: "Paint & Supplies", parent: "Home Improvement", level: 3 },
  { name: "Lighting", parent: "Home Improvement", level: 3 },
  { name: "Hardware", parent: "Home Improvement", level: 3 },
];

// console.log(categories)
async function seedCategories() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/OnlineMarketPlace");
    // Clear existing categories
    // await CategoryModel.deleteMany({});

    // Insert new categories
    await CategoryModel.insertMany(categories);

    console.log("Mock categories seeded successfully");
  } catch (error) {
    console.error("Error seeding mock categories:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedCategories();
