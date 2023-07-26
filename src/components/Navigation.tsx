"use client"
import * as React from "react";
import Link from "next/link";
import { Icons } from "@/components/Icons";
import { siteConfig } from "@/config/site";
import Button from "@/components/Button";
import { useAuth } from "@/auth/context";
import Image from 'next/image';

interface NavigationItem {
  href: string;
  title: string;
}

function Navigation() {
  const { user } = useAuth();

  return (
    <div className="flex justify-between content-center my-6">
      <div>
        <Link href="/" passHref={true} className="flex items-center space-x-2">
          <Icons.logo />
        </Link>
      </div>
      <div className="flex content-center gap-12">
        {siteConfig.navigation?.length ? (
          <nav className="flex gap-6 items-center">
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
          <Button onClick={() => console.log("Add to cart")}>
            <Icons.cart />
            <span>5</span>
          </Button>
          {/* TODO: this will fail, you also need to check te SSR auth state */}
          {!user ? (
            <Button href="/login" className="overflow-hidden">
              <Icons.user />
              <span>Login</span>
            </Button>
          ) : (
            <Button href="/account" className="overflow-hidden">
              {user.photoURL ? (
                <>
                  <span className="-ml-6">
                    <Image
                      priority
                      width={48}
                      height={48}
                      src={user.photoURL}
                      alt="username"
                    />
                  </span>
                  <span className="ml-3">{user.displayName}</span>
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