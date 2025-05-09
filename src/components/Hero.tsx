
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-kasata-100 to-kasata-200 overflow-hidden">
      <div className="kasata-container py-20 md:py-28">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-right max-w-lg">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-kasata-900 mb-6">
              كاساتا
              <span className="block text-kasata-600">ألذ المثلجات والعصائر</span>
            </h1>
            <p className="text-lg mb-8 text-kasata-800">
              استمتع بأشهى أنواع الآيس كريم والعصائر الطازجة والكاساتا المميزة بنكهات متنوعة وجودة عالية
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-end">
              <Button asChild className="bg-kasata-500 hover:bg-kasata-600 text-lg px-8 py-6">
                <Link to="/ice-cream">تسوق الآن</Link>
              </Button>
              <Button asChild variant="outline" className="text-lg px-8 py-6 border-kasata-500 text-kasata-500 hover:bg-kasata-50">
                <Link to="/about">اعرف المزيد</Link>
              </Button>
            </div>
          </div>
          <div className="relative w-full max-w-md">
            <div className="absolute top-0 right-0 w-64 h-64 bg-kasata-300 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-kasata-400 rounded-full blur-3xl opacity-30"></div>
            <img 
              src="https://scontent.fcai21-4.fna.fbcdn.net/v/t39.30808-6/476432632_8899338370175321_2269751571457200548_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=104&ccb=1-7&_nc_sid=714c7a&_nc_ohc=rZTqd9IRO6MQ7kNvwElsjnK&_nc_oc=Admx-_4z6Rn55Wk_xK5lij_-RET6uxMvFerhI7vN9GOeJ1nwnqmQ_4AzPNzZEj9K1p8&_nc_zt=23&_nc_ht=scontent.fcai21-4.fna&_nc_gid=DsRgsc5YFXalUD8PAk9BCg&oh=00_AfETpFwZyI_HEPA3uaPFjM-3f0bKX9TtaVneNMdl_PpHLw&oe=681D2E33" 
              alt="Delicious Ice Cream" 
              className="relative animate-float w-full h-auto object-cover rounded-3xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
