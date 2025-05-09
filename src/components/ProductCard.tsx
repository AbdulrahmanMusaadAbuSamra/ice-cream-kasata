
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'ice-cream' | 'juice' | 'kasata';
  subcategory?: string;
  description: string;
};

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  // محتوى النص الذي سيظهر بناءً على نوع المنتج
  const getPriceSubtext = () => {
    if (product.category === 'ice-cream') {
      switch (product.subcategory) {
        case '1-scoop':
          return 'بولة واحدة - 15 جنيه';
        case '2-scoop':
          return 'بولتين - 25 جنيه';
        case '3-scoop':
          return   'ثلاثة بولة - 35 جنية';
        default:
          return '';
      }
    }
    return '';
  };
  
  return (
    <div className="kasata-card group">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-bold mb-1 text-kasata-800">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-500 mb-2">{product.description.slice(0, 60)}...</p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-kasata-600 font-bold">{product.price.toFixed(2)} ج.م</span>
            {getPriceSubtext() && (
              <span className="text-xs text-gray-500">{getPriceSubtext()}</span>
            )}
          </div>
          <Button 
            size="sm" 
            className="bg-kasata-500 hover:bg-kasata-600"
            onClick={() => onAddToCart && onAddToCart(product)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            أضف للسلة
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
