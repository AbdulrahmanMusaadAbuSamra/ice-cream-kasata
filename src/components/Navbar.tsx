import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IceCreamCone, ShoppingCart, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="kasata-container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-kasata-500 p-2 rounded-full">
              <IceCreamCone className="text-white h-6 w-6" />
            </div>
            <span className="text-2xl font-bold text-kasata-700">Kasata</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="font-medium hover:text-kasata-500 transition-colors"
            >
              الرئيسية
            </Link>
            <Link
              to="/ice-cream"
              className="font-medium hover:text-kasata-500 transition-colors"
            >
              آيس كريم
            </Link>
            <Link
              to="/juice"
              className="font-medium hover:text-kasata-500 transition-colors"
            >
              عصير
            </Link>
            <Link
              to="/kasata"
              className="font-medium hover:text-kasata-500 transition-colors"
            >
              كاساتا
            </Link>
          </div>

          {/* Cart button */}
          <div className="flex items-center gap-4">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-kasata-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden transition-all duration-300 origin-top",
            isMenuOpen
              ? "max-h-60 opacity-100 py-4"
              : "max-h-0 opacity-0 overflow-hidden py-0"
          )}
        >
          <div className="flex flex-col space-y-3 text-right">
            <Link
              to="/"
              className="px-2 py-1 hover:bg-kasata-50 rounded font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              الرئيسية
            </Link>
            <Link
              to="/ice-cream"
              className="px-2 py-1 hover:bg-kasata-50 rounded font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              آيس كريم
            </Link>
            <Link
              to="/juice"
              className="px-2 py-1 hover:bg-kasata-50 rounded font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              عصير
            </Link>
            <Link
              to="/kasata"
              className="px-2 py-1 hover:bg-kasata-50 rounded font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              كاساتا
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
