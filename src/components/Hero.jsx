function Hero() {
  return (
    <section className="w-full bg-[#F1F1F1] px-12 py-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">

        <div>
          <h1 className="text-6xl font-bold text-[#426F65] leading-tight mb-6">
            Shop Smart,
            <br />
            Live Better.
          </h1>

          <p className="text-xl text-gray-800 leading-relaxed max-w-lg">
            Your favourite online marketplace in Kenya.
            Discover quality products at affordable prices.
          </p>
        </div>

        <div>
          <img
            src="/HomePage.jpg"
            alt="Shopping bags"
            className="w-full h-[400px] object-cover rounded-lg"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;