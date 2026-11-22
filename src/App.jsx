 import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Login from "./components/Login";
import Register from "./components/Register";
import Shop from "./components/Shop";
import About from "./components/About";
import Contact from "./components/Contact";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <Shop />
      <Login />
      <Register />
      <About />
      <Contact />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<><Navbar /><Hero /><Categories /></>} />
        <Route path="/shop" element={<><Navbar /><Shop /></>} />
        <Route path="/about" element={<><Navbar /><About /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
