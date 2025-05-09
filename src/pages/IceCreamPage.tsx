
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { useCart } from '@/context/CartContext';
import { getProductsBySubcategory } from '@/data/products';
import { IceCreamCone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';



const IceCreamPage = () => {
  const { addToCart, items } = useCart();
  const [activeTab, setActiveTab] = useState('1-scoop');
  
  // Get products for the active tab
  const iceCreamProducts = getProductsBySubcategory('ice-cream', activeTab);

  const getDescription = () => {
    switch(activeTab) {
      case '1-scoop':
        return 'اختر صنفًا واحدًا من الآيس كريم اللذيذ - 15 جنيه';
      case '2-scoop':
        return 'اختر صنفين مختلفين من الآيس كريم - 25 جنيه';
      case '3-scoop':
        return 'اختر ثلاثة أصناف مختلفة من الآيس كريم - 35 جنيه';
      default:
        return '';
    }
  };

  // Count how many items of the current subcategory are in cart
  const countItemsInCart = (subcategory) => {
    return items.reduce((count, item) => {
      if (item.product.category === 'ice-cream' && item.product.subcategory === subcategory) {
        return count + item.quantity;
      }
      return count;
    }, 0);
  };

  // Allowed quantities for 2-scoop and 3-scoop
  const allowedTwoScoopQuantities = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50];
  const allowedThreeScoopQuantities = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45];

  const handleAddToCart = (product) => {
    const currentSelections = countItemsInCart(product.subcategory);
    
    if (product.subcategory === '1-scoop') {
      // For 1-scoop, add to cart normally
      addToCart(product);
    } 
    else if (product.subcategory === '2-scoop') {
      // For 2-scoop, check if adding this item reaches an allowed quantity
      const newSelections = currentSelections + 1;
      if (allowedTwoScoopQuantities.includes(newSelections)) {
        // Valid quantity, complete the set
        addToCart(product);
        toast(`تم إكمال اختيارك لـ ${newSelections} بولات من الآيس كريم`);
      } else {
        // Add the product and prompt for remaining items
        addToCart(product);
        const nextValid = allowedTwoScoopQuantities.find(q => q > currentSelections);
        toast(`يرجى اختيار ${nextValid - newSelections} صنف لإكمال طلب بولات`);
      }
    }
    else if (product.subcategory === '3-scoop') {
      // For 3-scoop, check if adding this item reaches an allowed quantity
      const newSelections = currentSelections + 1;
      if (allowedThreeScoopQuantities.includes(newSelections)) {
        // Valid quantity, complete the set
        addToCart(product);
        toast(`تم إكمال اختيارك لـ ${newSelections} بولات من الآيس كريم`);
      } else {
        // Add the product and prompt for remaining items
        addToCart(product);
        const nextValid = allowedThreeScoopQuantities.find(q => q > currentSelections);
        toast(`يرجى اختيار ${nextValid - newSelections} صنف لإكمال طلب بولات`);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-kasata-100 py-12">
          <div className="kasata-container">
            <div className="flex flex-col items-center text-center">
              <div className="bg-kasata-500 p-3 rounded-full mb-4">
                <IceCreamCone className="text-white h-8 w-8" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-kasata-900">آيس كريم</h1>
              <p className="text-kasata-700 max-w-2xl mb-5">استمتع بأشهى أنواع الآيس كريم المصنوع من أجود المكونات بطعم ومذاق لا يُقاوم</p>
              
              <Card className="mb-6 w-full max-w-md">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg text-kasata-700">الأسعار</h3>
                  <p className="text-center font-bold">{getDescription()}</p>
                </CardContent>
              </Card>
              
              <div className="flex gap-2 justify-center">
                <Button 
                  className={activeTab === '1-scoop' ? 'bg-kasata-600' : 'bg-kasata-300'}
                  onClick={() => setActiveTab('1-scoop')}
                >
                  بولة واحدة
                </Button>
                <Button 
                  className={activeTab === '2-scoop' ? 'bg-kasata-600' : 'bg-kasata-300'}
                  onClick={() => setActiveTab('2-scoop')}
                >
                  اتنين بولة
                </Button>
                <Button 
                  className={activeTab === '3-scoop' ? 'bg-kasata-600' : 'bg-kasata-300'}
                  onClick={() => setActiveTab('3-scoop')}
                >
                  ثلاثة بولة
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <section className="py-12">
          <div className="kasata-container">
            <ProductGrid products={iceCreamProducts} onAddToCart={handleAddToCart} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};


// const IceCreamPage = () => {
//   const { addToCart, items } = useCart();
//   const [activeTab, setActiveTab] = useState('1-scoop');
  
//   // Get products for the active tab
//   const iceCreamProducts = getProductsBySubcategory('ice-cream', activeTab);

//   const getDescription = () => {
//     switch(activeTab) {
//       case '1-scoop':
//         return 'اختر صنفًا واحدًا من الآيس كريم اللذيذ - 15 جنيه';
//       case '2-scoop':
//         return 'اختر صنفين مختلفين من الآيس كريم - 25 جنيه';
//       case '3-scoop':
//         return 'اختر ثلاثة أصناف مختلفة من الآيس كريم - 35 جنيه';
//       default:
//         return '';
//     }
//   };

//   // Count how many items of the current subcategory are in cart
//   const countItemsInCart = (subcategory) => {
//     return items.reduce((count, item) => {
//       if (item.product.category === 'ice-cream' && item.product.subcategory === subcategory) {
//         return count + item.quantity;
//       }
//       return count;
//     }, 0);
//   };

//   const handleAddToCart = (product) => {
//     // Check current selections based on the subcategory
//     const currentSelections = countItemsInCart(product.subcategory);
    
//     if (product.subcategory === '1-scoop') {
//       // For 1-scoop, just add to cart normally
//       addToCart(product);
//     } 
//     else if (product.subcategory === '2-scoop') {
//       // For 2-scoop, check if we already have one in cart
//       if (currentSelections === 0) {
//         // First selection - add to cart and notify user
//         addToCart(product);
//         toast("يرجى اختيار صنف آخر لإكمال بولتين الآيس كريم");
//       } else if (currentSelections === 1) {
//         // Second selection - add to cart and complete the pair
//         addToCart(product);
//         toast("تم إكمال اختيارك لبولتين الآيس كريم");
//       } else {
//         // Already have enough - just add more
//         addToCart(product);
//       }
//     }
//     else if (product.subcategory === '3-scoop') {
//       // For 3-scoop, check if we have enough in cart
//       if (currentSelections === 0 || currentSelections === 1) {
//         // First or second selection
//         addToCart(product);
//         toast(`يرجى اختيار ${3 - (currentSelections + 1)} صنف آخر لإكمال طلب 3 بول من الآيس كريم`);
//       } else if (currentSelections === 2) {
//         // Third selection - complete the trio
//         addToCart(product);
//         toast("تم إكمال اختيارك لـ 3 بول من الآيس كريم");
//       } else {
//         // Already have enough - just add more
//         addToCart(product);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-grow">
//         <div className="bg-kasata-100 py-12">
//           <div className="kasata-container">
//             <div className="flex flex-col items-center text-center">
//               <div className="bg-kasata-500 p-3 rounded-full mb-4">
//                 <IceCreamCone className="text-white h-8 w-8" />
//               </div>
//               <h1 className="text-3xl md:text-4xl font-bold mb-4 text-kasata-900">آيس كريم</h1>
//               <p className="text-kasata-700 max-w-2xl mb-5">استمتع بأشهى أنواع الآيس كريم المصنوع من أجود المكونات بطعم ومذاق لا يُقاوم</p>
              
//               <Card className="mb-6 w-full max-w-md">
//                 <CardContent className="pt-6">
//                   <h3 className="font-bold text-lg text-kasata-700">الأسعار</h3>
//                   <p className="text-center font-bold">{getDescription()}</p>
//                 </CardContent>
//               </Card>
              
//               <div className="flex gap-2 justify-center">
//                 <Button 
//                   className={activeTab === '1-scoop' ? 'bg-kasata-600' : 'bg-kasata-300'}
//                   onClick={() => setActiveTab('1-scoop')}
//                 >
//                   بولة واحدة
//                 </Button>
//                 <Button 
//                   className={activeTab === '2-scoop' ? 'bg-kasata-600' : 'bg-kasata-300'}
//                   onClick={() => setActiveTab('2-scoop')}
//                 >
//               اتنين بولة
//                 </Button>
//                 <Button 
//                   className={activeTab === '3-scoop' ? 'bg-kasata-600' : 'bg-kasata-300'}
//                   onClick={() => setActiveTab('3-scoop')}
//                 >
//                    ثلاثة بولة
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <section className="py-12">
//           <div className="kasata-container">
//             <ProductGrid products={iceCreamProducts} onAddToCart={handleAddToCart} />
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   );
// };

export default IceCreamPage;
