
import React from 'react';
import { Link } from 'react-router-dom';
import { IceCreamCone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-kasata-50 border-t border-kasata-100">
      <div className="kasata-container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="order-1 md:order-3">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-kasata-500 p-2 rounded-full">
                <IceCreamCone className="text-white h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-kasata-700">Kasata</span>
            </Link>
            <p className="text-sm text-gray-500 mb-4 text-right">
              نقدم أشهى أنواع الآيس كريم والعصائر الطازجة والكاساتا بنكهات متعددة وجودة عالية
            </p>
          </div>
          
          <div className="order-2 md:order-2">
            <h3 className="font-bold mb-4 text-kasata-800 text-right">روابط سريعة</h3>
            <ul className="space-y-2 text-right">
              <li><Link to="/" className="text-gray-500 hover:text-kasata-500 transition-colors">الرئيسية</Link></li>
              <li><Link to="/ice-cream" className="text-gray-500 hover:text-kasata-500 transition-colors">آيس كريم</Link></li>
              <li><Link to="/juice" className="text-gray-500 hover:text-kasata-500 transition-colors">عصير</Link></li>
              <li><Link to="/kasata" className="text-gray-500 hover:text-kasata-500 transition-colors">كاساتا</Link></li>
              <li><Link to="/about" className="text-gray-500 hover:text-kasata-500 transition-colors">عن المتجر</Link></li>
            </ul>
          </div>
          
          <div className="order-3 md:order-1">
            <h3 className="font-bold mb-4 text-kasata-800 text-right">تواصل معنا</h3>
            <ul className="space-y-2 text-right">
              <li className="text-gray-500">الهاتف: 01009533516</li>
              <li className="text-gray-500">البريد الإلكتروني: info@kasata.com</li>
              <li className="text-gray-500">العنوان: الشعراء بجوار بنزينة الشعراء</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-kasata-100 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} كاساتا. جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
