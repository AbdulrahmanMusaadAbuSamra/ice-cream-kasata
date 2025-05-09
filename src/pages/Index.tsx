import React from "react";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { products, getProductsBySubcategory } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IceCreamCone, CupSoda, Glasses } from "lucide-react";

const Index = () => {
  const { addToCart } = useCart();

  const featuredProducts = products.slice(0, 8);
  const iceCreamProducts = getProductsBySubcategory(
    "ice-cream",
    "1-scoop"
  ).slice(0, 3);
  const juiceProducts = getProductsBySubcategory("juice", "1L").slice(0, 3);
  const kasataProducts = products
    .filter((p) => p.category === "kasata")
    .slice(0, 3);

  const CategorySection = ({
    title,
    icon: Icon,
    products,
    link,
  }: {
    title: string;
    icon: React.ElementType;
    products: typeof featuredProducts;
    link: string;
  }) => (
    <section className="py-12">
      <div className="kasata-container">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Icon className="text-kasata-500 h-6 w-6 mr-2" />
            <h2 className="text-2xl font-bold text-kasata-800">{title}</h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-kasata-300 text-kasata-500 hover:bg-kasata-50"
          >
            <Link to={link}>عرض الكل</Link>
          </Button>
        </div>
        <ProductGrid products={products} onAddToCart={addToCart} />
      </div>
    </section>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />

        {/* <section className="py-12 bg-white">
          <div className="kasata-container">
            <h2 className="text-2xl font-bold mb-8 text-center text-kasata-800">منتجات مميزة</h2>
            <ProductGrid products={featuredProducts} onAddToCart={addToCart} />
          </div>
        </section> */}

        <section className="py-12 bg-kasata-50">
          <div className="kasata-container text-center">
            <h2 className="text-3xl font-bold mb-8 text-kasata-800">أقسامنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="kasata-card p-6 text-center hover:translate-y-[-5px] transition-transform">
                <div className="bg-kasata-100 mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <IceCreamCone className="text-kasata-600 h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-kasata-700">
                  آيس كريم
                </h3>
                <p className="text-gray-500 mb-4">
                  استمتع بأشهى أنواع الآيس كريم بنكهات متعددة
                </p>
                <Button asChild className="bg-kasata-500 hover:bg-kasata-600">
                  <Link to="/ice-cream">تسوق الآن</Link>
                </Button>
              </div>

              <div className="kasata-card p-6 text-center hover:translate-y-[-5px] transition-transform">
                <div className="bg-kasata-100 mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <CupSoda className="text-kasata-600 h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-kasata-700">عصير</h3>
                <p className="text-gray-500 mb-4">
                  عصائر طازجة منعشة من أجود أنواع الفواكه
                </p>
                <Button asChild className="bg-kasata-500 hover:bg-kasata-600">
                  <Link to="/juice">تسوق الآن</Link>
                </Button>
              </div>

              <div className="kasata-card p-6 text-center hover:translate-y-[-5px] transition-transform">
                <div className="bg-kasata-100 mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Glasses className="text-kasata-600 h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-kasata-700">
                  كاساتا
                </h3>
                <p className="text-gray-500 mb-4">
                  كاساتا لذيذة بطبقات متعددة من النكهات
                </p>
                <Button asChild className="bg-kasata-500 hover:bg-kasata-600">
                  <Link to="/kasata">تسوق الآن</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <CategorySection
          title="آيس كريم"
          icon={IceCreamCone}
          products={iceCreamProducts}
          link="/ice-cream"
        />

        <CategorySection
          title="عصير"
          icon={Glasses}
          products={juiceProducts}
          link="/juice"
        />

        <CategorySection
          title="كاساتا"
          icon={CupSoda}
          products={kasataProducts}
          link="/kasata"
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
