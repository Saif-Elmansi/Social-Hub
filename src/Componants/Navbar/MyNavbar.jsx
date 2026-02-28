import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Badge,
} from "@heroui/react";
import {
  SearchNormal1,
  Home2,
  People,
  VideoPlay,
  Shop,
  Grid9,
  Messenger,
  Notification,
} from "iconsax-react";
import image2 from "../../../public/Gemini_Generated_Image_kydc1rkydc1rkydc.png";
import { use, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function MyNavbar() {
  const { token, setToken } = useContext(authContext);

  const nav = useNavigate();
  function handelLogout() {
    setToken(null);
    localStorage.removeItem("token");
    nav("/");
  }

  async function getProfile() {
    console.log("hh");

    return await axios.get(
      `${import.meta.env.VITE_API_URL}/users/profile-data`,
      {
        headers: { token: token },
      },
    );
  }

  const { data, isLoading, isError } = useQuery({
    queryFn: getProfile,
    queryKey: ["dataProfile"],
  });

  const user = data?.data?.data?.user;
  

  // if (isLoading) {
  //   return (
  //     <div className="h-screen bg-[#18191a] flex justify-center items-center">
  //       <Spinner size="lg" label="Loading Profile..." />
  //     </div>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <div className="text-white text-center mt-10">Error loading profile.</div>
  //   );
  // }

  return (
    <Navbar
      maxWidth="full"
      height="60px"
      className="bg-neutral-800 backdrop-blur-xl border-b border-white/5 fixed top-0 z-100"
    >
      <NavbarContent justify="start" className="gap-2">
        <NavbarBrand className="max-w-fit mr-2">
          <div className="cursor-default">
            <div className="h-10 w-10 rounded-full overflow-hidden border border-white/10 shadow-lg hover:scale-105 transition-transform">
              <Link to={"/home"}>
                <img
                  src={image2}
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </Link>
            </div>
          </div>
        </NavbarBrand>
        <div className="hidden md:flex relative group">
          <Input
            classNames={{
              base: "max-w-[240px] h-10",
              mainWrapper: "h-full",
              input: "text-small placeholder:text-white/80 text-white",
              inputWrapper:
                "h-full font-normal bg-white/10 !bg-white/10 group-hover:!bg-white/10 focus-within:!bg-white/15 rounded-full transition-all border-none px-4 shadow-none",
            }}
            placeholder="Search SocialHub"
            size="sm"
            startContent={<SearchNormal1 size={18} className="text-white/40" />}
            type="search"
          />
        </div>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex gap-1" justify="center">
        {/* Home Icon */}
        <NavbarItem isActive={true}>
          <div
            className={`flex items-center justify-center w-24 h-15 transition-all relative group cursor-pointer text-blue-500`}
          >
            <Link to={"/home"}>
              <Home2 variant="Bold" size={26} color="#3b82f6" />
            </Link>
            <div className="absolute bottom-0 w-full h-0.75 bg-blue-500 rounded-t-full shadow-[0_-4px_10px_rgba(59,130,246,0.3)]" />
          </div>
        </NavbarItem>

        {/* Communities Icon */}
        <NavbarItem>
          <div className="flex items-center justify-center w-24 h-15 transition-all relative group cursor-pointer text-white/60 hover:bg-white/5 hover:rounded-xl hover:text-white">
            <People color="#ffffff" variant="Linear" size={26} />
          </div>
        </NavbarItem>

        {/* Watch Icon */}
        <NavbarItem>
          <div className="flex items-center justify-center w-24 h-15 transition-all relative group cursor-pointer text-white/60 hover:bg-white/5 hover:rounded-xl hover:text-white">
            <VideoPlay color="#ffffff" variant="Linear" size={26} />
          </div>
        </NavbarItem>

        {/* Marketplace Icon */}
        <NavbarItem>
          <div className="flex items-center justify-center w-24 h-15 transition-all relative group cursor-pointer text-white/60 hover:bg-white/5 hover:rounded-xl hover:text-white">
            <Shop color="#ffffff" variant="Linear" size={26} />
          </div>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-2">
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            className="bg-white/10 hover:bg-white/20 text-white rounded-full min-w-10 h-10 transition-all"
          >
            <Grid9 color="#ffffff" size={20} variant="Bold" />
          </Button>

          <Badge
            color="danger"
            content="1"
            shape="circle"
            size="sm"
            className="border-none"
          >
            <Button
              isIconOnly
              className="bg-white/10 hover:bg-white/20 text-white rounded-full min-w-10 h-10 transition-all"
            >
              <Messenger color="#ffffff" size={20} variant="Bold" />
            </Button>
          </Badge>

          <Badge
            color="danger"
            content="3"
            shape="circle"
            size="sm"
            className="border-none"
          >
            <Button
              isIconOnly
              className="bg-white/10 hover:bg-white/20 text-white rounded-full min-w-10 h-10 transition-all"
            >
              <Notification color="#ffffff" size={20} variant="Bold" />
            </Button>
          </Badge>
        </div>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform border-2 border-white/10 ml-2"
              color="primary"
              size="md"
              src={user?.photo}
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            variant="flat"
            className="text-gray-700"
          >
            <DropdownItem key="profile" className="h-14 gap-2 text-blue-600">
              <p className="font-semibold text-xs text-gray-500">
                Signed in as
              </p>
              <p className="font-bold">{user?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings">
              <Link to={"/profile"}>profile</Link>
            </DropdownItem>
            <DropdownItem
              onPress={handelLogout}
              key="logout"
              color="danger"
              className="text-danger"
            >
              logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
