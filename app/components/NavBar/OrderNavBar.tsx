"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function OrderNavBar() {
  const pathname = usePathname();
  return (
    <div className="flex  text-sm">
      <div className="flex items-center">
        <Link href={"pizzas"}>
          <input
            type="radio"
            name="options"
            id="pizzas"
            className="hidden peer"
          />
          <label
            htmlFor="pizzas"
            className={clsx(
              "cursor-pointer py-1  px-12 transition-colors duration-200 text-lg",
              {
                " font-bold border-b-2 text-green-900":
                  pathname === "/consumer/order/pizzas",
              },
            )}
          >
            Pizzas
          </label>
        </Link>
      </div>
      <div className="flex items-center">
        <Link href={"sides"}>
          <input
            type="radio"
            name="options"
            id="sides"
            className="hidden peer"
          />
          <label
            htmlFor="sides"
            className={clsx(
              "cursor-pointer py-1  px-12 transition-colors duration-200 text-lg",
              {
                " font-bold border-b-2 text-green-900":
                  pathname === "/consumer/order/sides",
              },
            )}
          >
            Sides
          </label>
        </Link>
      </div>
      <div className="flex items-center">
        <Link href={"beverages"}>
          <input
            type="radio"
            name="options"
            id="beverages"
            className="hidden peer"
          />
          <label
            htmlFor="beverages"
            className={clsx(
              "cursor-pointer py-1  px-12 transition-colors duration-200 text-lg",
              {
                " font-bold border-b-2 text-green-900":
                  pathname === "/consumer/order/beverages",
              },
            )}
          >
            Beverages
          </label>
        </Link>
      </div>
      <div className="flex items-center">
        <Link href={"desserts"}>
          <input
            type="radio"
            name="options"
            id="desserts"
            className="hidden peer"
          />
          <label
            htmlFor="desserts"
            className={clsx(
              "cursor-pointer py-1  px-12 transition-colors duration-200 text-lg",
              {
                " font-bold border-b-2 text-green-900":
                  pathname === "/consumer/order/desserts",
              },
            )}
          >
            Desserts
          </label>
        </Link>
      </div>
      <div className="flex items-center">
        <Link href={"extras"}>
          <input
            type="radio"
            name="options"
            id="extras"
            className="hidden peer"
          />
          <label
            htmlFor="extras"
            className={clsx(
              "cursor-pointer py-1  px-12 transition-colors duration-200 text-lg",
              {
                " font-bold border-b-2 text-green-900":
                  pathname === "/consumer/order/extras",
              },
            )}
          >
            Extras
          </label>
        </Link>
      </div>
    </div>
  );
}
