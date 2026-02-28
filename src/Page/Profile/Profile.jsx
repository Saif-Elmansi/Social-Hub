import React, { useContext } from "react";
import MyNavbar from "../../Componants/Navbar/MyNavbar";
import { authContext } from "../../Componants/Context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { Avatar, Button, Divider, Spinner } from "@heroui/react"; // ضيف Spinner للتحميل
import { Edit2, More, Camera } from "iconsax-react";
import { Helmet } from "react-helmet";

export default function Profile() {
  const { token } = useContext(authContext);

  const queryClient = useQueryClient();
  const profileData = queryClient.getQueryData(["dataProfile"]);
  const user = profileData?.data?.data.user;

  if (!user) return null;

  const {
    name,
    username,
    photo,
    email,
    cover,
    followersCount,
    followingCount,
  } = user;
  console.log(user);

  return (
    <>
      <Helmet>
        <title>Social Hup | Profile |{name}</title>
      </Helmet>
      <MyNavbar />
      <div className="w-full bg-[#242526] shadow-sm min-h-screen">
        <div className="relative h-48 sm:h-80 w-full max-w-6xl mx-auto overflow-hidden rounded-b-xl bg-[#3a3b3c]">
          {cover ? (
            <img
              src={cover}
              alt="cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-b from-blue-600/20 to-[#242526]" />
          )}
          <Button
            isIconOnly
            variant="flat"
            className="absolute bottom-4 right-4 bg-black/40 text-white backdrop-blur-md"
          >
            <Camera size={20} variant="Bold" color="#ffffff" />
          </Button>
        </div>

        <div className="max-w-5xl mx-auto px-4 pb-4 text-white">
          <div className="relative flex flex-col md:flex-row items-center md:items-end gap-4 -mt-12 md:-mt-16 mb-4">
            <div className="relative">
              <Avatar
                src={photo}
                className="w-32 h-32 md:w-40 md:h-40 border-4 border-[#242526] shadow-xl"
                isBordered
                color="primary"
              />
              <Button
                isIconOnly
                size="sm"
                radius="full"
                className="absolute bottom-2 right-2 bg-[#3a3b3c] text-white border border-[#4e4f50]"
              >
                <Camera size={16} variant="Bold" color="#ffffff" />
              </Button>
            </div>

            <div className="flex-1 text-center md:text-left mb-2">
              <h1 className="text-3xl font-bold mb-1">{name}</h1>
              <p className="text-gray-400 font-medium mb-2">{email}</p>
              <div className="flex items-center justify-center md:justify-start gap-4 text-sm">
                <span className="font-bold cursor-pointer hover:underline">
                  {followersCount}{" "}
                  <span className="text-gray-400 font-normal">Followers</span>
                </span>
                <span className="font-bold cursor-pointer hover:underline">
                  {followingCount}{" "}
                  <span className="text-gray-400 font-normal">Following</span>
                </span>
              </div>
            </div>

            <div className="flex gap-2 mb-2">
              <Button
                color="primary"
                className="font-bold px-6"
                startContent={
                  <Edit2 size={18} variant="Bold" color="#ffffff" />
                }
              >
                Edit Profile
              </Button>
              <Button
                isIconOnly
                variant="flat"
                className="bg-[#3a3b3c] text-white"
              >
                <More size={20} color="#ffffff" />
              </Button>
            </div>
          </div>

          <Divider className="bg-white/10 my-4" />

          {/* --- التبويبات --- */}
          {/* <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2">
            <span label="Posts" active>Posts</span>
            <span label="About">About</span>
            <span label="Friends">Friends</span>
            <span label="Photos">Photos</span>
            <span label="Bookmarks">Bookmarks</span>
          </div> */}
        </div>
      </div>
    </>
  );
}
