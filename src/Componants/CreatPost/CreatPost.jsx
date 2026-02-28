import React from "react";
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
} from "iconsax-react";
import { useQueryClient } from "@tanstack/react-query";

export default function CreatPost() {
  const queryClient = useQueryClient();
  const profileData = queryClient.getQueryData(["dataProfile"]);
  const user = profileData?.data?.data.user;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="bg-[#242526] p-4 rounded-xl shadow-md w-full max-w-145 mx-auto flex gap-3 items-center">
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
        className="bg-[#242526] text-white"
        size="lg"
        backdrop="blur"
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
                  className="text-lg text-white"
                  minRows={4}
                  classNames={{
                    input: "placeholder:text-[#b0b3b8] text-xl",
                  }}
                />

                {/* صندوق الأدوات (Add to your post) */}
                <div className="mt-4 p-3 border border-[#4e4f50] rounded-lg flex items-center justify-between">
                  <span className="text-sm font-semibold px-1">
                    Add to your post
                  </span>
                  <div className="flex gap-1">
                    <Button
                      isIconOnly
                      variant="light"
                      className="text-green-500 hover:bg-green-500/10"
                    >
                      <GalleryAdd variant="Bold" size={24} color="#ffffff" />
                    </Button>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter className="flex flex-col gap-2 pt-0 pb-6">
                <Button
                  color="primary"
                  className="w-full font-bold text-md h-10"
                  onPress={onClose}
                >
                  Post
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
