import { useEffect, useState } from "react";
import { useCart } from "./CartContext";

function Shop() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCart();

  const categories = [
    "All Products",
    "Beauty",
    "Fragrances",
    "Furniture",
    "Groceries",
  ];

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://dummyjson.com/products?limit=100"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError("Unable to load products. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "All Products"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory.toLowerCase()
        );

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-[#426F65] mb-8">
        Shop Our Products
      </h1>

      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full border transition ${
              selectedCategory === category
                ? "bg-[#426F65] text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-600">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-5">
                <h2 className="font-semibold text-lg mb-2">
                  {product.title}
                </h2>

                <p className="text-gray-500 text-sm mb-3 capitalize">
                  {product.category}
                </p>

                <p className="text-[#426F65] font-bold text-xl mb-4">
                  KSh {Math.round(product.price * 130).toLocaleString()}
                </p>

                <button
                  onClick={() =>
                    addToCart({
                      ...product,
                      price: Math.round(product.price * 130),
                    })
                  }
                  className="w-full bg-[#426F65] text-white py-2 rounded-lg hover:bg-green-800 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Shop;