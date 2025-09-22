import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import * as z from "zod"; // ✅ use * as z
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { RouteSignin } from "@/helper/RouteName";
import { showToast } from "@/helper/showToast";
import GoogleLogin from "@/components/GoogleLogin";
import { useDispatch } from "react-redux";
import { setUser } from "@/Redux/user.slice";

// ✅ fixed schema
const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be 8 characters long").max(30),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Password and confirm password should be the same.",
    path: ["confirmpassword"], // show error under confirm password field
  });

function SignUp() {
  const dispatch = useDispatch()
  const navigation = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showToast(data.message || "Something went wrong", "error");
        return;
      }
      dispatch(setUser(data.user))
      showToast(data.message || "Registration successful", "success");
      navigation(RouteSignin);
    } catch (error) {
      showToast(error.message, "error");
    }
  }

  return (
    <div className="flex justify-center items-center w-full">
      <Card className="w-[400px] p-10">
        <h1 className="text-2xl flex justify-center">Create your account</h1>
        <div>
          <GoogleLogin />
          <div className="relative flex items-center my-5">
            <div className="w-full border-b"></div>
            <span className="absolute left-1/2 transform -translate-x-1/2 px-2 text-sm bg-white">
              or
            </span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Name.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Email.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your Password.."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmpassword" // ✅ lowercase match schema
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your Password again.."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
            <div className="text-xl flex justify-center gap-2">
              <p>Already have an account?</p>
              <Link
                className="text-yellow-800 hover:underline"
                to={RouteSignin}
              >
                Sign In
              </Link>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default SignUp;
