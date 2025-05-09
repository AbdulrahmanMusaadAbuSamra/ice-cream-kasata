
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProductById } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">المنتج غير موجود</h1>
            <Button asChild>
              <Link to="/">العودة للرئيسية</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="kasata-container py-8">
          <Button 
            variant="ghost" 
            className="mb-6 flex items-center" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> العودة
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full rounded-xl shadow-lg object-cover"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-kasata-800 mb-2">{product.name}</h1>
                <p className="text-2xl font-bold text-kasata-600 mb-4">{product.price.toFixed(2)} ج.م</p>
                <p className="text-gray-600">{product.description}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="font-medium">الفئة:</span>
                  <Link 
                    to={`/${product.category}`}
                    className="text-kasata-500 hover:underline"
                  >
                    {product.category === 'ice-cream' ? 'آيس كريم' : 
                     product.category === 'juice' ? 'عصير' : 'كاساتا'}
                  </Link>
                </div>
              </div>
              
              <Button 
                className="w-full bg-kasata-500 hover:bg-kasata-600 py-6 text-lg"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                أضف إلى السلة
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
