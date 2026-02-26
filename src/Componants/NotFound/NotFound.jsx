import React from "react";
import { Button } from "@heroui/react";
import { Home2 } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import image2 from "../../../public/Gemini_Generated_Image_kydc1rkydc1rkydc.png";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#18191a] flex flex-col items-center justify-center p-4 text-center">
      {/* الدائرة المركزية مع اللوجو */}
      <div className="relative mb-8">
        {/* تأثير الإضاءة الخلفية (Glow effect) */}
        <div className="absolute inset-0 bg-blue-600/30 blur-3xl rounded-full"></div>
        
        {/* الدائرة التي تحتوي على اللوجو */}
        <div className="relative bg-[#242526] p-2 rounded-full border-4 border-white/5 shadow-2xl overflow-hidden w-40 h-40 flex items-center justify-center">
          <img 
            src={image2} 
            alt="SocialHub Logo" 
            className="w-full h-full object-cover rounded-full opacity-90 group-hover:opacity-100 transition-opacity" 
          />
        </div>
        
        {/* علامة تحذير صغيرة اختيارية في الزاوية */}
        <div className="absolute -bottom-2 -right-2 bg-red-500 text-white p-2 rounded-full border-4 border-[#18191a] font-bold text-xl">
          !
        </div>
      </div>

      {/* نصوص الخطأ */}
      <h1 className="text-8xl font-black text-white mb-2 tracking-tighter opacity-20">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        This Page Isn't Available
      </h2>
      <p className="text-gray-400 max-w-md mb-10 leading-relaxed text-sm">
        The link you followed may be broken, or the page may have been removed. 
        You can go back to your main feed.
      </p>

      {/* أزرار التحكم */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onPress={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 px-10 rounded-lg shadow-lg shadow-blue-500/10 transition-all"
          startContent={<Home2 variant="Bold" size={20}/>}
        >
          Go to News Feed
        </Button>
        
        <Button 
          onPress={() => navigate(-1)}
          variant="light"
          className="text-blue-500 font-bold h-11 px-8 rounded-lg hover:bg-white/5 transition-all"
        >
          Go Back
        </Button>
      </div>

      {/* الخط الجمالي السفلي */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-blue-600/20 to-transparent"></div>
    </div>
  );
}