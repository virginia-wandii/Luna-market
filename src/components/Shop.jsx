
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2500,
    image: "p9bluetooth.jpg",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Ladies Handbag",
    price: 1800,
    image: "hand bag.jpg",
    category: "Fashion",
  },
  {
    id: 3,
    name: "Peppers",
    price: 150,
    image: "peppers.jpg",
    category: "Groceries",
  },
  {
    id: 4,
    name: "Table Lamp",
    price: 2000,
    image: "bed lamp.jpg",
    category: "Home",
  },
  {
    id: 5,
    name: "Shoes",
    price: 2200,
    image: "nike shoes.jpg",
    category: "Fashion",
  },
  {
    id: 6,
    name: "Smart Watch",
    price: 5000,
    image: "smart watch.jpg",
    category: "Electronics",
  },
  {
    id: 7,
    name: "Bed",
    price: 16999,
    image: "bed.jpg",
    category: "Home",
  },
  {
    id: 8,
    name: "Closet Dress",
    price: 4500,
    image: "closet dress.jpg",
    category: "Fashion",
  },
];

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [cart, setCart] = useState([]);

  const categories = [
    "All Products",
    "Groceries",
    "Fashion",
    "Electronics",
    "Home",
  ];

  const filteredProducts =
    selectedCategory === "All Products"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  const addToCart = (product) => {
    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section className="min-h-screen bg-[#F1F1F1] px-8 py-12 md:px-16">

      <div className="mb-8 text-center">
        <h1 className="mb-3 text-4xl font-bold text-[#426F65]">
          Explore Our Products
        </h1>

        <p className="text-lg text-gray-600">
          Find everything you need, all in one place.
        </p>
      </div>

      
      <div className="mb-10 flex justify-end">
        <div className="rounded-lg bg-[#426F65] px-6 py-3 text-white">
          🛒 Cart: {cartCount} items
        </div>
      </div>

      <div className="mb-12 flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full border border-[#426F65] px-6 py-3 transition ${
              selectedCategory === category
                ? "bg-[#426F65] text-white"
                : "bg-white text-[#426F65] hover:bg-[#426F65] hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="rounded-xl bg-white p-4 shadow-sm transition hover:shadow-lg"
          >
            <img
              src={product.image}
              alt={product.name}
              className="mb-4 h-52 w-full object-contain"
            />

            <h2 className="text-lg font-semibold text-gray-800">
              {product.name}
            </h2>

            <p className="mt-2 font-bold text-[#426F65]">
              KSh {product.price.toLocaleString("en-KE")}
            </p>

            <button
              onClick={() => addToCart(product)}
              className="mt-4 w-full rounded-lg bg-[#426F65] py-3 text-white transition hover:bg-[#31574F]"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

    
      <div className="mt-12 rounded-xl bg-white p-6 text-right shadow-sm">
        <h2 className="text-xl font-bold text-[#426F65]">
          Cart Total: KSh {cartTotal.toLocaleString("en-KE")}
        </h2>
      </div>

    </section>
  );
}

export default Shop;