import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiTruck, 
  FiDollarSign, 
  FiHeadphones, 
  FiShield,
  FiStar,
  FiArrowRight,
  FiSmartphone,
  FiShirt,
  FiHome
} from 'react-icons/fi';

export default function HomePage() {
  const features = [
    {
      icon: <FiTruck className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "Get your orders delivered to your doorstep in record time with our express shipping.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: "Best Prices",
      description: "We offer competitive pricing on all our top-quality products with price match guarantee.",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: <FiHeadphones className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Our dedicated support team is always here to help you with your queries and concerns.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Secure Shopping",
      description: "Shop with confidence knowing your data is protected with enterprise-grade security.",
      color: "from-red-500 to-red-600"
    }
  ];

  const categories = [
    {
      icon: <FiSmartphone className="w-12 h-12" />,
      title: "Electronics",
      description: "Latest gadgets & devices",
      items: "500+ Products",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FiShirt className="w-12 h-12" />,
      title: "Fashion",
      description: "Trendy clothes & accessories",
      items: "1200+ Products",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <FiHome className="w-12 h-12" />,
      title: "Home & Living",
      description: "Essentials for everyday comfort",
      items: "800+ Products",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  const testimonials = [
    {
      text: "Amazing service! My order arrived on time and in perfect condition. The quality exceeded my expectations.",
      author: "Sarah Mitchell",
      role: "Verified Customer",
      rating: 5
    },
    {
      text: "Great prices and fantastic support. The customer service team was incredibly helpful and responsive.",
      author: "John Davis",
      role: "Premium Member",
      rating: 5
    },
    {
      text: "I love shopping here. Quality products and smooth checkout process. Highly recommend to everyone!",
      author: "Emily Rodriguez",
      role: "Regular Customer",
      rating: 5
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Welcome to
              </span>
              <br />
              <span className="text-slate-800">My Store</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover premium products at unbeatable prices. Experience the future of shopping with our curated collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Get Started
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-white text-slate-700 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl border border-slate-200 hover:border-slate-300 transform hover:scale-105 transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We're committed to providing you with the best shopping experience possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-8 bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 hover:border-slate-300 transition-all duration-300 transform hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Explore our carefully curated categories to find exactly what you're looking for.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-slate-200 hover:border-slate-300 transition-all duration-500 transform hover:-translate-y-4 cursor-pointer overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className={`w-20 h-20 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500">
                      {category.items}
                    </span>
                    <FiArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-8 bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-sm hover:shadow-lg border border-slate-200 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 italic mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{testimonial.author}</h4>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience the best online shopping platform.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Create Account
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
