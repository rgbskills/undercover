"use client"
import * as React from "react";
import Link from "next/link";
import { Icons } from "@/components/Icons";
import { siteConfig } from "@/config/site";
import Button from "@/components/Button";
import { useAuth } from "@/auth/context";
import Image from 'next/image';
import CartDropdown from "@/components/CartDropdown";
import { usePathname } from 'next/navigation'
import Dropdown from "./Dropdown";

interface NavigationItem {
  href: string;
  title: string;
}

function Navigation() {
  const pathname = usePathname()
  const { user } = useAuth();

  return (
    <div className={`flex justify-between content-center mt-6 ${pathname === "/" ? "mb-6" : "mb-16"} mx-5`}>
      <div>
        <Link href="/" passHref={true} className="flex items-center space-x-2">
          <span className="hidden md:block">
            <Icons.logo />
          </span>
          <span className="md:hidden">
            <Icons.logosmall />
          </span>
        </Link>
      </div>
      <div className="flex content-center md:gap-12 gap-6">
        <Dropdown
          button={
            <Button className="md:hidden"><Icons.hamislife/></Button>
          }
          className="w-32 rounded-md px-3 pt-2 pb-3"
        >
          {siteConfig.navigation?.length ? (
            <nav className="flex flex-col gap-6 items-center">
              {siteConfig.navigation.map(
                (item: NavigationItem, index: number) =>
                  item.href && (
                    <Link
                      key={index}
                      href={item.href}
                      passHref={true}
                      className="uppercase text-blue-100 hover:text-white font-semibold text-sm"
                    >
                      {item.title}
                    </Link>
                  )
              )}
            </nav>
          ) : null}
        </Dropdown>
        {siteConfig.navigation?.length ? (
          <nav className="md:flex gap-6 items-center hidden">
            {siteConfig.navigation.map(
              (item: NavigationItem, index: number) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    passHref={true}
                    className="uppercase text-blue-100 hover:text-white font-semibold text-sm"
                  >
                    {item.title}
                  </Link>
                )
            )}
          </nav>
        ) : null}
        <div className="flex gap-6">
          <CartDropdown />
          {/* TODO: this will fail, you also need to check te SSR auth state */}
          {!user ? (
            <Button href="/login" className="overflow-hidden">
              <Icons.user />
              <span>Login</span>
            </Button>
          ) : (
            <Button href="/account" className="overflow-hidden relative">
              {user.photoURL ? (
                <>
                  <span className="lg:-ml-6">
                    <Image
                      priority
                      width={48}
                      height={48}
                      src={user.photoURL}
                      alt="username"
                      className="h-auto w-auto absolute top-0 left-0 lg:relative lg:top-auto lg:left-auto"
                    />
                  </span>
                  <span className="ml-3 hidden lg:block">{user.displayName}</span>
                </>
              ) : user.displayName}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;