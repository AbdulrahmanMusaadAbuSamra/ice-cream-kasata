import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '@/components/ProductCard';
import { toast } from '@/components/ui/sonner';

type CartItem = {
  product: Product;
  quantity: number;
};

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  oneScoopPrice: number;
  twoScoopPrice: number;
  threeScoopPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      
      if (existingItem) {
        toast(`تمت إضافة ${product.name} إلى السلة`);
        
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      toast(`تمت إضافة ${product.name} إلى السلة`);
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.product.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // Calculate prices for each ice cream subcategory
  const oneScoopPrice = items
    .filter((item) => item.product.category === 'ice-cream' && item.product.subcategory === '1-scoop')
    .reduce((total, item) => total + 15 * item.quantity, 0);

  const twoScoopPrice = (() => {
    const twoScoopTotalQuantity = items
      .filter((item) => item.product.category === 'ice-cream' && item.product.subcategory === '2-scoop')
      .reduce((sum, item) => sum + item.quantity, 0);
    
    const pairs = Math.floor(twoScoopTotalQuantity / 2);
    const singles = twoScoopTotalQuantity % 2;
    return pairs * 25 + singles * 15;
  })();

  const threeScoopPrice = (() => {
    const threeScoopTotalQuantity = items
      .filter((item) => item.product.category === 'ice-cream' && item.product.subcategory === '3-scoop')
      .reduce((sum, item) => sum + item.quantity, 0);
    
    const trios = Math.floor(threeScoopTotalQuantity / 3);
    const remaining = threeScoopTotalQuantity % 3;
    return trios * 35 + remaining * 15;
  })();

  // Calculate total price including non-ice-cream products
  const totalPrice = oneScoopPrice + twoScoopPrice + threeScoopPrice + items
    .filter((item) => item.product.category !== 'ice-cream')
    .reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        oneScoopPrice,
        twoScoopPrice,
        threeScoopPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};






// import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import { Product } from '@/components/ProductCard';
// import { toast } from '@/components/ui/sonner';

// type CartItem = {
//   product: Product;
//   quantity: number;
// };

// interface CartContextType {
//   items: CartItem[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (productId: string) => void;
//   updateQuantity: (productId: string, quantity: number) => void;
//   clearCart: () => void;
//   totalItems: number;
//   totalPrice: number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [items, setItems] = useState<CartItem[]>([]);

//   // Load cart from localStorage on initial render
//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       try {
//         setItems(JSON.parse(savedCart));
//       } catch (error) {
//         console.error('Failed to parse cart from localStorage:', error);
//       }
//     }
//   }, []);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(items));
//   }, [items]);

//   const addToCart = (product: Product) => {
//     setItems((prevItems) => {
//       const existingItem = prevItems.find((item) => item.product.id === product.id);
      
//       if (existingItem) {
//         toast(`تمت إضافة ${product.name} إلى السلة`);
        
//         return prevItems.map((item) =>
//           item.product.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
      
//       toast(`تمت إضافة ${product.name} إلى السلة`);
//       return [...prevItems, { product, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (productId: string) => {
//     setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
//   };

//   const updateQuantity = (productId: string, quantity: number) => {
//     if (quantity < 1) {
//       removeFromCart(productId);
//       return;
//     }
    
//     setItems((prevItems) => {
//       return prevItems.map((item) => {
//         if (item.product.id === productId) {
//           return { ...item, quantity };
//         }
//         return item;
//       });
//     });
//   };

//   const clearCart = () => {
//     setItems([]);
//   };

//   const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
//   // Calculate prices based on subcategory for ice cream
//   const totalPrice = items.reduce((total, item) => {
//     const { product, quantity } = item;
    
//     if (product.category === 'ice-cream') {
//       if (product.subcategory === '1-scoop') {
//         return total + 15 * quantity;
//       } else if (product.subcategory === '2-scoop') {
//         // Calculate in pairs
//         const pairs = Math.floor(quantity / 2);
//         const singles = quantity % 2;
        
//         // Each pair costs 25
//         const pairsTotal = pairs * 25;
//         // Any leftover single costs 15
//         const singlesTotal = singles * 15;
        
//         return total + pairsTotal + singlesTotal;
//       } else if (product.subcategory === '3-scoop') {
//         // Calculate in trios
//         const trios = Math.floor(quantity / 3);
//         const remaining = quantity % 3;
        
//         // Each trio costs 35
//         const triosTotal = trios * 35;
//         // Any leftover singles cost 15 each
//         const remainingTotal = remaining * 15;
        
//         return total + triosTotal + remainingTotal;
//       }
//     }
    
//     // For other products, use standard price
//     return total + product.price * quantity;
//   }, 0);

//   return (
//     <CartContext.Provider
//       value={{
//         items,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         totalItems,
//         totalPrice,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (context === undefined) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };
