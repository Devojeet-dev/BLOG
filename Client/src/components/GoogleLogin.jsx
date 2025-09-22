import React from "react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { provider, auth } from "@/helper/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getEnv } from "@/helper/getEnv";
import { showToast } from "@/helper/showToast";
import { RouteIndex } from "@/helper/RouteName";
import { useDispatch } from "react-redux";
import { setUser } from "@/Redux/user.slice";


function GoogleLogin() {
  const dispatch = useDispatch()

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // 🔹 Step 1: Google sign-in
      const googleResponse = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = googleResponse.user;

      const User = {
        name: displayName,
        email,
        avatar: photoURL,
      };

      // 🔹 Step 2: Send user info to your backend
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/googlelogin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // keep cookies/session
          body: JSON.stringify(User),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return showToast(data.message || "Something went wrong", "error");
        
      }

      // 🔹 Step 3: Handle success
      dispatch(setUser(data.user))
      showToast(data.message || "Login successful", "success");
      navigate(RouteIndex);
    } catch (error) {
      showToast(error.message || "Server error", "error");
    }
  };

  return (
    <div className="text-center">
      <Button variant="outline" onClick={handleLogin}>
        <FcGoogle />
        <span className="ml-2">Sign in with Google</span>
      </Button>
    </div>
  );
}

export default GoogleLogin;
