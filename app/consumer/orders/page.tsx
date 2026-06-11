"use client";

import { useAuth } from "@/app/(auth)/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OrderList from "./orderlist";

export type OrderStatus = "PENDING" | "PREPARING" | "DELIVERED" | "CANCELLED";

export type Order = {
  _id: string;
  orderId: string;
  user: string;
  items: {
    name: string;
    price: number;
    quantity: number;
    size: string;
    crust: string;
    category: string;
    image: string;
    isVeg: boolean;
  }[];
  quantity: number;
  totalAmount: number;
  status: OrderStatus;
  userInfo: {
    name: string;
    phone: string;
    address: { line1: string; city: string; pincode: string };
  };
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
};

const TABS: { label: string; value: "ALL" | OrderStatus }[] = [
  { label: "All Orders", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Preparing", value: "PREPARING" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
];

export default function OrdersPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"ALL" | OrderStatus>("ALL");

  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-4 px-4 py-4 max-w-4xl mx-auto">
          <button
            id="orders-back-btn"
            onClick={() => {
              router.back();
            }}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Go back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          {/* <div>
            <h1 className="text-lg font-bold text-gray-900">My Orders</h1>
            <p className="text-xs text-gray-400">
              {orders?.length} orders placed
            </p>
          </div> */}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-5">
        {/* Tab Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {TABS.map((tab) => {
            const count =
              tab.value === "ALL"
                // ? orders?.length
                // : orders?.filter((o) => o.status === tab.value).length;
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                id={`tab-${tab.value.toLowerCase()}`}
                onClick={() => setActiveTab(tab.value)}
                className={`flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-green-900 text-white shadow-md shadow-green-900/20"
                    : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                {tab.label}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Orders List */}
        <OrderList userId={user?._id} activeTab={activeTab} />
      </main>
    </div>
  );
}
