import React, { useContext, useEffect, useState } from "react";
import MyNavbar from "../../Componants/Navbar/MyNavbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { authContext } from "../../Componants/Context/AuthContext";
import PostCard from "../../Componants/PostTemplet/PostCard";
import PostSkeleton from "../../Componants/PostTemplet/PostSkeleton";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

export default function PostDet() {
  const { postId } = useParams();

  const { token } = useContext(authContext);

  async function getPostDet() {
    return await axios.get(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
      headers: {
        token: token,
      },
    });
  }

  const { data, isLoading } = useQuery({
    queryFn: getPostDet,
    queryKey: ["postdata", postId],
    staleTime: 1000 * 15,
    gcTime: 1000 * 60 * 2,
  });

  async function getPostComments() {
    return await axios.get(
      `${import.meta.env.VITE_API_URL}/posts/${postId}/comments?page=1&limit=10`,
      {
        headers: {
          token: token,
        },
      },
    );
  }

  const { data: commentsData } = useQuery({
    queryFn: getPostComments,
    queryKey: ["commentpost", postId],
    staleTime: 1000 * 15,
    gcTime: 1000 * 60 * 2,
  });
  console.log(commentsData?.data?.data?.comments);

  return (
    <>
      <Helmet>
        <title>Social Hup | PostDet |{data?.data?.data?.post.user.name}</title>
      </Helmet>
      <MyNavbar />
      <div className="bg-[#18191a] relative top-15 ">
        {" "}
        <div className="pt-4">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-lvh ">
              <PostSkeleton />
            </div>
          ) : (
            <div className="flex flex-col items-center h-lvh  px-4 pb-10">
              <PostCard
                postData={data?.data?.data?.post}
                comments={commentsData?.data?.data?.comments}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
