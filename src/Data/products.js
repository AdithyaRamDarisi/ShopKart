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
  {
    id: 1,
    name: "US Polo T-Shirt Black",
    category: "T-Shirts",
    price: 1999,
    offerPrice: 1500,
    image: tshirt1,
    sizes: ["S", "M", "L", "XL"],
    description:
      "A stylish black polo T-shirt made with premium cotton fabric. Comfortable, breathable and perfect for everyday casual wear.",
    rating: 5,
    reviews: 128,
  },

  {
    id: 2,
    name: "US Polo T-Shirt White",
    category: "T-Shirts",
    price: 1999,
    offerPrice: 1500,
    image: tshirt2,
    sizes: ["S", "M", "L", "XL"],
    description:
      "A classic white polo T-shirt with a clean and versatile design. Perfect for casual outings and everyday styling.",
    rating: 4,
    reviews: 96,
  },

  {
    id: 3,
    name: "Premium Casual Jacket",
    category: "Jackets",
    price: 2999,
    offerPrice: 2199,
    image: jacket,
    sizes: ["S", "M", "L", "XL"],
    description:
      "A premium casual jacket designed for a modern look. Comfortable, stylish and suitable for cool evenings and casual occasions.",
    rating: 5,
    reviews: 84,
  },

  {
    id: 4,
    name: "Classic Fleece Hoodie",
    category: "Hoodies",
    price: 2799,
    offerPrice: 1999,
    image: hoodie,
    sizes: ["S", "M", "L", "XL"],
    description:
      "A soft fleece hoodie offering warmth and comfort. Its classic design makes it perfect for everyday casual outfits.",
    rating: 5,
    reviews: 156,
  },

  {
    id: 5,
    name: "Premium Casual Trouser",
    category: "Trousers",
    price: 2499,
    offerPrice: 1799,
    image: trouser,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Comfortable premium trousers with a clean modern fit. Ideal for casual and semi-casual occasions.",
    rating: 4,
    reviews: 72,
  },

  {
    id: 6,
    name: "Torn Denim Jeans",
    category: "Jeans",
    price: 2999,
    offerPrice: 2199,
    image: torn,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Trendy torn denim jeans designed for a stylish streetwear look. Durable denim fabric with a comfortable fit.",
    rating: 4,
    reviews: 113,
  },

  {
    id: 7,
    name: "Casual TFI Wear",
    category: "T-Shirts",
    price: 2299,
    offerPrice: 1699,
    image: tfi,
    sizes: ["S", "M", "L", "XL"],
    description:
      "A comfortable casual T-shirt with a modern design. Easy to pair with jeans, trousers or shorts.",
    rating: 4,
    reviews: 65,
  },

  {
    id: 8,
    name: "Oversized T-Shirt",
    category: "T-Shirts",
    price: 1999,
    offerPrice: 1499,
    image: oversized,
    sizes: ["S", "M", "L", "XL"],
    description:
      "A relaxed oversized T-shirt made for a comfortable streetwear style. Perfect for everyday casual outfits.",
    rating: 5,
    reviews: 142,
  },

  {
    id: 9,
    name: "XYXX Boxer",
    category: "Innerwear",
    price: 999,
    offerPrice: 699,
    image: xyxxboxer,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Comfortable everyday boxer designed with a soft fabric and flexible fit for all-day comfort.",
    rating: 4,
    reviews: 89,
  },

  {
    id: 10,
    name: "Baggy Fit Pants",
    category: "Pants",
    price: 2799,
    offerPrice: 1999,
    image: baggy,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Modern baggy-fit pants designed for a relaxed and stylish streetwear look. Comfortable for everyday use.",
    rating: 5,
    reviews: 101,
  },
];

export default products;