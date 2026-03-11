"use client";

import { navLinks } from "@/constants";
import { useAuth, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const SideBar = () => {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={120}
            height={32}
          />
        </Link>

        <nav className="sidebar-nav flex">
          {isSignedIn ? (
            <>
              <ul className="sidebar-nav_elements">
                {navLinks.slice(0, 6).map((link) => {
                  const isActive = pathname === link.route;

                  return (
                    <li
                      key={link.route}
                      className={`sidebar-nav_element group ${
                        isActive
                          ? "bg-purple-gradient text-white"
                          : "text-gray-700"
                      }`}
                    >
                      <Link href={link.route} className="sidebar-link">
                        <Image
                          src={link.icon}
                          alt="logo"
                          width={24}
                          height={24}
                          className={`${isActive && "brightness-200"}`}
                        />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <ul className="sidebar-nav_elements">
                {navLinks.slice(6).map((link) => {
                  const isActive = pathname === link.route;

                  return (
                    <li
                      key={link.route}
                      className={`sidebar-nav_element group ${
                        isActive
                          ? "bg-purple-gradient text-white"
                          : "text-gray-700"
                      }`}
                    >
                      <Link href={link.route} className="sidebar-link">
                        <Image
                          src={link.icon}
                          alt="logo"
                          width={24}
                          height={24}
                          className={`${isActive && "brightness-200"}`}
                        />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
                <li className="flex-center cursor-pointer gap-4 p-4">
                  <UserButton showName />
                </li>
              </ul>
            </>
          ) : (
            <Button asChild className="button bg-purple-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
