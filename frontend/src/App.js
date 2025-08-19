import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Simple Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">🚗 AutoCommerce</h1>
          <p className="text-gray-600">Marketplace de Veículos Premium</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Encontre o Veículo dos Seus Sonhos
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            O maior marketplace de veículos premium do Brasil
          </p>
        </section>

        {/* Simple Vehicle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Lamborghini Huracán 2023",
              price: "R$ 1.850.000",
              year: "2023",
              km: "2.500 km",
              image: "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBjYXJzfGVufDB8fHx8MTc1NTUwOTgyMHww&ixlib=rb-4.1.0&q=85"
            },
            {
              title: "Ferrari 458 Italia 2019",
              price: "R$ 2.100.000",
              year: "2019",
              km: "8.900 km",
              image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwzfHxjYXJzfGVufDB8fHx8MTc1NTYxNDkwNXww&ixlib=rb-4.1.0&q=85"
            },
            {
              title: "Porsche 911 Carrera 2021",
              price: "R$ 850.000",
              year: "2021",
              km: "12.000 km",
              image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxjYXJzfGVufDB8fHx8MTc1NTYxNDkwNXww&ixlib=rb-4.1.0&q=85"
            }
          ].map((vehicle, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src={vehicle.image} 
                alt={vehicle.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{vehicle.title}</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-2xl font-bold text-indigo-600">{vehicle.price}</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Novo</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>📅 {vehicle.year}</span>
                  <span>🏃‍♂️ {vehicle.km}</span>
                </div>
                <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors">
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-2">🚗 AutoCommerce</h3>
          <p className="text-gray-400">O marketplace mais confiável para compra e venda de veículos premium.</p>
          <p className="text-gray-500 mt-4">&copy; 2024 AutoCommerce. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;