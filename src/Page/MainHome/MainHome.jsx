import React, { use, useContext, useEffect, useState } from "react";
import MyNavbar from "../../Componants/Navbar/MyNavbar";
import { authContext } from "../../Componants/Context/AuthContext";
import axios from "axios";
import PostCard from "../../Componants/PostTemplet/PostCard";
import PostSkeleton from "../../Componants/PostTemplet/PostSkeleton";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import CreatPost from "../../Componants/CreatPost/CreatPost";
import SuggestedUser from "../../Componants/Usersug/SuggestedUser";
import MiniProfile from "../../Componants/MiniProfile/MiniProfile";
import { Helmet } from "react-helmet";

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

  function getUserSug() {
    return axios(`${import.meta.env.VITE_API_URL}/users/suggestions?limit=40`, {
      method: "GET",
      headers: {
        token: token,
      },
    });
  }

  const { data: usersug } = useQuery({
    queryFn: getUserSug,
    queryKey: ["usersug"],
  });
  let fuser = usersug?.data?.data?.suggestions;

  let finalusersug = fuser?.map((user) => {
    return <SuggestedUser key={user._id} user={user} />;
  });

  const queryClient = useQueryClient();
  const profileData = queryClient.getQueryData(["dataProfile"]);
  const user = profileData?.data?.data.user;
  console.log(user);
  //

  function getUserPosts() {
    return axios(`${import.meta.env.VITE_API_URL}/users/${user.id}/posts`, {
      method: "GET",
      headers: {
        token: token,
      },
    });
  }

  const { data: userposts } = useQuery({
    queryFn: getUserPosts,
    queryKey: ["userposts"],
  });
  let fuserposts = userposts?.data?.data?.posts;
  // let numuserposts = fuserposts.length;

  return (
    <>
      <Helmet>
        <title>Social Hup | Feed</title>
      </Helmet>
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
            <div className="grid grid-cols-12 gap-4  px-4 pb-10 ">
              <div className="col-span-12 md:col-span-3 flex flex-col gap-6">
                <div className="sticky top-20">
                  <MiniProfile user={user} numposts={fuserposts} />{" "}
                  {/* ابعت بيانات اليوزر اللي عامل login */}
                </div>
              </div>
              <div className="col-span-12 md:col-span-6">
                <CreatPost />
                {finalpost}
              </div>
              <div className="col-span-12 md:col-span-3 flex flex-col gap-6 ">
                <div className="sticky top-20 w-full bg-[#242526] rounded-xl border border-white/5 overflow-hidden">
                  <div className="p-4 border-b border-white/5">
                    <h3 className="text-white font-bold text-sm">
                      Suggested for you
                    </h3>
                  </div>

                  <div className="max-h-[78vh] overflow-y-auto custom-scrollbar p-1">
                    {finalusersug}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
