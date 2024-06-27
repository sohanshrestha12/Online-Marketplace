import mongoose from "mongoose";
import { BrandModel } from "../../routes/v1/Brand/model";

const brands = [
  { name: "Gucci", category: "Blouses" },
  { name: "Prada", category: "Blouses" },
  { name: "Armani", category: "Blouses" },

  { name: "H&M", category: "T-shirts" },
  { name: "Zara", category: "T-shirts" },
  { name: "Uniqlo", category: "T-shirts" },

  { name: "Nike", category: "Tank Tops" },
  { name: "Adidas", category: "Tank Tops" },
  { name: "Puma", category: "Tank Tops" },

  { name: "Levi's", category: "Jeans" },
  { name: "Wrangler", category: "Jeans" },
  { name: "Diesel", category: "Jeans" },

  { name: "Chanel", category: "Skirts" },
  { name: "Versace", category: "Skirts" },
  { name: "Dior", category: "Skirts" },

  { name: "Nike", category: "Shorts" },
  { name: "Adidas", category: "Shorts" },
  { name: "Puma", category: "Shorts" },

  { name: "Lululemon", category: "Leggings" },
  { name: "Gymshark", category: "Leggings" },
  { name: "Under Armour", category: "Leggings" },

  { name: "Forever 21", category: "Casual Dresses" },
  { name: "Topshop", category: "Casual Dresses" },
  { name: "H&M", category: "Casual Dresses" },

  { name: "Versace", category: "Evening Dresses" },
  { name: "Gucci", category: "Evening Dresses" },
  { name: "Prada", category: "Evening Dresses" },

  { name: "Zara", category: "Maxi Dresses" },
  { name: "H&M", category: "Maxi Dresses" },
  { name: "Uniqlo", category: "Maxi Dresses" },

  { name: "Nike", category: "Women's Sneakers" },
  { name: "Adidas", category: "Women's Sneakers" },
  { name: "Puma", category: "Women's Sneakers" },

  { name: "Timberland", category: "Women's Boots" },
  { name: "Dr. Martens", category: "Women's Boots" },
  { name: "Ugg", category: "Women's Boots" },

  { name: "Birkenstock", category: "Women's Sandals" },
  { name: "Teva", category: "Women's Sandals" },
  { name: "Clarks", category: "Women's Sandals" },

  { name: "Michael Kors", category: "Bags" },
  { name: "Louis Vuitton", category: "Bags" },
  { name: "Coach", category: "Bags" },

  { name: "Hermes", category: "Scarves" },
  { name: "Gucci", category: "Scarves" },
  { name: "Burberry", category: "Scarves" },

  { name: "New Era", category: "Hats" },
  { name: "Kangol", category: "Hats" },
  { name: "Stetson", category: "Hats" },

  { name: "Neutrogena", category: "Cleansers" },
  { name: "Olay", category: "Cleansers" },
  { name: "Cetaphil", category: "Cleansers" },

  { name: "Olay", category: "Moisturizers" },
  { name: "Neutrogena", category: "Moisturizers" },
  { name: "Clinique", category: "Moisturizers" },

  { name: "The Ordinary", category: "Serums" },
  { name: "Olay", category: "Serums" },
  { name: "Neutrogena", category: "Serums" },

  { name: "MAC", category: "Foundation" },
  { name: "Maybelline", category: "Foundation" },
  { name: "Estee Lauder", category: "Foundation" },

  { name: "Maybelline", category: "Lipstick" },
  { name: "MAC", category: "Lipstick" },
  { name: "Revlon", category: "Lipstick" },

  { name: "Urban Decay", category: "Eyeshadow" },
  { name: "Too Faced", category: "Eyeshadow" },
  { name: "Anastasia Beverly Hills", category: "Eyeshadow" },

  { name: "Tommy Hilfiger", category: "Men's Casual Shirts" },
  { name: "Ralph Lauren", category: "Men's Casual Shirts" },
  { name: "Uniqlo", category: "Men's Casual Shirts" },

  { name: "Brooks Brothers", category: "Men's Formal Shirts" },
  { name: "Calvin Klein", category: "Men's Formal Shirts" },
  { name: "Van Heusen", category: "Men's Formal Shirts" },

  { name: "Uniqlo", category: "Men's T-Shirts" },
  { name: "H&M", category: "Men's T-Shirts" },
  { name: "Zara", category: "Men's T-Shirts" },

  { name: "Brooks Brothers", category: "Men's Dress Shirts" },
  { name: "Ralph Lauren", category: "Men's Dress Shirts" },
  { name: "Calvin Klein", category: "Men's Dress Shirts" },

  { name: "Levi's", category: "Men's Jeans" },
  { name: "Wrangler", category: "Men's Jeans" },
  { name: "Diesel", category: "Men's Jeans" },

  { name: "Dockers", category: "Men's Dress Pants" },
  { name: "Calvin Klein", category: "Men's Dress Pants" },
  { name: "Perry Ellis", category: "Men's Dress Pants" },

  { name: "Champion", category: "Men's Sweatpants" },
  { name: "Nike", category: "Men's Sweatpants" },
  { name: "Adidas", category: "Men's Sweatpants" },

  { name: "Under Armour", category: "Men's Shorts" },
  { name: "Nike", category: "Men's Shorts" },
  { name: "Adidas", category: "Men's Shorts" },

  { name: "Converse", category: "Men's Sneakers" },
  { name: "Nike", category: "Men's Sneakers" },
  { name: "Adidas", category: "Men's Sneakers" },

  { name: "Johnston & Murphy", category: "Men's Dress Shoes" },
  { name: "Allen Edmonds", category: "Men's Dress Shoes" },
  { name: "Cole Haan", category: "Men's Dress Shoes" },

  { name: "Clarks", category: "Men's Boots" },
  { name: "Timberland", category: "Men's Boots" },
  { name: "Red Wing", category: "Men's Boots" },

  { name: "Louis Vuitton", category: "Ties" },
  { name: "Hermes", category: "Ties" },
  { name: "Gucci", category: "Ties" },

  { name: "Prada", category: "Belts" },
  { name: "Gucci", category: "Belts" },
  { name: "Louis Vuitton", category: "Belts" },

  { name: "Omega", category: "Men's Watches" },
  { name: "Rolex", category: "Men's Watches" },
  { name: "Tag Heuer", category: "Men's Watches" },

  { name: "Seiko", category: "Analog Watches" },
  { name: "Citizen", category: "Analog Watches" },
  { name: "Bulova", category: "Analog Watches" },

  { name: "Casio", category: "Digital Watches" },
  { name: "Timex", category: "Digital Watches" },
  { name: "G-Shock", category: "Digital Watches" },

  { name: "Apple", category: "Smart Watches" },
  { name: "Samsung", category: "Smart Watches" },
  { name: "Fitbit", category: "Smart Watches" },

  { name: "Tiffany & Co.", category: "Necklaces" },
  { name: "Pandora", category: "Necklaces" },
  { name: "Swarovski", category: "Necklaces" },

  { name: "Pandora", category: "Bracelets" },
  { name: "Tiffany & Co.", category: "Bracelets" },
  { name: "Swarovski", category: "Bracelets" },

  { name: "Swarovski", category: "Earrings" },
  { name: "Pandora", category: "Earrings" },
  { name: "Tiffany & Co.", category: "Earrings" },

  { name: "Samsung", category: "Smartphones" },
  { name: "Apple", category: "Smartphones" },
  { name: "OnePlus", category: "Smartphones" },

  { name: "Dell", category: "Laptops" },
  { name: "HP", category: "Laptops" },
  { name: "Lenovo", category: "Laptops" },

  { name: "Microsoft", category: "Tablets" },
  { name: "Samsung", category: "Tablets" },
  { name: "Lenovo", category: "Tablets" },

  { name: "Samsung", category: "Android Tablets" },
  { name: "Lenovo", category: "Android Tablets" },
  { name: "Huawei", category: "Android Tablets" },

  { name: "Apple", category: "iPad & iOS Tablets" },
  { name: "Logitech", category: "iPad & iOS Tablets" },
  { name: "Belkin", category: "iPad & iOS Tablets" },

  { name: "Sony", category: "Televisions" },
  { name: "Samsung", category: "Televisions" },
  { name: "LG", category: "Televisions" },

  { name: "LG", category: "Refrigerators" },
  { name: "Samsung", category: "Refrigerators" },
  { name: "Whirlpool", category: "Refrigerators" },

  { name: "Whirlpool", category: "Washing Machines" },
  { name: "LG", category: "Washing Machines" },
  { name: "Samsung", category: "Washing Machines" },

  { name: "Panasonic", category: "Microwaves" },
  { name: "Samsung", category: "Microwaves" },
  { name: "LG", category: "Microwaves" },

  { name: "Bose", category: "Headphones" },
  { name: "Sony", category: "Headphones" },
  { name: "Sennheiser", category: "Headphones" },

  { name: "Anker", category: "Chargers" },
  { name: "Belkin", category: "Chargers" },
  { name: "RavPower", category: "Chargers" },

  { name: "Belkin", category: "Cables" },
  { name: "Anker", category: "Cables" },
  { name: "Amazon Basics", category: "Cables" },

  { name: "Duracell", category: "Batteries" },
  { name: "Energizer", category: "Batteries" },
  { name: "Panasonic", category: "Batteries" },

  { name: "Kellogg's", category: "Food" },
  { name: "General Mills", category: "Food" },
  { name: "Nestle", category: "Food" },

  { name: "Purina", category: "Pet Supplies" },
  { name: "Pedigree", category: "Pet Supplies" },
  { name: "Whiskas", category: "Pet Supplies" },

  { name: "Clorox", category: "Home Essentials" },
  { name: "Lysol", category: "Home Essentials" },
  { name: "Mr. Clean", category: "Home Essentials" },

  { name: "Mattel", category: "Dolls" },
  { name: "American Girl", category: "Dolls" },
  { name: "Barbie", category: "Dolls" },

  { name: "Hasbro", category: "Action Figures" },
  { name: "Mattel", category: "Action Figures" },
  { name: "LEGO", category: "Action Figures" },

  { name: "Ravensburger", category: "Board Games" },
  { name: "Hasbro", category: "Board Games" },
  { name: "Mattel", category: "Board Games" },

  { name: "Catan", category: "Strategy Games" },
  { name: "Asmodee", category: "Strategy Games" },
  { name: "Days of Wonder", category: "Strategy Games" },

  { name: "Hasbro", category: "Family Games" },
  { name: "Mattel", category: "Family Games" },
  { name: "Spin Master", category: "Family Games" },

  { name: "LeapFrog", category: "Educational Games" },
  { name: "VTech", category: "Educational Games" },
  { name: "Osmo", category: "Educational Games" },

  { name: "Little Tikes", category: "Swing Sets" },
  { name: "Step2", category: "Swing Sets" },
  { name: "Backyard Discovery", category: "Swing Sets" },

  { name: "Skywalker", category: "Trampolines" },
  { name: "Zupapa", category: "Trampolines" },
  { name: "JumpSport", category: "Trampolines" },

  { name: "Intex", category: "Water Toys" },
  { name: "Bestway", category: "Water Toys" },
  { name: "Little Tikes", category: "Water Toys" },

  { name: "Ikea", category: "Furniture" },
  { name: "Ashley Furniture", category: "Furniture" },
  { name: "Wayfair", category: "Furniture" },

  { name: "West Elm", category: "Decor" },
  { name: "Pottery Barn", category: "Decor" },
  { name: "Crate & Barrel", category: "Decor" },

  { name: "Cuisinart", category: "Kitchenware" },
  { name: "KitchenAid", category: "Kitchenware" },
  { name: "Pyrex", category: "Kitchenware" },

  { name: "Pottery Barn", category: "Bedding" },
  { name: "Brooklinen", category: "Bedding" },
  { name: "Parachute", category: "Bedding" },

  { name: "Nike", category: "Sportswear" },
  { name: "Adidas", category: "Sportswear" },
  { name: "Puma", category: "Sportswear" },

  { name: "Bowflex", category: "Fitness Equipment" },
  { name: "NordicTrack", category: "Fitness Equipment" },
  { name: "Peloton", category: "Fitness Equipment" },

  { name: "NordicTrack", category: "Treadmills" },
  { name: "ProForm", category: "Treadmills" },
  { name: "Bowflex", category: "Treadmills" },

  { name: "CAP Barbell", category: "Dumbbells" },
  { name: "Bowflex", category: "Dumbbells" },
  { name: "PowerBlock", category: "Dumbbells" },

  { name: "Gaiam", category: "Yoga Mats" },
  { name: "Manduka", category: "Yoga Mats" },
  { name: "Liforme", category: "Yoga Mats" },

  { name: "REI", category: "Outdoor Gear" },
  { name: "Patagonia", category: "Outdoor Gear" },
  { name: "The North Face", category: "Outdoor Gear" },

  { name: "Coleman", category: "Camping & Hiking" },
  { name: "REI", category: "Camping & Hiking" },
  { name: "The North Face", category: "Camping & Hiking" },

  { name: "Bosch", category: "Automotive" },
  { name: "Michelin", category: "Automotive" },
  { name: "Goodyear", category: "Automotive" },

  { name: "DeWalt", category: "Tools" },
  { name: "Makita", category: "Tools" },
  { name: "Bosch", category: "Tools" },

  { name: "3M", category: "Home Improvement" },
  { name: "Scotch", category: "Home Improvement" },
  { name: "Gorilla Glue", category: "Home Improvement" },

  { name: "Behr", category: "Paint & Supplies" },
  { name: "Sherwin-Williams", category: "Paint & Supplies" },
  { name: "Benjamin Moore", category: "Paint & Supplies" },

  { name: "Philips", category: "Lighting" },
  { name: "GE", category: "Lighting" },
  { name: "Sylvania", category: "Lighting" },

  { name: "Stanley", category: "Hardware" },
  { name: "DeWalt", category: "Hardware" },
  { name: "Makita", category: "Hardware" },
];



async function seedBrand() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/OnlineMarketPlace");
    // Clear existing brand
    // await CategoryModel.deleteMany({});

    // Insert new categories
    await BrandModel.insertMany(brands);

    console.log("Mock brand seeded successfully");
  } catch (error) {
    console.error("Error seeding mock brand:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedBrand();
