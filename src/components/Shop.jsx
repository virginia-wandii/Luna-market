
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";

function Shop() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState("");

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

  // Open the edit form
  function handleEdit(product) {
    setEditingProduct({
      id: product.id,
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description || "",
    });

    setMessage("");
  }

  // Update form fields
  function handleChange(e) {
    setEditingProduct({
      ...editingProduct,
      [e.target.name]: e.target.value,
    });
  }

  // Save edited product
  async function handleUpdate(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://dummyjson.com/products/${editingProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...editingProduct,
            price: Number(editingProduct.price),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const updatedProduct = await response.json();

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === updatedProduct.id
            ? { ...product, ...updatedProduct }
            : product
        )
      );

      setMessage("Product updated successfully!");
      setEditingProduct(null);
    } catch (err) {
      console.error(err);
      setMessage("Unable to update product. Please try again.");
    }
  }

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

      {message && (
        <p className="mb-6 text-center font-semibold text-[#426F65]">
          {message}
        </p>
      )}

      {/* Edit Product Form */}
      {editingProduct && (
        <form
          onSubmit={handleUpdate}
          className="max-w-xl mx-auto mb-12 p-6 bg-white rounded-xl shadow-md space-y-4"
        >
          <h2 className="text-2xl font-bold text-[#426F65]">
            Edit Product
          </h2>

          <input
            type="text"
            name="title"
            value={editingProduct.title}
            onChange={handleChange}
            placeholder="Product name"
            required
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            name="price"
            value={editingProduct.price}
            onChange={handleChange}
            placeholder="Price"
            min="0"
            required
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="category"
            value={editingProduct.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            name="description"
            value={editingProduct.description}
            onChange={handleChange}
            placeholder="Product description"
            rows="4"
            className="w-full border p-3 rounded-lg"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-[#426F65] text-white py-3 rounded-lg hover:bg-green-800"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => setEditingProduct(null)}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Category Filters */}
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

      {/* Product Cards */}
      {filteredProducts.length === 0 ? (
        <p className="text-gray-600">
          No products found in this category.
        </p>
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
                  className="w-full bg-[#426F65] text-white py-2 rounded-lg hover:bg-green-800 transition mb-3"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => handleEdit(product)}
                  className="w-full border border-[#426F65] text-[#426F65] py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  Edit Product
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
