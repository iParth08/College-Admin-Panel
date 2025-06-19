"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

const loginSchema = z.object({
  username: z.string().min(3, "Username or Student ID is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { setUserData } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post(
        "/api/auth/admin-login",
        {
          identifier: data.username,
          password: data.password,
        },
        {
          withCredentials: true, // Important if backend sets cookies
        }
      );
      if (response.status === 200) {
        console.log(response.data);

        toast.success(
          response.data.message || "Login successful! Redirecting..."
        );
        setUserData(response.data.user);
        router.push("/admin/dashboard"); // Redirect after success
      }
    } catch (error: any) {
      console.error(error);
      // Improved error handling:
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <main className="flex h-fit items-center justify-center p-4 w-[600px] mx-auto">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key="key1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
              Welcome Back!
            </h1>
            <p className="mb-8 text-center text-gray-500 text-sm">
              Enter your credentials to access your dashboard 🚀
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Username / College Mail
                </label>
                <input
                  {...register("username")}
                  className="w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  placeholder="Enter your username"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  className="w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-indigo-600 p-2 text-white hover:bg-indigo-700 transition disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
