import { useState } from "react";

function AddProduct() {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...product,
          price: Number(product.price),
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to add product");
      }

      const data = await response.json();

      console.log("Created product:", data);
      setMessage("Product added successfully!");

      setProduct({
        title: "",
        price: "",
        category: "",
        description: "",
      });
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      console.error(error);
    }
  }

  return (
    <section className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-[#426F65] mb-8">
        Add New Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          placeholder="Product name"
          value={product.title}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          min="0"
          value={product.price}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          name="description"
          placeholder="Product description"
          value={product.description}
          onChange={handleChange}
          required
          rows="4"
          className="w-full border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-[#426F65] text-white py-3 rounded-lg hover:bg-green-800"
        >
          Add Product
        </button>
      </form>

      {message && (
        <p className="mt-5 text-center font-semibold text-[#426F65]">
          {message}
        </p>
      )}
    </section>
  );
}

export default AddProduct;