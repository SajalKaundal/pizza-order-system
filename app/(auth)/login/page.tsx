"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useActionState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

type ActionState = {
  success: boolean;
  message: string;
};

export default function Page() {
  const router = useRouter();
  const loginAction = async (
    previousState: ActionState,
    formData: FormData,
  ) => {
    const loginData = Object.fromEntries(formData.entries());

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (data.success) {
      return { success: true, message: "Successfull login", user: data.user };
    }
    return { success: false, message: "unable to login" };
  };

  const [state, formAction, pending] = useActionState(loginAction, {
    success: false,
    message: "",
  });
  const { login } =  useAuth();
  useEffect(() => {
    if (state.success) {
      router.push("/consumer");
      login(state.user);
    }
  },[router,state]);
  return (
    <div className="min-h-screen flex justify-center bg-white">
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6">
        <form action={formAction} className="w-full max-w-md">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-zinc-700 hover:text-zinc-900"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold text-zinc-900">Welcome Back</h2>

            <p className="mt-2 text-zinc-500">Sign in to your Pizza account</p>
          </div>
          <button
            type="button"
            className="mb-6 flex h-12 w-full items-center justify-center gap-3 rounded-full border border-zinc-300 hover:bg-zinc-50"
          >
            <Image src="/google.svg" alt="Google" height={20} width={20} />
            Continue with Google
          </button>
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-zinc-300" />
            <span className="text-sm text-zinc-500">OR</span>
            <div className="h-px flex-1 bg-zinc-300" />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-green-900"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Password</label>

            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-green-900"
            />
          </div>
          <div className="mb-6 flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" />
              Remember me
            </label>

            <button
              type="button"
              className="text-sm text-green-900 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
          <button
            type="submit"
            className="h-12 w-full rounded-full bg-green-900 font-medium text-white transition hover:bg-green-800"
          >
            Log In
          </button>
          <p className="mt-6 text-center text-sm text-zinc-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-green-900 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
