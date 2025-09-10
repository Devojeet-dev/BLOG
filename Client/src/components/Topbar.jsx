import React from "react";
import Blog from "../assets/Blog.png";
import { Link } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import { Button } from "./ui/button";
import Search from "./Search";

function Topbar() {
  return (
    <header className="fixed top-0 left-0 w-full h-14 bg-white shadow-sm z-20 flex items-center justify-between gap-4 px-4 ">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={Blog} alt="Logo" className="h-10 w-auto" />
        <span className="font-semibold text-lg">Blog Kijiye</span>
      </div>

      {/* Search bar (placeholder for now) */}
      <Search />

      {/* Sign In button */}
      <div>
        <Button asChild className="flex items-center gap-2 rounded-full px-4">
          <Link to="/Signin">
            <IoLogIn className="text-lg" />
            Sign in
          </Link>
        </Button>
      </div>
    </header>
  );
}

export default Topbar;
