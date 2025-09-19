import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <React.Fragment>
      {/* Hero Section */}
      <section className="py-16 max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to My Store</h1>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Discover the best products at unbeatable prices. Shop your favorite
          brands and enjoy fast delivery.
        </p>
        <Link
          to="/products"
          className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg shadow hover:bg-blue-700 transition"
        >
          Shop Now
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Get your orders delivered to your doorstep in record time.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Best Prices</h3>
            <p className="text-gray-600">
              We offer competitive pricing on all our top-quality products.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
            <p className="text-gray-600">
              Our support team is always here to help you with your queries.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-10">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Electronics</h3>
            <p className="text-gray-600">Latest gadgets & devices</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Fashion</h3>
            <p className="text-gray-600">Trendy clothes & accessories</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Home & Living</h3>
            <p className="text-gray-600">Essentials for everyday comfort</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-10">What Our Customers Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 rounded-lg shadow">
            <p className="italic text-gray-600">
              "Amazing service! My order arrived on time and in perfect
              condition."
            </p>
            <h4 className="mt-4 font-bold">- Sarah M.</h4>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow">
            <p className="italic text-gray-600">
              "Great prices and fantastic support. Highly recommended!"
            </p>
            <h4 className="mt-4 font-bold">- John D.</h4>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg shadow">
            <p className="italic text-gray-600">
              "I love shopping here. Quality products and smooth checkout."
            </p>
            <h4 className="mt-4 font-bold">- Emily R.</h4>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
