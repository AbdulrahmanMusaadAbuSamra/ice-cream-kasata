
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { useCart } from '@/context/CartContext';
import { getProductsByCategory } from '@/data/products';
import { CupSoda } from 'lucide-react';

const KasataPage = () => {
  const { addToCart } = useCart();
  const kasataProducts = getProductsByCategory('kasata');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-kasata-100 py-12">
          <div className="kasata-container">
            <div className="flex flex-col items-center text-center">
              <div className="bg-kasata-500 p-3 rounded-full mb-4">
                <CupSoda className="text-white h-8 w-8" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-kasata-900">كاساتا</h1>
              <p className="text-kasata-700 max-w-2xl mb-0">استمتع بطعم الكاساتا الرائع المكون من طبقات متعددة من النكهات المميزة</p>
            </div>
          </div>
        </div>
        
        <section className="py-12">
          <div className="kasata-container">
            <ProductGrid products={kasataProducts} onAddToCart={addToCart} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default KasataPage;
