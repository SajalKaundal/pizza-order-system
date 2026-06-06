"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";
import passwordValidator from "./(utils)/passwordValidator";
import passwordMatching from "./(utils)/passwordMatching";

type ActionState = {
  success: boolean;
  message: string;
};

export default function Page() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isPasswordValid = passwordValidator(password);
  const isPasswordMatching = passwordMatching(password, confirmPassword);
  const signupAction = async (
    previousState: ActionState,
    formData: FormData,
  ) => {
    const signupData = Object.fromEntries(formData.entries());
    const response = await fetch("http://localhost:3000/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });
    const data = await response.json();
    if (data.success) {
      return {
        success: true,
        message: "Signup successful",
      };
    }
    return {
      success: false,
      message: "Unable to create account",
    };
  };
  const [state, formAction, pending] = useActionState(signupAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.success) {
      router.push("/login");
    }
  }, [state, router]);

  return (
    <div className="min-h-screen flex justify-center bg-white p-6">
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6">
        <form action={formAction} className="w-full max-w-md">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-zinc-700 hover:text-zinc-900"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold text-zinc-900">Create Account</h2>

            <p className="mt-2 text-zinc-500">
              Join Pizza and start ordering your favorite meals
            </p>
          </div>

          {/* Google Signup */}
          <button
            type="button"
            className="mb-6 flex h-12 w-full items-center justify-center gap-3 rounded-full border border-zinc-300 hover:bg-zinc-50"
          >
            <Image src="/google.svg" alt="Google" height={20} width={20} />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-zinc-300" />
            <span className="text-sm text-zinc-500">OR</span>
            <div className="h-px flex-1 bg-zinc-300" />
          </div>

          {/* Full Name */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-green-900"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-green-900"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Password</label>

            <input
              type="password"
              name="password"
              value={password}
              placeholder="Create a password"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-green-900"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className={`mt-2 block text-sm ${
                password.length === 0
                  ? "text-zinc-500"
                  : isPasswordValid
                    ? "text-green-600"
                    : "text-red-500"
              }`}
            >
              {password.length === 0
                ? "Password must contain 8+ characters, uppercase, lowercase and special character."
                : isPasswordValid
                  ? "✓ Password meets all requirements"
                  : "✗ Password does not meet the requirements"}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-green-900"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <span
              className={`mt-2 block text-sm ${
                confirmPassword.length === 0
                  ? "text-zinc-500"
                  : isPasswordMatching
                    ? "text-green-600"
                    : "text-red-500"
              }`}
            >
              {confirmPassword.length === 0
                ? "Please confirm your password"
                : isPasswordMatching
                  ? "✓ Passwords match"
                  : "✗ Passwords do not match"}
            </span>
          </div>

          {/* Terms */}
          <div className="mb-6 flex items-start gap-2 text-sm">
            <input type="checkbox" className="mt-1" />

            <p className="text-zinc-600">
              I agree to the{" "}
              <Link href="/terms" className="text-green-900 hover:underline">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-green-900 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="h-12 w-full rounded-full bg-green-900 font-medium text-white transition hover:bg-green-800"
          >
            Create Account
          </button>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-green-900 hover:underline"
            >
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
