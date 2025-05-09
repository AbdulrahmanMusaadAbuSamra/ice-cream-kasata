import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { useCart } from "@/context/CartContext";
import { getProductsBySubcategory } from "@/data/products";
// import { Glasses } from "lucide-react";
import { CupSoda } from "lucide-react";
import { Button } from "@/components/ui/button";

const JuicePage = () => {
  const { addToCart } = useCart();
  const [activeSize, setActiveSize] = useState("1L");

  // Get juice products for the active size
  const juiceProducts = getProductsBySubcategory("juice", activeSize);

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
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-kasata-900">
                عصائر
              </h1>
              <p className="text-kasata-700 max-w-2xl mb-5">
                عصائر طازجة ومنعشة من أجود أنواع الفواكه، نقدمها لكم بأعلى جودة
              </p>

              <div className="flex gap-2 justify-center">
                <Button
                  className={
                    activeSize === "1L" ? "bg-kasata-600" : "bg-kasata-300"
                  }
                  onClick={() => setActiveSize("1L")}
                >
                  <span>لتر</span>
                  <span>1</span>
                </Button>
                <Button
                  className={
                    activeSize === "330ml" ? "bg-kasata-600" : "bg-kasata-300"
                  }
                  onClick={() => setActiveSize("330ml")}
                >
                  <span>مل</span>
                  <span>330</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <section className="py-12">
          <div className="kasata-container">
            <ProductGrid products={juiceProducts} onAddToCart={addToCart} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default JuicePage;
