import React from "react";
import { Avatar, Button, Input } from "@heroui/react";
import {
  Send2,
  Camera,
  EmojiHappy,
  Image,
  GalleryAdd,
  More,
} from "iconsax-react";
import image from "../../../public/Gemini_Generated_Image_kydc1rkydc1rkydc.png";

export default function BtnComment({ inputRef, fun, isPending, mutate }) {
  return (
    <div className="px-4 py-3 border-t border-white/5 bg-[#242526] w-full">
      <div className="flex gap-2 items-center">
        <Avatar src={image} size="sm" className="shrink-0 w-8 h-8" />

        <div className="flex-1 relative">
          <div
            className="
                flex items-center
                bg-[#3a3b3c]
                hover:bg-[#4e4f50]
                focus-within:bg-[#4e4f50]
                px-4
                h-9
                rounded-full
              "
          >
            <input
              ref={inputRef}
              placeholder="Write a comment..."
              className="
        flex-1
        bg-transparent
        outline-none
        text-[14px]
        text-white
        placeholder:text-gray-400
      "
            />

            <div className="flex items-center gap-1">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                className="text-[#b0b3b8] hover:text-blue-500 min-w-8 w-8 h-8"
              >
                <EmojiHappy size={18} color="#ffffff" />
              </Button>

              <Button
                isIconOnly
                variant="light"
                size="sm"
                className="text-[#b0b3b8] hover:text-blue-500 min-w-8 w-8 h-8"
              >
                <Camera size={18} color="#ffffff" />
              </Button>

              <Button
                isIconOnly
                variant="light"
                size="sm"
                className="text-[#b0b3b8] hover:text-blue-500 min-w-8 w-8 h-8"
              >
                <GalleryAdd size={18} color="#ffffff" />
              </Button>
            </div>
          </div>
        </div>

        {/* زرار الإرسال المنفصل */}
        <Button
          onPress={mutate}
          disabled={isPending}
          isIconOnly
          variant="light"
          radius="full"
          className="text-blue-500 hover:bg-blue-500/10 min-w-10 w-10 h-10"
        >
          {isPending ? (
            <More size="32" color="#ffffff" />
          ) : (
            <Send2 size={22} variant="Bold" color="#ffffff" />
          )}
        </Button>
      </div>
    </div>
  );
}
