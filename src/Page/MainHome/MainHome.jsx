import React, { use, useContext, useEffect, useState } from "react";
import MyNavbar from "../../Componants/Navbar/MyNavbar";
import { authContext } from "../../Componants/Context/AuthContext";
import axios from "axios";
import PostCard from "../../Componants/PostTemplet/PostCard";
import { Card, Skeleton, Spinner } from "@heroui/react";
import PostSkeleton from "../../Componants/PostTemplet/PostSkeleton";
import { useQueries, useQuery } from "@tanstack/react-query";
import CreatPost from "../../Componants/CreatPost/CreatPost";

export default function MainHome() {
  const { token } = useContext(authContext);

  async function getAllPost() {
    return axios(`${import.meta.env.VITE_API_URL}/posts`, {
      method: "GET",
      headers: {
        token: `${token}`,
      },
    });
  }

  const { data, isFetching, isLoading, isError } = useQuery({
    queryFn: getAllPost,
    queryKey: ["allPosts"],
    staleTime: 1000 * 15,
    gcTime: 1000 * 60 * 60,
  });

  const finalpost = data?.data?.data?.posts?.map((post) => {
    return <PostCard key={post.id} postData={post} />;
  });

  return (
    <>
      <MyNavbar />
      <div className="bg-[#18191a] relative top-15 ">
        {" "}
        <div className=" pt-4">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-lvh ">
              {Array.from({ length: 5 }).map((_, index) => (
                <PostSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center px-4 pb-10 ">
              <CreatPost />
              {finalpost}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
