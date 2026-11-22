
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F7F5]">

      {/* Contact Hero */}
      <section className="bg-[#123D2C] px-6 py-16 text-center text-white">
        <p className="mb-3 font-semibold tracking-widest text-emerald-300">
          LUNA MARKET
        </p>

        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          Get In Touch
        </h1>

        <p className="mx-auto max-w-xl text-gray-200">
          Have a question or need assistance? We'd love to hear from you.
          Send us a message and we'll be happy to help.
        </p>
      </section>

      {/* Contact Content */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2">

        {/* Contact Form */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-[#123D2C]">
            Send Us a Message
          </h2>

          {submitted && (
            <p className="mb-5 rounded-lg bg-green-100 p-3 text-green-800">
              Thank you! Your message has been received.
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-emerald-600"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-emerald-600"
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-emerald-600"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-emerald-600"
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-[#087443] py-3 font-semibold text-white transition hover:bg-[#123D2C]"
            >
              Send Message
            </button>

          </form>
        </div>

        {/* Contact Information */}
        <div className="rounded-2xl bg-[#123D2C] p-8 text-white">
          <h2 className="mb-6 text-2xl font-bold">
            Contact Information
          </h2>

          <p className="mb-8 leading-7 text-gray-200">
            We're here to make your shopping experience better.
            Reach out to us whenever you need assistance.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-emerald-300">Email</h3>
              <p className="text-gray-200">Add your business email</p>
            </div>

            <div>
              <h3 className="font-semibold text-emerald-300">Phone</h3>
              <p className="text-gray-200">Add your business number</p>
            </div>

            <div>
              <h3 className="font-semibold text-emerald-300">Location</h3>
              <p className="text-gray-200">Kenya</p>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}

export default Contact;
