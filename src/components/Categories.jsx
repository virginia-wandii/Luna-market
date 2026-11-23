const categories = [
  { name: "Categories", image: `${import.meta.env.BASE_URL}categories.png` },
  { name: "Electronics", image: `${import.meta.env.BASE_URL}headphones.png` },
  
  { name: "Fashion", image: `${import.meta.env.BASE_URL}fashion.png` },
  { name: "Home", image: `${import.meta.env.BASE_URL}home.png` },

];

function Categories() {
  return (
    <section className="w-full bg-[#E5E5E5] px-12 py-14">
      <div className="max-w-[1400px] mx-auto">

        <h2 className="text-3xl font-bold text-[#426F65] mb-8">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-xl p-8 flex flex-col items-center justify-center shadow-sm"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-20 h-20 object-contain mb-4"
              />

              <h3 className="text-lg font-semibold text-gray-800">
                {category.name}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Categories;