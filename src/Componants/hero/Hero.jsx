import { Card, CardBody, Avatar } from "@heroui/react";
import {
  Messages1,
  Gallery,
  Notification,
  People,
  UserTick,
  Heart,
  MessageText1,
  Star1,
  ArrowRight,
  Star,
} from "iconsax-react";
import image1 from "../../../public/Gemini_Generated_Image_8hhryh8hhryh8hhr.png";
import image2 from "../../../public/Gemini_Generated_Image_kydc1rkydc1rkydc.png";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div
      className="relative flex min-h-screen  flex-col justify-between overflow-hidden bg-[#1e60f0] p-12 text-white font-sans"
      style={{
        backgroundImage: `linear-gradient(rgba(20, 71, 230, 0.5), rgba(20, 71, 230, 0.5)), url(${image1})`,
      }}
    >
      {/* 1. Logo Section */}
      <div className="relative z-10 flex items-center gap-3">
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

        <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">
          SocialHub
        </span>
      </div>

      {/* 2. Main Content Section */}
      <div className="relative z-10 flex flex-col gap-10 max-w-2xl">
        {/* Title */}
        <div>
          <h1 className="text-5xl font-bold leading-[1.1]">
            Welcome Back <br />
            <span className="text-blue-300">to SocialHub App</span>
          </h1>
          <p className="mt-4 text-gray-300 text-lg">
            Signin to connect people all over the world
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Card 1: Chat */}
          <div className="flex items-center gap-4 rounded-2xl bg-white/10 border border-white/10 p-4 backdrop-blur-md hover:scale-105 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-400/20 text-blue-200">
              <Messages1 variant="Bold" size={24} color="#7BF1A8" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Real-time Chat</h3>
              <p className="text-xs text-blue-100/60 font-light">
                Instant messaging
              </p>
            </div>
          </div>

          {/* Card 2: Media */}
          <div className="flex items-center gap-4 rounded-2xl bg-white/10 border border-white/10 p-4 backdrop-blur-md hover:scale-105 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-400/20 text-blue-200">
              <Gallery variant="Bold" size={24} color="#DBEAFE" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Share Media</h3>
              <p className="text-xs text-blue-100/60 font-light">
                Photos & videos
              </p>
            </div>
          </div>

          {/* Card 3: Alerts */}
          <div className="flex items-center gap-4 rounded-2xl bg-white/10 border border-white/10 p-4 backdrop-blur-md hover:scale-105 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-400/20 text-blue-200">
              <Notification variant="Bold" size={24} color="#6C67CA" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Smart Alerts</h3>
              <p className="text-xs text-blue-100/60 font-light">
                Stay updated
              </p>
            </div>
          </div>

          {/* Card 4: Communities */}
          <div className="flex items-center gap-4 rounded-2xl bg-white/10 border border-white/10 p-4 backdrop-blur-md hover:scale-105 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-400/20 text-blue-200">
              <People variant="Bold" size={24} color="#418CDB" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Communities</h3>
              <p className="text-xs text-blue-100/60 font-light">
                Find your tribe
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-12 pt-2 pb-2 items-center justify-center">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <UserTick
                variant="Linear"
                size={20}
                color="oklch(88.2% 0.059 254.128)"
              />
              <span className="text-2xl font-bold">2M+</span>
            </div>
            <span className="text-[10px] text-blue-100/60 font-medium uppercase tracking-wider">
              Active Users
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Heart
                variant="Linear"
                size={20}
                color="oklch(88.2% 0.059 254.128)"
              />
              <span className="text-2xl font-bold">10M+</span>
            </div>
            <span className="text-[10px] text-blue-100/60 font-medium uppercase tracking-wider">
              Posts Shared
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <MessageText1
                variant="Linear"
                size={20}
                color="oklch(88.2% 0.059 254.128)"
              />
              <span className="text-2xl font-bold">50M+</span>
            </div>
            <span className="text-[10px] text-blue-100/60 font-medium uppercase tracking-wider">
              Messages Sent
            </span>
          </div>
        </div>
      </div>

      <Card className="relative z-10 border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl max-w-3xl rounded-4xl">
        <CardBody className="p-7">
          {/* Star Rating */}
          <div className="flex gap-1 mb-5 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                variant="Bold"
                size={22}
                color="oklch(85.2% 0.199 91.936)"
              />
            ))}
          </div>

          <p className="italic text-xl leading-relaxed text-blue-50 font-medium">
            "SocialHub has completely changed how I connect with friends and
            discover new communities. The experience is seamless!"
          </p>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-4">
              <Avatar
                src="https://i.pravatar.cc/150?img=9"
                size="lg"
                className="border-2 border-white/20"
              />
              <div>
                <p className="font-bold text-lg text-white leading-none">
                  Alex Johnson
                </p>
                <p className="text-[10px] text-blue-200/60 uppercase tracking-[0.2em] font-semibold mt-2">
                  Product Designer
                </p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

    </div>
  );
}
