import React from "react";
import Blog from "../assets/Blog.png";
import { Link, useNavigate } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import { FaUserCircle, FaPenNib } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { Button } from "./ui/button";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getEnv } from "@/helper/getEnv";
import { showToast } from "@/helper/showToast";
import { removeUser } from "../Redux/user.slice"; // 👈 make sure this path is correct

function Topbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showToast(data.message || "Logout failed", "error");
        return;
      }

      //  Clear local storage or cookies if you store user data
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");

      //  Correct Redux action
      dispatch(removeUser());

      showToast(data.message || "Logout successful", "success");
      navigate("/"); // Redirect to home after logout
    } catch (err) {
      console.error("Logout failed:", err);
      showToast("Logout failed, please try again", "error");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full h-14 bg-white shadow-sm z-20 flex items-center justify-between px-3 sm:px-6">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <img src={Blog} alt="Logo" className="h-8 w-auto sm:h-10" />
        <span className="font-semibold text-base sm:text-lg">Blog Kijiye</span>
      </div>

      {/* Search (hidden on mobile) */}
      <div className="hidden sm:block w-1/3">
        <Search />
      </div>

      {/* Auth / User Section */}
      <div>
        {!user.isLoggedIn ? (
          <Button
            asChild
            className="flex items-center gap-2 rounded-full px-3 text-sm sm:text-base"
          >
            <Link to="/signin">
              <IoLogIn className="text-lg" />
              Sign in
            </Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-gray-100"
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.user.avatar} alt={user.user.name} />
                  <AvatarFallback>
                    {user.user.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline font-medium text-sm">
                  {user.user.name}
                </span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Profile Option */}
              <DropdownMenuItem
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 cursor-pointer"
              >
                <FaUserCircle className="text-gray-600" />
                <span>Profile</span>
              </DropdownMenuItem>

              {/* Create Blog Option */}
              <DropdownMenuItem
                onClick={() => navigate("/create-blog")}
                className="flex items-center gap-2 cursor-pointer"
              >
                <FaPenNib className="text-gray-600" />
                <span>Create Blog</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* User Info */}
              <div className="px-3 py-2 text-sm">
                <p className="font-semibold">{user.user.name}</p>
                <p className="text-gray-500 text-xs">{user.user.email}</p>
              </div>

              <DropdownMenuSeparator />

              {/* Logout Option */}
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-500 focus:text-red-600 flex items-center gap-2 cursor-pointer"
              >
                <IoIosLogOut />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}

export default Topbar;
