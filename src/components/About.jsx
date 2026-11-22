function About() {
  return (
    <div className="min-h-screen bg-[#06130E] text-white">

      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 font-semibold tracking-widest text-emerald-400">
            ABOUT LUNA MARKET
          </p>

          <h1 className="mb-6 text-4xl font-bold md:text-6xl">
            Your Trusted Online
            <span className="block text-emerald-400">
              Marketplace
            </span>
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-gray-300">
            Welcome to Luna Market, your online destination for discovering
            quality products. From fashion and electronics to home essentials,
            we make shopping simple and convenient.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16 md:px-16">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-emerald-800">
          <img
            src="Emerald Black Friday.png"
            alt="Black Friday emerald green promotion"
            className="h-auto w-full object-cover"
          />
        </div>
      </section>

      
      <section className="bg-[#0B2118] px-6 py-16 md:px-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-3xl font-bold">
            What We <span className="text-emerald-400">Offer</span>
          </h2>

          <p className="max-w-2xl leading-8 text-gray-300">
            Explore a variety of products, including fashion, electronics,
            beauty products and home essentials, all in one convenient place.
          </p>
        </div>
      </section>

    </div>
  );
}

export default About;