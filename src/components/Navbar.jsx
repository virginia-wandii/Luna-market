import { useState } from "react";

function Navbar() {
  const [search, setSearch] = useState("");

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser. Try Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-KE";
    recognition.start();

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setSearch(spokenText);
    };
  };

  return (
    <nav className="w-full bg-[#D3D3D3] px-6 md:px-12 py-6 flex items-center justify-between gap-6">

      <h1 className="text-xl font-bold text-[#013B2E] whitespace-nowrap">
        Luna Market
      </h1>

      <div className="hidden md:flex items-center gap-6 text-lg text-black">
        <a href="/">Home</a>
        <a href="/categories">Category</a>
        <a href="/shop">Shop</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>

      <div className="flex items-center gap-2">

        <div className="flex items-center bg-white rounded-full border border-gray-300 px-3 py-2 w-48 md:w-56">

          <span>🔍</span>

          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none bg-transparent px-2 text-sm"
          />


        </div>

        <button
          type="button"
          onClick={() => setSearch("")}
          className="w-10 h-10 rounded-full bg-white border border-gray-300 text-xl"
          aria-label="Clear search"
        >
          ×
        </button>

      </div>
    </nav>
  );
}

export default Navbar;
