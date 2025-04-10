"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/Logo.jpg";

// You would need to replace these with your actual pizza images
import Cheesecornpizza from "../assets/Cheesecornpizza.jpg";
import PaneerPizza from "../assets/PaneerPizza.jpeg";
import PaneerCorn from "../assets/PaneerCorn.jpg";

import ChickenPizza from "../assets/ChickenPizza.jpeg";
import ChickenKebabPizza from "../assets/ChickenKebabPizza.jpeg";
import ChickenCornPizza from "../assets/ChickenCornPizza.jpg";

export default function Pizza() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");

  // Track scroll position for parallax and appearance effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation for elements on scroll with staggered timing
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Staggered animation with delay based on index
            setTimeout(() => {
              entry.target.classList.add("opacity-100", "translate-y-0");
              entry.target.classList.remove("opacity-0", "translate-y-10");
            }, index * 150);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      el.classList.add(
        "opacity-0",
        "translate-y-10",
        "transition-all",
        "duration-700"
      );
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Pizza data
  const pizzas = {
    vegetarian: [
      {
        id: 1,
        name: "Paneer Corn Pizza",
        price: "₹185",
        image: PaneerCorn,
        tags: ["Bestseller", "Classic"],
      },
      {
        id: 2,
        name: "Paneer Pizza",
        price: "₹175",
        image: PaneerPizza,
        tags: ["Healthy"],
      },
      {
        id: 3,
        name: "Cheese Corn Pizza",
        price: "₹155",
        image: Cheesecornpizza,
        tags: ["Spicy", "Bestseller"],
      },
    ],
    nonVegetarian: [
      {
        id: 7,
        name: "Kebab Chicken Pizza",

        price: "₹215",
        image: ChickenKebabPizza,
        tags: ["Special", "Classic"],
      },
      {
        id: 8,
        name: "Chicken Corn Pizza",
        price: "₹185",
        image: ChickenCornPizza,
        tags: ["Premium"],
      },
      {
        id: 9,
        name: "Chicken Pizza",
        price: "₹175",
        image: ChickenPizza,
        tags: ["Chef's Special"],
      },
    ],
  };

  // Filter pizzas based on active category
  const displayPizzas =
    activeCategory === "all"
      ? [...pizzas.vegetarian, ...pizzas.nonVegetarian]
      : activeCategory === "veg"
      ? pizzas.vegetarian
      : pizzas.nonVegetarian;

  return (
    <div className="min-h-screen bg-amber-50 font-sans text-gray-800 overflow-x-hidden">
      {/* Navbar - Same as Base page */}
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          scrollPosition > 50
            ? "bg-gradient-to-r from-amber-50 to-amber-100 backdrop-blur-md shadow-lg"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="w-full px-6 py-4 flex items-center justify-between">
          {/* Logo Section with Animation */}
          <div className="flex items-center group">
            <div className="h-16 w-16 rounded-full flex items-center justify-center overflow-hidden shadow-md transition-all duration-500 group-hover:shadow-amber-300 group-hover:scale-110">
              <Image
                src={Logo}
                alt="Cafe Bowbajar Logo"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-3 hidden md:block">
              <div className="text-2xl font-extrabold bg-gradient-to-r from-amber-800 to-amber-600 bg-clip-text text-transparent tracking-tight">
                Cafe Bowbajar
              </div>
              <div className="text-xs text-amber-600 font-medium tracking-widest uppercase">
                Est. 2010
              </div>
            </div>
          </div>

          {/* Mobile Menu Button with Animation */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
            aria-label="Toggle menu"
          >
            <span
              className={`absolute block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                isMenuOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            ></span>
            <span
              className={`absolute block w-5 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`absolute block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                isMenuOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            ></span>
          </button>

          {/* Mobile Menu Dropdown with Animation */}
          <div
            className={`absolute top-full left-0 right-0 w-full bg-gradient-to-b from-amber-50 to-white backdrop-blur-lg shadow-lg md:hidden transform transition-all duration-500 ease-in-out ${
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-full opacity-0 pointer-events-none"
            }`}
          >
            <div className="py-6 px-8 text-center">
              {["Home", "Menu", "Gallery", "Contact"].map((item, index) => (
                <div
                  key={item}
                  className="py-4 my-2 relative group cursor-pointer"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <Link href={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
                    <span className="text-amber-800 font-medium group-hover:text-amber-600 transition-colors duration-300">
                      {item}
                    </span>
                    <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Menu with Hover Effects */}
          <div className="hidden md:flex items-center space-x-10">
            {["Home", "Menu", "Gallery", "Contact"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              >
                <div className="relative group cursor-pointer">
                  <span className="font-medium text-gray-700 group-hover:text-amber-700 transition-colors duration-300">
                    {item}
                  </span>
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </div>
              </Link>
            ))}

            {/* CTA Button */}
           
          </div>
        </div>
      </nav>

      {/* Hero Section with Parallax Effect */}
      <section className="relative bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200 py-16 md:py-24 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-800 mb-6 animate-on-scroll leading-tight">
            <span className="block">Artisanal</span>
            <span className="text-amber-600">Pizzas</span>
          </h1>
          <p className="text-amber-700 mb-10 max-w-lg animate-on-scroll text-lg md:text-xl leading-relaxed">
            Hand-crafted with premium ingredients and baked to perfection in our
            wood-fired oven.
          </p>
        </div>

        {/* Decorative Elements with parallax effect */}
        <div
          className="absolute top-1/2 left-0 w-32 h-32 bg-amber-300 rounded-full -translate-y-1/2 -translate-x-1/2 opacity-30"
          style={{
            transform: `translate(-50%, calc(-50% + ${
              scrollPosition * 0.1
            }px))`,
          }}
        ></div>
        <div
          className="absolute bottom-1/4 right-0 w-40 h-40 bg-amber-400 rounded-full translate-x-1/2 opacity-20"
          style={{
            transform: `translate(50%, calc(-25% + ${
              scrollPosition * -0.05
            }px))`,
          }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-16 h-16 bg-amber-200 rounded-full opacity-40"
          style={{ transform: `translate(0, ${scrollPosition * 0.08}px)` }}
        ></div>
      </section>

      {/* Category Filter Tabs */}
      <section className="bg-white py-6 shadow-md sticky top-20 z-40">
        <div className="max-w-6xl mx-auto flex justify-center space-x-4">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              activeCategory === "all"
                ? "bg-amber-600 text-white shadow-md"
                : "bg-amber-100 text-amber-800 hover:bg-amber-200"
            }`}
          >
            All Pizzas
          </button>
          <button
            onClick={() => setActiveCategory("veg")}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              activeCategory === "veg"
                ? "bg-amber-600 text-white shadow-md"
                : "bg-amber-100 text-amber-800 hover:bg-amber-200"
            }`}
          >
            Vegetarian
          </button>
          <button
            onClick={() => setActiveCategory("nonveg")}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              activeCategory === "nonveg"
                ? "bg-amber-600 text-white shadow-md"
                : "bg-amber-100 text-amber-800 hover:bg-amber-200"
            }`}
          >
            Non-Vegetarian
          </button>
        </div>
      </section>

      {/* Pizza Grid */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-8 animate-on-scroll relative inline-block">
            {activeCategory === "veg"
              ? "Vegetarian Pizzas"
              : activeCategory === "nonveg"
              ? "Non-Vegetarian Pizzas"
              : "Our Pizzas"}
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-amber-500 rounded-full"></span>
          </h2>

          {/* Pizza Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPizzas.map((pizza, index) => (
              <div
                key={pizza.id}
                className="animate-on-scroll bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="relative">
                  {/* Pizza Image */}
                  <div className="h-56 w-full overflow-hidden">
                    <Image
                      src={pizza.image}
                      height={400}
                      width={600}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt={pizza.name}
                    />
                  </div>

                  {/* Tag Badges */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {pizza.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 text-xs font-bold rounded-full shadow-md ${
                          tag === "Bestseller"
                            ? "bg-amber-500 text-white"
                            : tag === "Spicy"
                            ? "bg-red-500 text-white"
                            : tag === "New"
                            ? "bg-green-500 text-white"
                            : tag === "Premium"
                            ? "bg-purple-500 text-white"
                            : tag === "Chef's Special"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Vegetarian/Non-Vegetarian Indicator */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`w-6 h-6 flex items-center justify-center rounded-full ${
                        pizzas.vegetarian.some((p) => p.id === pizza.id)
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      <span className="block w-2 h-2 bg-white rounded-full"></span>
                    </span>
                  </div>
                </div>

                {/* Pizza Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {pizza.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {pizza.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-amber-700 font-bold text-lg">
                      {pizza.price}
                    </span>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Same as Base page */}
      <footer className="bg-gradient-to-r from-amber-900 to-amber-800 text-amber-100 py-16 w-full">
        <div className="max-w-7xl mx-auto px-6">
          {/* Top section with logo, description and social icons */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 space-y-8 md:space-y-0">
            <div className="text-center md:text-left max-w-md">
              <h2 className="text-4xl font-bold mb-4">Cafe Bowbajar</h2>
              <p className="text-amber-200 text-lg leading-relaxed">
                A cozy corner to enjoy artisanal coffee and homemade treats in
                the heart of the city.
              </p>
            </div>

            <div className="flex space-x-8">
              {/* Social icons with enhanced hover effects */}
              <a
                href="#"
                className="hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                aria-label="Instagram"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                aria-label="Facebook"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.644c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z" />
                </svg>
              </a>
              <a
                href="#"
                className="hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                aria-label="Twitter"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Middle section with contact info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-amber-800/50 backdrop-blur-sm rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="flex flex-col items-center text-center">
                <span className="text-amber-300 text-3xl mb-4">📍</span>
                <p className="text-lg font-medium">
                  123 Coffee Lane, Bowbajar District, Kolkata
                </p>
              </div>
            </div>

            <div className="bg-amber-800/50 backdrop-blur-sm rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="flex flex-col items-center text-center">
                <span className="text-amber-300 text-3xl mb-4">📞</span>
                <p className="text-lg font-medium">+91 123-456-7890</p>
              </div>
            </div>

            <div className="bg-amber-800/50 backdrop-blur-sm rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="flex flex-col items-center text-center">
                <span className="text-amber-300 text-3xl mb-4">✉️</span>
                <p className="text-lg font-medium">hello@cafebowbajar.com</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-amber-700/50 w-3/4 mx-auto mb-8"></div>

          {/* Copyright section */}
          <div className="text-center">
            <p className="text-amber-300">
              © 2025 Cafe Bowbajar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}