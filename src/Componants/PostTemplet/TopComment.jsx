import React from "react";
import { Avatar } from "@heroui/react";

export default function TopComment({ commentData }) {
  if (!commentData) return null;

  const { content, commentCreator, createdAt } = commentData;

  const commentTime = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex gap-2 px-4 py-2 group mb-2">
      <Avatar
        src={commentCreator?.photo}
        size="sm"
        className="mt-1 shrink-0 border border-white/10"
      />

      <div className="flex flex-col flex-1">
        <div className="bg-[#3a3b3c] rounded-2xl px-3 py-2 max-w-fit shadow-sm">
          <h5 className="text-[13px] font-bold text-white hover:underline cursor-pointer leading-tight">
            {commentCreator?.name}
          </h5>
          <p className="text-[14px] text-gray-200 leading-snug mt-0.5">
            {content}
          </p>
        </div>

        <div className="flex gap-4 mt-1 ml-2 text-[12px] font-bold text-[#b0b3b8]">
          <button className="hover:underline cursor-pointer transition-colors hover:text-white">
            Like
          </button>
          <button className="hover:underline cursor-pointer transition-colors hover:text-white">
            Reply
          </button>
          <span className="font-normal text-gray-500">{commentTime}</span>
        </div>
      </div>
    </div>
  );
}
