'use client'

import React from "react";
import Image from "next/image";

const Hero: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      <main className="flex-grow">
        {/* Hero Banner Section */}
        <div className="relative bg-gradient-to-r from-emerald-100 via-green-50 to-teal-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-20 lg:py-28">
          {/* Natural background pattern overlay */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
              <pattern id="leaves" patternUnits="userSpaceOnUse" width="20" height="20">
                <path d="M10 2C15 2 18 6 18 10C18 14 15 18 10 18C5 18 2 14 2 10C2 6 5 2 10 2Z" fill="currentColor" className="text-green-600 dark:text-green-400" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#leaves)" />
            </svg>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                {/* Eco Team Badge */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 dark:from-emerald-400 dark:to-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                      Developed by Team 4Bits
                    </div>
                    <div className="text-xs text-green-700 dark:text-green-400">
                      Sustainable Agriculture Solutions
                    </div>
                  </div>
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  Eco-Smart Agriculture <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700 dark:from-emerald-400 dark:to-green-500">
                    Monitoring System
                  </span>
                </h1>

                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Revolutionary sustainable farming technology by the 4Bits team.
                  Our carbon-neutral AI rover promotes biodiversity, reduces chemical
                  usage, and helps farmers cultivate healthier crops through
                  precision eco-monitoring and natural pest management.
                </p>

                {/* Eco Features */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                  <div className="flex items-center space-x-3 group">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-800 dark:to-green-800 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg
                        className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Plant To Plant Detection</span>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-100 to-emerald-100 dark:from-teal-800 dark:to-emerald-800 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg
                        className="w-4 h-4 text-teal-600 dark:text-teal-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Eco Monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-100 to-lime-100 dark:from-green-800 dark:to-lime-800 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg
                        className="w-4 h-4 text-green-600 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Pest Identification & Solution</span>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-800 dark:to-teal-800 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg
                        className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">GPS Tracking</span>
                  </div>
                </div>

                {/* Eco CTA Button
                <div className="pt-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 dark:from-emerald-500 dark:to-green-600 dark:hover:from-emerald-600 dark:hover:to-green-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Enter Green Portal
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Button>
                </div> */}

                {/* Sustainability Stats */}
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 border border-green-200 dark:border-gray-600 shadow-lg">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">85%</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Chemical Reduction</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">40%</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Water Savings</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">100%</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Carbon Free</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content - Natural Image */}
              <div className="relative">
                <div className="relative z-10">
                  <Image
                    src="/assets/homeRover.png"
                    alt="Sustainable farming technology in natural green landscape"
                    width={600}
                    height={400}
                    className="rounded-4xl shadow-2xl w-full h-96 object-cover border-4 border-white/50 dark:border-gray-700/50"
                    priority
                  />
                  {/* Eco Status Overlay */}
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-green-200 dark:border-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        Ready to use rover
                      </span>
                    </div>
                  </div>

                  {/* Natural Coverage Overlay */}
                  {/* <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-green-200 dark:border-gray-600">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Today's Natural Coverage
                    </div>
                    <div className="text-lg font-bold text-emerald-700 dark:text-emerald-300 flex items-center">
                      2.4 Hectares
                    </div>
                  </div> */}

                  {/* Floating nature elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-200 dark:bg-green-700 rounded-full opacity-60 animate-bounce"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-emerald-200 dark:bg-emerald-700 rounded-full opacity-40 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Eco-Tech Specifications Section */}
        <div className="bg-gradient-to-b from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-900 py-16 mt-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Featues Of Our Rover
              </h2>
              <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                Built with renewable energy and eco-friendly materials by the 4Bits team
                to create a carbon-negative agricultural revolution
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Eco Hardware Component Cards */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-800 dark:to-green-800 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                  <svg
                    className="w-6 h-6 text-emerald-600 dark:text-emerald-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Eco-AI Brain
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Solar-powered Raspberry Pi 3B with organic vision system for
                  sustainable machine learning operations
                </p>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
                  Carbon Neutral
                </div>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-100 to-emerald-100 dark:from-teal-800 dark:to-emerald-800 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                  <svg
                    className="w-6 h-6 text-teal-600 dark:text-teal-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Green Navigation
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Wind-powered Pi Zero 2W with biodegradable GPS Module for
                  eco-friendly precision field mapping
                </p>
                <div className="text-xs text-teal-600 dark:text-teal-400 font-medium bg-teal-50 dark:bg-teal-900/30 px-2 py-1 rounded-full">
                  Renewable Energy
                </div>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-lime-100 to-green-100 dark:from-lime-800 dark:to-green-800 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                  <svg
                    className="w-6 h-6 text-lime-600 dark:text-lime-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Organic Control
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Bamboo-housed Arduino Uno with bio-servo arm for gentle
                  soil sensor deployment without ecosystem disruption
                </p>
                <div className="text-xs text-lime-600 dark:text-lime-400 font-medium bg-lime-50 dark:bg-lime-900/30 px-2 py-1 rounded-full">
                  Biodegradable Housing
                </div>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                  <svg
                    className="w-6 h-6 text-green-600 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Natural Sensors
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Compostable DHT22 sensors with organic soil moisture
                  monitoring using sustainable materials
                </p>
                <div className="text-xs text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
                  100% Compostable
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}

      </main>
    </div>
  );
};

export default Hero;