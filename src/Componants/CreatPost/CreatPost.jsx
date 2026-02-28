import React, { useContext, useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Avatar,
  Textarea,
  Divider,
} from "@heroui/react";
import {
  GalleryAdd,
  UserTag,
  EmojiHappy,
  Location,
  VideoSquare,
  CloseCircle,
} from "iconsax-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import image1 from "../../../public/Gemini_Generated_Image_kydc1rkydc1rkydc.png";
import axios from "axios";
import { authContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

export default function CreatPost() {
  const { token } = useContext(authContext);
  const queryClient = useQueryClient();
  const profileData = queryClient.getQueryData(["dataProfile"]);
  const user = profileData?.data?.data.user;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const imageRef = useRef(null);
  const textareaRef = useRef(null);
  const [imgpreurl, setImgpreurl] = useState(null);

  function imagePrew() {
    const imgURL = URL.createObjectURL(imageRef.current.files[0]);
    setImgpreurl(imgURL);
  }

  function clearImg() {
    setImgpreurl(null);
    imageRef.current.value = "";
  }

  function postData() {
    const imgForm = imageRef.current.files[0];
    const contetData = textareaRef.current.value;

    const form = new FormData();
    if (contetData) {
      form.append("body", contetData);
    }
    if (imgForm) {
      form.append("image", imgForm);
    }

    return axios.post(`${import.meta.env.VITE_API_URL}/posts`, form, {
      headers: {
        token: token,
      },
    });
  }

  const { isPending, mutate } = useMutation({
    mutationFn: postData,
    onSuccess: function (data) {
      console.log(data);
      clearImg();
      textareaRef.current.value = "";
      onOpenChange(false);
      queryClient.invalidateQueries(["allPosts"]);
      toast.success("post created", {
        position: "top-center",
      });
    },
    onError: function (error) {
      console.log(error);
      toast.error("emputy post");
    },
  });

  return (
    <>
      <div className="bg-[#242526] p-4 rounded-xl shadow-md w-full  mx-auto flex gap-3 items-center">
        <Avatar src={user?.photo} size="md" />
        <Button
          onPress={onOpen}
          className="flex-1 justify-start bg-[#3a3b3c] hover:bg-[#4e4f50] text-[#b0b3b8] rounded-full h-10 text-md font-medium px-4"
        >
          What's on your mind, {user?.name?.split(" ")[0]}?
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-[#242526] text-white  "
        size="lg"
        backdrop="blur"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center border-b border-white/10 py-4">
                <span className="text-xl font-bold">Create post</span>
              </ModalHeader>

              <ModalBody className="py-4">
                <div className="flex gap-3 items-center mb-4">
                  <Avatar
                    src={user?.photo}
                    isBordered
                    color="primary"
                    size="md"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-white">{user?.name}</span>
                    <span className="text-xs bg-[#3a3b3c] px-2 py-0.5 rounded-md w-fit text-gray-300">
                      Public
                    </span>
                  </div>
                </div>

                {/* منطقة الكتابة */}

                <Textarea
                  placeholder={`What's on your mind, ${user?.name}?`}
                  variant="unstyled"
                  ref={textareaRef}
                  className="text-lg text-white"
                  minRows={4}
                  classNames={{
                    input: "placeholder:text-[#b0b3b8] text-xl",
                  }}
                />

                <div className="mt-4 p-3 border border-[#4e4f50]  rounded-lg flex items-center justify-between">
                  <span className="text-sm font-semibold px-1">
                    Add to your post
                  </span>
                  <div className="flex gap-1">
                    {/* الـ Input المخفي */}
                    <input
                      type="file"
                      ref={imageRef}
                      onChange={imagePrew}
                      id="image-upload"
                      className="hidden"
                    />

                    {/* الزرار اللي هيفتح الـ Input */}
                    <Button
                      as="label" // تعديل هنا من label لـ "label" كـ string
                      htmlFor="image-upload" // لازم يطابق الـ id اللي فوق
                      isIconOnly
                      variant="light"
                      className="text-green-500 hover:bg-green-500/10 cursor-pointer"
                    >
                      <GalleryAdd variant="Bold" size={24} color="#45bd62" />{" "}
                      {/* غيرت اللون للأخضر عشان يبقى شبه فيسبوك */}
                    </Button>
                  </div>
                </div>
                {imgpreurl && (
                  <div className="mt-2 rounded-lg border border-[#4e4f50] relative">
                    <img src={imgpreurl} alt="preview" className="w-full  " />
                    <CloseCircle
                      onClick={clearImg}
                      size="32"
                      color="#FF8A65"
                      variant="Bulk"
                      className="absolute top-3 end-3"
                    />
                  </div>
                )}
              </ModalBody>

              <ModalFooter className="flex  gap-2 pt-0 pb-6">
                <Button
                  color="primary"
                  className="w-full font-bold text-md h-10"
                  disabled={isPending}
                  onPress={mutate}
                >
                  {isPending ? "loading" : "Post"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
