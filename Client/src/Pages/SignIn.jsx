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
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { RouteIndex, RouteSignup } from "@/helper/RouteName";
import { showToast } from "@/helper/showToast";

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be 8 characters long").max(30),
});

function Signin() {
  const navigate = useNavigate(); // ✅ useNavigate hook inside component
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        {
          method: "POST",                   // ✅ POST for login
          headers: { "Content-Type": "application/json" },
          credentials: "include",           // ✅ important for cookies & CORS
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showToast(data.message || "Something went wrong", "error");
        return;
      }

      showToast(data.message || "Login successful", "success");
      navigate(RouteIndex); // ✅ navigate after successful login
    } catch (error) {
      showToast(error.message || "Server error", "error");
    }
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Card className="w-[400px] p-10">
        <h1 className="text-2xl flex justify-center mb-6">Login into account</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

            <Button type="submit">Login</Button>

            <div className="text-xl flex justify-center gap-2 mt-4">
              <p>Don't have an account?</p>
              <Link
                className="text-yellow-800 hover:underline"
                to={RouteSignup}
              >
                Sign Up
              </Link>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default Signin;
