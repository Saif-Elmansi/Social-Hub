import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { More } from "iconsax-react";
import CreatPost from "../CreatPost/CreatPost";

export default function MyDrop({ update}) {

  return (
    <Dropdown className="bg-[#242526] border border-white/10 shadow-xl">
      <DropdownTrigger>
        <Button
          isIconOnly
          variant="light"
          size="sm"
          className="text-gray-400 hover:bg-[#3a3b3c]"
        >
          <More size={20} color="#b0b3b8" />{" "}
        </Button>
      </DropdownTrigger>

      <DropdownMenu aria-label="Post Actions" variant="flat">
        <DropdownItem
          onPress={() => {
            update();
          }}
          key="edit"
          className="text-white hover:text-white"
        >
          Edit Post
        </DropdownItem>

        <DropdownItem key="delete" color="danger" className="text-danger">
          Delete Post
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
