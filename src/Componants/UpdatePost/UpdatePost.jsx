import React, { useContext, useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Avatar,
} from "@heroui/react";
import { CloseCircle, GalleryAdd } from "iconsax-react";
import axios from "axios";
import { authContext } from "../Context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function UpdatePost({ isOpen, onOpenChange, postData }) {
  const { token } = useContext(authContext);
  const queryClient = useQueryClient();
  
  const textareaRef = useRef(null);
  const imageRef = useRef(null);
  const [imgpreurl, setImgpreurl] = useState(postData?.image || null);
  const [body, setBody] = useState(postData?.body || "");

  // لما تضغط على صورة، تظهر في الـ preview
  const imagePrew = () => {
    const imgURL = URL.createObjectURL(imageRef.current.files[0]);
    setImgpreurl(imgURL);
  };

  const clearImg = () => {
    setImgpreurl(null);
    imageRef.current.value = "";
  };

  async function updatePostData() {
    const form = new FormData();
    form.append("body", body);
    
    if (imageRef.current?.files[0]) {
      form.append("image", imageRef.current.files[0]);
    }

    return axios.put(
      `${import.meta.env.VITE_API_URL}/posts/${postData.id}`,
      form,
      {
        headers: {
          token: token,
        },
      }
    );
  }

  // لما تنجح العملية
  const { isPending, mutate } = useMutation({
    mutationFn: updatePostData,
    onSuccess: (data) => {
      console.log("Post updated:", data);
      toast.success("Post updated successfully! ✅");
      
      // أعد تحميل كل البيانات
      queryClient.invalidateQueries(["allPosts"]);
      queryClient.invalidateQueries(["postdata", postData.id]);
      
      // أغلق الـ Modal
      onOpenChange(false);
    },
    onError: (error) => {
      console.error("Error:", error);
      toast.error("Failed to update post ❌");
    },
  });

  // لما تضغط زر "Update"
  const handleUpdate = () => {
    if (!body.trim()) {
      toast.warning("Post cannot be empty!");
      return;
    }
    mutate();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="bg-[#242526] text-white"
      size="lg"
      backdrop="blur"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center border-b border-white/10 py-4">
              <span className="text-xl font-bold">Edit Post</span>
            </ModalHeader>

            <ModalBody className="py-4">
              {/* صورة الـ user */}
              <div className="flex gap-3 items-center mb-4">
                <Avatar
                  src={postData?.user?.photo}
                  isBordered
                  color="primary"
                  size="md"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-white">
                    {postData?.user?.name}
                  </span>
                  <span className="text-xs bg-[#3a3b3c] px-2 py-0.5 rounded-md w-fit text-gray-300">
                    Public
                  </span>
                </div>
              </div>

              {/* مربع كتابة النص */}
              <Textarea
                placeholder="What's on your mind?"
                variant="unstyled"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="text-lg text-white"
                minRows={4}
                classNames={{
                  input: "placeholder:text-[#b0b3b8] text-xl",
                }}
              />

              {/* زر إضافة صورة */}
              <div className="mt-4 p-3 border border-[#4e4f50] rounded-lg flex items-center justify-between">
                <span className="text-sm font-semibold px-1">
                  Update your post
                </span>
                <div className="flex gap-1">
                  <input
                    type="file"
                    ref={imageRef}
                    onChange={imagePrew}
                    id="image-upload-edit"
                    className="hidden"
                    accept="image/*"
                  />
                  <Button
                    as="label"
                    htmlFor="image-upload-edit"
                    isIconOnly
                    variant="light"
                    className="text-green-500 hover:bg-green-500/10 cursor-pointer"
                  >
                    <GalleryAdd variant="Bold" size={24} color="#45bd62" />
                  </Button>
                </div>
              </div>

              {/* عرض الصورة المختارة */}
              {imgpreurl && (
                <div className="mt-2 rounded-lg border border-[#4e4f50] relative">
                  <img src={imgpreurl} alt="preview" className="w-full" />
                  <CloseCircle
                    onClick={clearImg}
                    size="32"
                    color="#FF8A65"
                    variant="Bulk"
                    className="absolute top-3 end-3 cursor-pointer"
                  />
                </div>
              )}
            </ModalBody>

            {/* الأزرار في الأسفل */}
            <ModalFooter className="flex gap-2 pt-0 pb-6">
              <Button
                variant="flat"
                className="bg-[#3a3b3c] text-white"
                onPress={onClose}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                className="w-32 font-bold text-md h-10"
                disabled={isPending}
                onPress={handleUpdate}
              >
                {isPending ? "Updating..." : "Update"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}