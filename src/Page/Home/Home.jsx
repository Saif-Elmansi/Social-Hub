import {
  Card,
  CardBody,
  Avatar,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import {
  Messages1,
  Gallery,
  Notification,
  People,
  UserTick,
  Heart,
  MessageText1,
  Star,
  LoginCurve,
  UserAdd,
} from "iconsax-react";
import image1 from "../../../public/Gemini_Generated_Image_8hhryh8hhryh8hhr.png";
import image2 from "../../../public/Gemini_Generated_Image_kydc1rkydc1rkydc.png";

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Home() {
  return (
    <>
      <Helmet>
        <title>Social Hup | welcome</title>
      </Helmet>
      <div
        className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-[#1e60f0] text-white font-sans"
        style={{
          backgroundImage: `linear-gradient(rgba(20, 71, 230, 0.6), rgba(20, 71, 230, 0.6)), url(${image1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* 1. Navbar المطور */}
        <div className="relative z-20 w-full max-w-7xl px-6 py-6 flex items-center justify-between">
          <div className="relative z-10 flex items-center gap-3">
            {/* الحاوية المربعة */}
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md border border-black shadow-lg overflow-hidden transition-all hover:bg-white/25">
              <Link
                to="/"
                className="w-full h-full flex items-center justify-center"
              >
                <img
                  src={image2}
                  alt="SocialHub Logo"
                  className="w-full h-full object-cover rounded-xl"
                />
              </Link>
            </div>

            {/* اسم الموقع */}
            <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">
              SocialHub
            </span>
          </div>

          {/* أزرار الـ Navbar */}
          <div className="flex items-center gap-4">
            <Button
              className="bg-white text-blue-600 font-bold px-6 shadow-lg hover:bg-blue-50"
              startContent={
                <UserAdd size={20} variant="Bold" color="#155dfc" />
              }
              as={Link}
              to={"/register"}
            >
              Register
            </Button>
          </div>
        </div>

        {/* حاوية المحتوى الرئيسية */}
        <div className="relative z-10 w-full max-w-7xl flex flex-col gap-12 lg:gap-20 px-6 pb-20 mt-10">
          {/* 2. Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* الجانب الأيسر: العناوين، الوصف، وأزرار الفعل */}
            <div className="flex flex-col gap-10 text-center lg:text-left">
              <div>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  Welcome Back <br />
                  <span className="text-blue-300 font-extrabold tracking-tight">
                    to SocialHub App
                  </span>
                </h1>
                <p className="mt-6 text-gray-200 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 opacity-90 leading-relaxed">
                  The ultimate space to connect, share, and grow. Join our
                  global community and start your journey today.
                </p>
              </div>

              {/* أزرار الفعل الأساسية (Hero Actions) */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Button
                  size="lg"
                  as={Link}
                  to={"/login"}
                  className="bg-blue-500 text-white font-bold px-10 h-14 rounded-2xl shadow-xl hover:bg-blue-600 border border-blue-400/30"
                >
                  Get Started Now
                </Button>
                <Button
                  size="lg"
                  variant="bordered"
                  className="text-white border-white/30 backdrop-blur-md font-bold px-10 h-14 rounded-2xl hover:bg-white/10"
                >
                  Learn More
                </Button>
              </div>

              {/* الإحصائيات (Stats) */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-10 mt-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <UserTick variant="Linear" size={24} color="#7BF1A8" />
                    <span className="text-3xl font-bold">2M+</span>
                  </div>
                  <span className="text-xs text-blue-100/60 font-medium uppercase tracking-widest">
                    Active Users
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Heart variant="Bold" size={24} color="#FF7B7B" />
                    <span className="text-3xl font-bold">10M+</span>
                  </div>
                  <span className="text-xs text-blue-100/60 font-medium uppercase tracking-widest">
                    Posts Shared
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <MessageText1 variant="Linear" size={24} color="#7BCCFF" />
                    <span className="text-3xl font-bold">50M+</span>
                  </div>
                  <span className="text-xs text-blue-100/60 font-medium uppercase tracking-widest">
                    Messages Sent
                  </span>
                </div>
              </div>
            </div>

            {/* الجانب الأيمن: المميزات والتقييم */}
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Feature Cards ... (نفس الكود السابق مع الاحتفاظ بجماليتها) */}
                <div className="flex items-center gap-4 rounded-3xl bg-white/10 border border-white/10 p-5 backdrop-blur-lg hover:bg-white/15 transition-all">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-200">
                    <Messages1 variant="Bold" size={26} color="#7BF1A8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[15px]">Real-time Chat</h3>
                    <p className="text-[12px] text-blue-100/60 font-light">
                      Instant messaging
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-3xl bg-white/10 border border-white/10 p-5 backdrop-blur-lg hover:bg-white/15 transition-all">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-200">
                    <Gallery variant="Bold" size={26} color="#DBEAFE" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[15px]">Share Media</h3>
                    <p className="text-[12px] text-blue-100/60 font-light">
                      Photos & videos
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-3xl bg-white/10 border border-white/10 p-5 backdrop-blur-lg hover:bg-white/15 transition-all">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-200">
                    <Notification variant="Bold" size={26} color="#6C67CA" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[15px]">Smart Alerts</h3>
                    <p className="text-[12px] text-blue-100/60">Stay updated</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-3xl bg-white/10 border border-white/10 p-5 backdrop-blur-lg hover:bg-white/15 transition-all">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-200">
                    <People variant="Bold" size={26} color="#418CDB" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[15px]">Communities</h3>
                    <p className="text-[12px] text-blue-100/60">
                      Find your tribe
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial Section */}
              <Card className="border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl rounded-[2.5rem]">
                <CardBody className="p-8">
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} variant="Bold" size={20} color="#FFD700" />
                    ))}
                  </div>
                  <p className="italic text-lg md:text-xl leading-relaxed text-blue-50 font-medium">
                    "SocialHub has completely changed how I connect with friends
                    and discover new communities. The experience is seamless!"
                  </p>
                  <div className="flex items-center gap-4 mt-8">
                    <Avatar
                      src="https://i.pravatar.cc/150?img=9"
                      size="lg"
                      className="border-2 border-white/20"
                    />
                    <div>
                      <p className="font-bold text-lg">Alex Johnson</p>
                      <p className="text-[10px] text-blue-200/50 uppercase tracking-widest font-semibold">
                        Product Designer
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
