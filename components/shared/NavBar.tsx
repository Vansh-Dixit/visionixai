"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import { Show, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const NavBar = () => {
  const pathname = usePathname();
  return (
    <header className="header">
      <Link className="flex items-center gap-2 md:py-2" href="/">
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={180}
          height={28}
        ></Image>
      </Link>
      <nav className="flex gap-5">
        <Show when="signed-in">
          <UserButton />
          <Sheet>
            <SheetTrigger>
              <Image
                src="/assets/icons/menu.svg"
                alt="Menu"
                width={32}
                height={32}
                className="cursor-pointer"
              />
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-64">
              <ul className="header-nav_elements">
                {navLinks.map((link) => {
                  const isActive = pathname === link.route;

                  return (
                    <li
                      key={link.route}
                      className={`${
                        isActive && "gradient-text"
                      } p-18 flex whitespace-nowrap test-dark-700
                        `}
                    >
                      <Link
                        href={link.route}
                        className="sidebar-link cursor-pointer"
                      >
                        <Image
                          src={link.icon}
                          alt="logo"
                          width={24}
                          height={24}
                        />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </SheetContent>
          </Sheet>
        </Show>
        <Show when="signed-out">
          <Button asChild className="button bg-purple-gradient bg-cover">
            <Link href="/sign-in">Login</Link>
          </Button>
        </Show>
      </nav>
    </header>
  );
};

export default NavBar;
