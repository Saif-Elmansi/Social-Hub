import React, { useContext } from "react";
import { Avatar } from "@heroui/react";
import MyDropCom from "../DropDowen/MyDropCom";
import { toast } from "react-toastify";
import axios from "axios";
import { authContext } from "../Context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

export default function TopComment({ commentData, id }) {
  const { token } = useContext(authContext);
  const queryClient = useQueryClient();
  const profileData = queryClient.getQueryData(["dataProfile"]);
  const userprofile = profileData?.data?.data?.user;

  console.log(id);
  
  if (!commentData) return null;

  const { content, commentCreator, createdAt } = commentData;

  const commentTime = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  async function delCom() {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/posts/${id}/comments/${commentData._id}`,
        {
          headers: {
            token: token,
          },
        },
      );
      toast.success("Comment Delete successfully! ✅");
      queryClient.invalidateQueries("allPosts");
    } catch (error) {
      console.log(error);
      toast.error("Comment Delete Faild! ❌");
    }
  }

  return (
    <div className="flex w-full gap-2 px-4 py-2 group mb-2">
      <Avatar
        src={commentCreator?.photo}
        size="sm"
        className="mt-1 shrink-0 border border-white/10"
      />

      <div className="flex flex-col flex-1">
        <div className="bg-[#3a3b3c]  rounded-2xl flex justify-between gap-2 px-3 py-2 shadow-sm">
          <div>
            <h5 className="text-[13px] font-bold text-white hover:underline cursor-pointer leading-tight">
              {commentCreator?.name}
            </h5>
            <p className="text-[14px] text-gray-200 leading-snug mt-0.5">
              {content}
            </p>
          </div>
          {commentCreator?._id === userprofile?._id && (
            <div className="self-start ">
              <MyDropCom delCom={delCom} />
            </div>
          )}
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
