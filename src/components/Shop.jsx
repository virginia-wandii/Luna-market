const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "KSh 2,500",
    image: "p9bluetooth.jpg",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Ladies Handbag",
    price: "KSh 1,800",
    image: "hand bag.jpg",
    category: "Fashion",
  },
  {
    id: 3,
    name: "peppers",
    price: "KSh 150",
    image: "peppers.jpg",
    category: "Groceries",
  },
  {
    id: 4,
    name: "Table Lamp",
    price: "KSh 2,000",
    image: "bed lamp.jpg",
    category: "Home",
  },
  {
    id: 5,
    name: "shoes",
    price: "Ksh 2,200",
    image: "nike shoes.jpg",
    category:"Fashion",
  },
  {
    id:6,
    name: "smart watch",
    price: "Ksh 5000",
    image: "smart watch.jpg",
    category:"Electronics",
  },
  {
    id:7,
    name: "bed",
    price: "Ksh 16,999",
    image: "bed.jpg",
    category:"Home",
  },
  {
    id:8,
    name: "closet dress",
    price: "Ksh 4500",
    image: "closet dress.jpg",
    category:"Fashion",
  },



];

function Shop() {
  return (
    <section className="min-h-screen bg-[#F1F1F1] px-8 md:px-16 py-12">

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#426F65] mb-3">
          Explore Our Products
        </h1>

        <p className="text-gray-600 text-lg">
          Find everything you need, all in one place.
        </p>
      </div>

      
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {["All Products", "Groceries", "Fashion", "Electronics", "Home"].map(
          (category) => (
            <button
              key={category}
              className="px-6 py-3 rounded-full border border-[#426F65] hover:bg-[#426F65] hover:text-white transition"
            >
              {category}
            </button>
          )
        )}
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm p-4 hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-52 object-contain mb-4"
            />

            <h2 className="text-lg font-semibold text-gray-800">
              {product.name}
            </h2>

            <p className="text-[#426F65] font-bold mt-2">
              {product.price}
            </p>

            <button className="w-full bg-[#426F65] text-white py-3 rounded-lg mt-4 hover:bg-[#31574F]">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

    </section>
  );
}

export default Shop;