import React from "react";
import { Card, CardHeader, Avatar, Button } from "@heroui/react";
import { UserAdd, UserTick } from "iconsax-react"; // أيقونات عشان الروقان

export default function SuggestedUser({ user }) {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <Card
      className="w-full bg-[#242526] border border-white/5 hover:bg-[#2d2e2f] transition-all shadow-lg mt-4 "
      shadow="none"
    >
      <CardHeader className="flex justify-between items-center gap-3 p-4">
        <div className="flex gap-4 items-center flex-1">
          {/* Avatar بحجم محترم وبرواز */}
          <Avatar
            isBordered
            radius="full"
            size="lg"
            src={user?.photo}
            className="flex-shrink-0"
            color="primary"
          />

          <div className="flex flex-col gap-0.5 min-w-0">
            {/* الاسم واليوزر */}
            <h4 className="text-md font-bold text-white truncate leading-tight ">
              {user?.name?.split(" ").slice(0, 2).join(" ")}
            </h4>
            <span className="text-xs text-default-400 truncate mb-1">
              @{user?.username || "user_name"}
            </span>

            {/* الداتا (الأصدقاء والمتابعين) في سطر واحد */}
            <div className="flex items-center gap-2">
              <p className="text-[11px] text-primary font-medium">
                {user?.mutualFollowersCount}{" "}
                <span className="text-default-400">Mutual</span>
              </p>
              <div className="w-1 h-1 bg-default-300 rounded-full" />
              <p className="text-[11px] text-default-400">
                {user?.followersCount}{" "}
                <span className="font-medium">Followers</span>
              </p>
            </div>
          </div>
        </div>

        <Button
          className={`font-bold h-9 min-w-0 px-3 ${
            // صغرنا الـ px وخلينا الـ min-w صفر
            isFollowed
              ? "bg-[#3a3b3c] text-white hover:bg-[#4e4f50]"
              : "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
          }`}
          radius="full"
          size="sm"
          onPress={() => setIsFollowed(!isFollowed)}
          startContent={
            isFollowed ? (
              <UserTick size={16} color="#ffffff" />
            ) : (
              <UserAdd size={16} color="#ffffff" />
            )
          }
        >
          {isFollowed ? "Following" : "Follow"}
        </Button>
      </CardHeader>
    </Card>
  );
}
