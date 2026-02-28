import React from "react";
import { Avatar, Card, CardBody, Divider } from "@heroui/react";
import { Setting2, UserTick, Bookmark } from "iconsax-react"; // أيقونات للـ Shortcuts
import { Link } from "react-router-dom";

export default function MiniProfile({ user,numposts }) {
  const displayName = user?.name?.split(" ").slice(0, 2).join(" ");

  return (
    <Card className="w-full bg-[#242526] border border-white/5 overflow-hidden shadow-xl">
      <div className="h-24 w-full bg-linear-to-tr from-[#1d4ed8] to-[#7c3aed] relative">
        {user?.cover && (
          <img
            src={user.cover}
            className="w-full h-full object-cover opacity-50"
            alt="cover"
          />
        )}

        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
          <Avatar
            isBordered
            src={user?.photo}
            className="w-20 h-20 border-4 border-[#242526] shadow-2xl"
            color="primary"
          />
        </div>
      </div>

      <CardBody className="pt-12 pb-6 flex flex-col items-center">
        <div className="text-center mb-4">
          <h3 className="text-white font-bold text-lg capitalize">
            {displayName}
          </h3>
          <p className="text-default-200 text-medium italic">{user?.email}</p>
        </div>

        <Divider className="my-3 bg-white/5" />

        <div className="grid grid-cols-3 w-full gap-2 py-2">
          <div className="flex flex-col items-center">
            <span className="text-white font-bold text-medium">
              {user?.followersCount}
            </span>
            <span className="text-[10px] text-default-500 uppercase">
              Followers
            </span>
          </div>
          <div className="flex flex-col items-center border-x border-white/10">
            <span className="text-white font-bold text-medium">
              {user?.followingCount}
            </span>
            <span className="text-[10px] text-default-500 uppercase">
              Following
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white font-bold text-medium">
              {numposts?.length}
            </span>
            <span className="text-[10px] text-default-500 uppercase">
              Posts
            </span>
          </div>
        </div>

        <Divider className="my-3 bg-white/5" />

        <div className="w-full flex flex-col gap-1">
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-all text-sm group">
            <Bookmark
              size={18}
              className="group-hover:text-primary transition-colors"
              color="#ffffff"
            />
            <span>My Bookmarks</span>
          </button>
          <Link to={"/profile"}>
            <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-all text-sm group">
              <Setting2
                size={18}
                className="group-hover:text-primary transition-colors"
                color="#ffffff"
              />
              <span>Account Settings</span>
            </button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
