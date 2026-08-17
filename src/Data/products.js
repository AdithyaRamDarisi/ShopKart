import tshirt1 from "../assets/tshirt1.jpg";
import tshirt2 from "../assets/tshirt2.jpg";
import jacket from "../assets/jacket.jpg";
import hoodie from "../assets/hoodie.jpg";
import trouser from "../assets/trouser.jpg";
import torn from "../assets/torn.jpg";
import tfi from "../assets/tfi.jpg";
import oversized from "../assets/oversized.jpg";
import xyxxboxer from "../assets/xyxxboxer.jpg";
import baggy from "../assets/baggy.jpg";

const products = [

  // =========================
  // MEN
  // =========================

  {
    id: 1,
    name: "Classic Polo T-Shirt",
    gender: "Men",
    category: "T-Shirts",
    price: 1999,
    offerPrice: 1500,
    image: tshirt1,
    sizes: ["S", "M", "L", "XL"],
    description:
      "A stylish premium cotton polo T-shirt designed for everyday comfort and casual styling.",
    rating: 5,
    reviews: 128,
  },

  {
    id: 2,
    name: "Classic White T-Shirt",
    gender: "Men",
    category: "T-Shirts",
    price: 1999,
    offerPrice: 1500,
    image: tshirt2,
    sizes: ["S", "M", "L", "XL"],
    description:
      "A clean and versatile white T-shirt perfect for everyday casual outfits.",
    rating: 4,
    reviews: 96,
  },

  {
    id: 3,
    name: "Premium Casual Jacket",
    gender: "Men",
    category: "Jackets",
    price: 2999,
    offerPrice: 2199,
    image: jacket,
    sizes: ["S", "M", "L", "XL"],
    description:
      "A modern casual jacket designed for a stylish everyday look.",
    rating: 5,
    reviews: 84,
  },

  {
    id: 4,
    name: "Classic Fleece Hoodie",
    gender: "Men",
    category: "Hoodies",
    price: 2799,
    offerPrice: 1999,
    image: hoodie,
    sizes: ["S", "M", "L", "XL"],
    description:
      "A soft fleece hoodie offering warmth, comfort and modern casual styling.",
    rating: 5,
    reviews: 156,
  },

  {
    id: 5,
    name: "Premium Casual Trousers",
    gender: "Men",
    category: "Trousers",
    price: 2499,
    offerPrice: 1799,
    image: trouser,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Comfortable trousers with a clean modern fit for casual and semi-casual occasions.",
    rating: 4,
    reviews: 72,
  },

  {
    id: 6,
    name: "Torn Denim Jeans",
    gender: "Men",
    category: "Jeans",
    price: 2999,
    offerPrice: 2199,
    image: torn,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Trendy torn denim jeans designed for a modern streetwear look.",
    rating: 4,
    reviews: 113,
  },

  {
    id: 7,
    name: "Casual Printed T-Shirt",
    gender: "Men",
    category: "T-Shirts",
    price: 2299,
    offerPrice: 1699,
    image: tfi,
    sizes: ["S", "M", "L", "XL"],
    description:
      "A comfortable casual T-shirt with a modern design for everyday styling.",
    rating: 4,
    reviews: 65,
  },

  {
    id: 8,
    name: "Oversized T-Shirt",
    gender: "Men",
    category: "T-Shirts",
    price: 1999,
    offerPrice: 1499,
    image: oversized,
    sizes: ["S", "M", "L", "XL"],
    description:
      "A relaxed oversized T-shirt designed for a comfortable streetwear look.",
    rating: 5,
    reviews: 142,
  },

  {
    id: 9,
    name: "Comfort Boxer",
    gender: "Men",
    category: "Innerwear",
    price: 999,
    offerPrice: 699,
    image: xyxxboxer,
    sizes: ["S", "M", "L", "XL"],
    description:
      "A comfortable everyday boxer made with soft fabric and a flexible fit.",
    rating: 4,
    reviews: 89,
  },

  {
    id: 10,
    name: "Baggy Fit Pants",
    gender: "Men",
    category: "Pants",
    price: 2799,
    offerPrice: 1999,
    image: baggy,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Modern baggy-fit pants designed for a relaxed streetwear style.",
    rating: 5,
    reviews: 101,
  },


  // =========================
  // WOMEN
  // =========================

  {
    id: 11,
    name: "Women's Casual T-Shirt",
    gender: "Women",
    category: "T-Shirts",
    price: 1799,
    offerPrice: 1199,
    image: tshirt1,
    sizes: ["XS", "S", "M", "L"],
    description:
      "A comfortable women's casual T-shirt designed for everyday styling.",
    rating: 4,
    reviews: 86,
  },

  {
    id: 12,
    name: "Women's Oversized T-Shirt",
    gender: "Women",
    category: "T-Shirts",
    price: 1999,
    offerPrice: 1399,
    image: oversized,
    sizes: ["XS", "S", "M", "L"],
    description:
      "A relaxed oversized T-shirt with a modern streetwear-inspired fit.",
    rating: 5,
    reviews: 124,
  },

  {
    id: 13,
    name: "Women's Casual Jacket",
    gender: "Women",
    category: "Jackets",
    price: 2999,
    offerPrice: 2199,
    image: jacket,
    sizes: ["XS", "S", "M", "L"],
    description:
      "A stylish casual jacket suitable for everyday and evening outfits.",
    rating: 4,
    reviews: 74,
  },

  {
    id: 14,
    name: "Women's Relaxed Pants",
    gender: "Women",
    category: "Pants",
    price: 2499,
    offerPrice: 1699,
    image: baggy,
    sizes: ["XS", "S", "M", "L"],
    description:
      "Relaxed-fit pants designed for comfort and contemporary styling.",
    rating: 5,
    reviews: 92,
  },


  // =========================
  // KIDS
  // =========================

  {
    id: 15,
    name: "Kids Casual T-Shirt",
    gender: "Kids",
    category: "T-Shirts",
    price: 999,
    offerPrice: 699,
    image: tshirt2,
    sizes: ["XS", "S", "M", "L"],
    description:
      "A comfortable everyday T-shirt designed for kids.",
    rating: 4,
    reviews: 58,
  },

  {
    id: 16,
    name: "Kids Hoodie",
    gender: "Kids",
    category: "Hoodies",
    price: 1599,
    offerPrice: 1099,
    image: hoodie,
    sizes: ["XS", "S", "M", "L"],
    description:
      "A soft and comfortable hoodie designed for kids.",
    rating: 5,
    reviews: 63,
  },

  {
    id: 17,
    name: "Kids Casual Pants",
    gender: "Kids",
    category: "Pants",
    price: 1499,
    offerPrice: 999,
    image: baggy,
    sizes: ["XS", "S", "M", "L"],
    description:
      "Comfortable casual pants designed for everyday activities.",
    rating: 4,
    reviews: 47,
  },

  {
    id: 18,
    name: "Kids Denim Jeans",
    gender: "Kids",
    category: "Jeans",
    price: 1799,
    offerPrice: 1199,
    image: torn,
    sizes: ["XS", "S", "M", "L"],
    description:
      "Stylish and comfortable denim jeans for kids.",
    rating: 5,
    reviews: 51,
  },

];

export default products;