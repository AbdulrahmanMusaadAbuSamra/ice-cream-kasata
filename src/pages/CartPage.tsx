import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, MessageCircle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  const handleCheckout = () => {
    // WhatsApp phone number
    const phoneNumber = "201009533516"; // Egyptian format with country code
    
    // Create the message with order details
    let message = "طلب جديد من متجر Kasata:\n\n";
    
    // Add each item details
    items.forEach(item => {
      message += `${item.product.name} - ${item.quantity} × ${item.product.price.toFixed(2)} ج.م = ${(item.product.price * item.quantity).toFixed(2)} ج.م\n`;
    });
    
    // Add total
    message += `\nإجمالي الطلب: ${totalPrice.toFixed(2)} ج.م`;
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in a new window
    window.open(whatsappUrl, '_blank');
    
    toast("جاري تحويلك إلى واتساب لإتمام الطلب");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">سلة التسوق فارغة</h1>
            <p className="text-gray-500 mb-6">لم تقم بإضافة أي منتجات إلى سلة التسوق بعد</p>
            <Button asChild className="bg-kasata-500 hover:bg-kasata-600">
              <Link to="/">تسوق الآن</Link>
            </Button>
          </div>
        </main>
        <Footer/>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="kasata-container py-10">
          <h1 className="text-3xl font-bold mb-8 text-kasata-800">سلة التسوق</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex flex-col sm:flex-row items-center gap-4 py-4 border-b border-gray-200 last:border-0">
                      <div className="w-24 h-24 rounded-md overflow-hidden">
                        <Link to={`/product/${item.product.id}`}>
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover"
                          />
                        </Link>
                      </div>
                      
                      <div className="flex-grow">
                        <Link to={`/product/${item.product.id}`}>
                          <h3 className="font-medium text-lg mb-1">{item.product.name}</h3>
                        </Link>
                        <p className="text-gray-500 text-sm mb-2">{item.product.description.slice(0, 60)}...</p>
                        <span className="text-kasata-600 font-bold">{item.product.price.toFixed(2)} ج.م</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          size="icon" 
                          variant="outline" 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        
                        <span className="w-10 text-center">{item.quantity}</span>
                        
                        <Button 
                          size="icon" 
                          variant="outline" 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="text-right">
                        <span className="block font-bold mb-2">{(item.product.price * item.quantity).toFixed(2)} ج.م</span>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-red-500 hover:text-red-700 p-0"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          <span>حذف</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">ملخص الطلب</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>عدد المنتجات:</span>
                    <span>{totalItems}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>الإجمالي:</span>
                    <span className="text-kasata-600">{totalPrice.toFixed(2)} ج.م</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-kasata-500 hover:bg-kasata-600 py-6 flex items-center justify-center gap-2"
                  onClick={handleCheckout}
                >
                  <MessageCircle className="h-5 w-5" />
                  إتمام الطلب عبر واتساب
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
