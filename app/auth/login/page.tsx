"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex justify-center bg-white">
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6">
        <form className="w-full max-w-md">
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
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-green-900"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Password</label>

            <input
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
          <button className="h-12 w-full rounded-full bg-green-900 font-medium text-white transition hover:bg-green-800">
            Log In
          </button>
          <p className="mt-6 text-center text-sm text-zinc-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
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
