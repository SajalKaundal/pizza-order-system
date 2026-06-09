"use client";

import { useState } from "react";

type OrderStatus = "PENDING" | "PREPARING" | "DELIVERED" | "CANCELLED";

type Order = {
  id: string;
  customer: string;
  phone: string;
  items: { name: string; qty: number; size: string }[];
  total: number;
  status: OrderStatus;
  payment: string;
  date: string;
  time: string;
};

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; bg: string; text: string; dot: string }
> = {
  PENDING: { label: "Pending", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-400" },
  PREPARING: { label: "Preparing", bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-400" },
  DELIVERED: { label: "Delivered", bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  CANCELLED: { label: "Cancelled", bg: "bg-red-50", text: "text-red-600", dot: "bg-red-400" },
};

const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    id: "orders",
    label: "Orders",
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    id: "menu",
    label: "Menu",
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: "EC2EDB",
    customer: "Sajal Kaundal",
    phone: "8219967998",
    items: [{ name: "Chicken Florentine", qty: 1, size: "Small" }],
    total: 282,
    status: "PENDING",
    payment: "COD",
    date: "08 Jun 2026",
    time: "12:43 PM",
  },
  {
    id: "EC2EDD",
    customer: "Priya Sharma",
    phone: "9876543210",
    items: [
      { name: "Chicken BBQ", qty: 1, size: "Medium" },
      { name: "Chicken Florentine", qty: 1, size: "Small" },
      { name: "Chicken Hawaiian", qty: 1, size: "Medium" },
    ],
    total: 816,
    status: "PREPARING",
    payment: "COD",
    date: "08 Jun 2026",
    time: "12:45 PM",
  },
  {
    id: "EC2EDF",
    customer: "Rahul Mehta",
    phone: "9988776655",
    items: [
      { name: "Chicken BBQ", qty: 2, size: "Large" },
      { name: "Chicken Hawaiian", qty: 1, size: "Small" },
    ],
    total: 816,
    status: "DELIVERED",
    payment: "COD",
    date: "08 Jun 2026",
    time: "11:17 AM",
  },
  {
    id: "EC2EE1",
    customer: "Ananya Gupta",
    phone: "7654321098",
    items: [{ name: "Margherita", qty: 2, size: "Large" }],
    total: 598,
    status: "PENDING",
    payment: "COD",
    date: "08 Jun 2026",
    time: "01:02 PM",
  },
  {
    id: "EC2EE3",
    customer: "Vikram Singh",
    phone: "8899001122",
    items: [{ name: "Pepperoni", qty: 1, size: "Medium" }],
    total: 349,
    status: "CANCELLED",
    payment: "COD",
    date: "08 Jun 2026",
    time: "10:30 AM",
  },
];

const TOP_ITEMS = [
  { name: "Chicken BBQ", orders: 48, pct: 100 },
  { name: "Chicken Florentine", orders: 41, pct: 85 },
  { name: "Chicken Hawaiian", orders: 36, pct: 75 },
  { name: "Margherita", orders: 29, pct: 60 },
  { name: "Pepperoni", orders: 22, pct: 46 },
];

export default function AdminPage() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [filterStatus, setFilterStatus] = useState<"ALL" | OrderStatus>("ALL");

  function updateStatus(id: string, status: OrderStatus) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  const totalRevenue = orders
    .filter((o) => o.status === "DELIVERED")
    .reduce((s, o) => s + o.total, 0);
  const pendingCount = orders.filter((o) => o.status === "PENDING").length;
  const preparingCount = orders.filter((o) => o.status === "PREPARING").length;
  const deliveredCount = orders.filter((o) => o.status === "DELIVERED").length;

  const filteredOrders =
    filterStatus === "ALL" ? orders : orders.filter((o) => o.status === filterStatus);

  const STATS = [
    {
      label: "Total Orders",
      value: orders.length,
      sub: "All time",
      color: "bg-indigo-50 text-indigo-600",
      icon: (
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      label: "Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      sub: "Delivered only",
      color: "bg-green-50 text-green-700",
      icon: (
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Pending",
      value: pendingCount,
      sub: "Awaiting action",
      color: "bg-amber-50 text-amber-600",
      icon: (
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Delivered Today",
      value: deliveredCount,
      sub: "Completed",
      color: "bg-emerald-50 text-emerald-600",
      icon: (
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-green-900 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-green-800">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
            <svg className="size-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
          </div>
          <div>
            <p className="text-white font-bold text-base leading-tight">Pizza Admin</p>
            <p className="text-green-300 text-xs">Control Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              id={`admin-nav-${item.id}`}
              onClick={() => { setActiveNav(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeNav === item.id
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-green-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
              {item.id === "orders" && pendingCount > 0 && (
                <span className="ml-auto bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Admin badge */}
        <div className="px-4 py-4 border-t border-green-800">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs">
              A
            </div>
            <div>
              <p className="text-white text-xs font-semibold">Admin</p>
              <p className="text-green-300 text-[10px]">admin@pizza.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <button
                id="admin-sidebar-toggle"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <svg className="size-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                </svg>
              </button>
              <div>
                <h1 className="text-lg font-bold text-gray-900 capitalize">{activeNav}</h1>
                <p className="text-xs text-gray-400">
                  {new Date().toLocaleDateString("en-IN", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Notification Bell */}
              <button className="relative w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <svg className="size-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
                {pendingCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                    {pendingCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-4 md:p-6 space-y-6">

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm font-semibold text-gray-600 mt-0.5">{stat.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Orders Table + Top Items */}
          <div className="grid lg:grid-cols-[1fr_300px] gap-6">
            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Table Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                <h2 className="font-bold text-gray-900">Recent Orders</h2>
                <div className="flex gap-2 overflow-x-auto">
                  {(["ALL", "PENDING", "PREPARING", "DELIVERED", "CANCELLED"] as const).map((s) => (
                    <button
                      key={s}
                      id={`admin-filter-${s.toLowerCase()}`}
                      onClick={() => setFilterStatus(s)}
                      className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        filterStatus === s
                          ? "bg-green-900 text-white"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {s === "ALL" ? "All" : STATUS_CONFIG[s].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wide">
                      <th className="text-left px-5 py-3 font-semibold">Order</th>
                      <th className="text-left px-4 py-3 font-semibold">Customer</th>
                      <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Items</th>
                      <th className="text-left px-4 py-3 font-semibold">Total</th>
                      <th className="text-left px-4 py-3 font-semibold">Status</th>
                      <th className="text-left px-4 py-3 font-semibold">Update</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredOrders.map((order) => {
                      const cfg = STATUS_CONFIG[order.status];
                      return (
                        <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-5 py-4">
                            <p className="font-bold text-gray-900">#{order.id}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{order.time}</p>
                          </td>
                          <td className="px-4 py-4">
                            <p className="font-semibold text-gray-800">{order.customer}</p>
                            <p className="text-xs text-gray-400">{order.phone}</p>
                          </td>
                          <td className="px-4 py-4 hidden md:table-cell">
                            <div className="space-y-0.5">
                              {order.items.map((item, idx) => (
                                <p key={idx} className="text-xs text-gray-600">
                                  {item.name}
                                  <span className="text-gray-400 ml-1">
                                    {item.size} ×{item.qty}
                                  </span>
                                </p>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <p className="font-bold text-gray-900">₹{order.total}</p>
                            <p className="text-xs text-gray-400">{order.payment}</p>
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                              {cfg.label}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <select
                              id={`status-select-${order.id}`}
                              value={order.status}
                              onChange={(e) =>
                                updateStatus(order.id, e.target.value as OrderStatus)
                              }
                              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700/20 cursor-pointer"
                            >
                              <option value="PENDING">Pending</option>
                              <option value="PREPARING">Preparing</option>
                              <option value="DELIVERED">Delivered</option>
                              <option value="CANCELLED">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {filteredOrders.length === 0 && (
                  <div className="flex flex-col items-center py-12 text-gray-400">
                    <svg className="size-10 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="text-sm font-medium">No orders found</p>
                  </div>
                )}
              </div>
            </div>

            {/* Top Items Panel */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-50">
                <h2 className="font-bold text-gray-900">Top Selling Items</h2>
                <p className="text-xs text-gray-400 mt-0.5">Based on order count</p>
              </div>
              <div className="px-5 py-4 space-y-4">
                {TOP_ITEMS.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-400 w-4">{idx + 1}</span>
                        <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                      </div>
                      <span className="text-xs font-bold text-gray-600">{item.orders}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-green-900 transition-all duration-700"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Summary */}
              <div className="mx-5 mb-5 p-4 rounded-xl bg-green-50 border border-green-100">
                <p className="text-xs font-semibold text-green-800 mb-1">Today&apos;s Summary</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="text-center">
                    <p className="text-xl font-bold text-green-900">{preparingCount}</p>
                    <p className="text-xs text-green-700">In Kitchen</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-green-900">{deliveredCount}</p>
                    <p className="text-xs text-green-700">Delivered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
