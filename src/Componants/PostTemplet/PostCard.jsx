import React, { use, useContext, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Divider,
  Image,
} from "@heroui/react";
import { Like1, MessageText1, ExportCurve, More, Global } from "iconsax-react";
import TopComment from "./TopComment";
import BtnComment from "./BtnComment";
import { Link } from "react-router-dom";
import axios from "axios";
import { authContext } from "../Context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function PostCard({ postData, comments }) {
  const { token } = useContext(authContext);
  if (!postData) return null;

  const {
    body,
    id,
    user,
    createdAt,
    likesCount,
    commentsCount,
    topComment,
    image,
  } = postData;

  const postDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  let fcomment = comments?.map((comment) => (
    <TopComment key={comment._id} commentData={comment} />
  ));

  const inputRef = useRef(null);
  const queryClint = useQueryClient();

  async function creatComment() {
    const formData = new FormData();
    formData.append("content", inputRef.current.value);

    return axios.post(
      `${import.meta.env.VITE_API_URL}/posts/${id}/comments`,
      formData,
      {
        headers: {
          token: token,
        },
      },
    );
  }

  const { isPending, mutate  } = useMutation({
    mutationFn: creatComment,
    onSuccess: function (data) {
      console.log("datamution", data);

      inputRef.current.value = "";
      console.log(inputRef.current.value);

      queryClint.invalidateQueries(["commentpost", id]);
    },
    onError: function (error) {
      console.log(error);
    },
  });

  return (
    <Card className="w-full max-w-137.5 bg-[#242526] text-white border-none shadow-md my-4 overflow-hidden">
      {/* --- Header --- */}
      <CardHeader className="justify-between px-4 pt-4 pb-2">
        <div className="flex gap-3">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={user?.photo}
            className="border-blue-500"
          />
          <div className="flex flex-col gap-0.5 items-start justify-center">
            <h4 className="text-small font-bold leading-none text-white hover:underline cursor-pointer">
              {user?.name}
            </h4>
            <div className="flex items-center gap-1 text-[12px] text-[#b0b3b8]">
              <span>
                <Link to={`/postDetails/${id}`} className="hover:underline">
                  {postDate}
                </Link>
              </span>
              <span>•</span>
              <Global size={12} variant="Bold" />
            </div>
          </div>
        </div>
        <Button isIconOnly variant="light" size="sm" className="text-gray-400">
          <More size={20} color="#ffffff" />
        </Button>
      </CardHeader>

      {/* --- Body (Text & Image) --- */}
      <CardBody className="px-4 py-2 text-[15px] text-gray-200">
        <p dir="auto" className="mb-3">
          {body}
        </p>
        {image && (
          <div className="rounded-lg overflow-hidden flex justify-center border border-white/5 bg-[#18191a]">
            <Image
              alt="post"
              className="w-full h-auto object-contain " // التعديل هنا
              src={image}
            />
          </div>
        )}
      </CardBody>

      {/* --- Stats --- */}
      <div className="px-4 py-2 flex justify-between items-center text-[#b0b3b8] text-xs">
        <div className="flex items-center gap-1.5">
          <div className="bg-blue-500 rounded-full p-1 shadow-sm">
            <Like1 size={10} variant="Bold" color="white" />
          </div>
          <span className="hover:underline cursor-pointer">{likesCount}</span>
        </div>
        <div className="flex gap-3">
          <span className="hover:underline cursor-pointer">
            {commentsCount} comments
          </span>
          <span className="hover:underline cursor-pointer">0 shares</span>
        </div>
      </div>

      <div className="px-4">
        <Divider className="bg-white/10" />
      </div>

      {/* --- Action Buttons --- */}
      <CardFooter className="px-2 py-1 justify-between gap-1">
        {/* زر الـ Like */}
        <Button
          variant="light"
          className="flex-1 text-[#b0b3b8] hover:bg-white/5 font-semibold text-sm h-9 gap-2"
          startContent={<Like1 size={20} />}
        >
          Like
        </Button>

        {/* زر الـ Comment */}
        <Button
          variant="light"
          className="flex-1 text-[#b0b3b8] hover:bg-white/5 font-semibold text-sm h-9 gap-2"
          startContent={<MessageText1 size={20} />}
        >
          Comment
        </Button>

        {/* زر الـ Share */}
        <Button
          variant="light"
          className="flex-1 text-[#b0b3b8] hover:bg-white/5 font-semibold text-sm h-9 gap-2"
          startContent={<ExportCurve size={20} />}
        >
          Share
        </Button>
      </CardFooter>

      <BtnComment
        inputRef={inputRef}
        fun={creatComment}
        isPending={isPending}
        mutate={mutate}
      />

      {topComment && (
        <div
          className="pb-3 border-t border-white/5 pt-2 overflow-y-scroll scrollbar-thin 
                scrollbar-thumb-[#3e4042] 
                scrollbar-track-[#18191a]"
        >
          {comments ? fcomment : <TopComment commentData={topComment} />}
          {comments?.length ? (
            ""
          ) : (
            <button className="text-[13px] font-semibold text-[#b0b3b8] px-4 hover:underline">
              <Link to={`/postDetails/${id}`} className="hover:underline">
                View more comments
              </Link>
            </button>
          )}
        </div>
      )}
    </Card>
  );
}
