"use client"
import * as React from "react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import Button from "@/components/Button";

interface NavigationItem {
  href: string;
  title: string;
}

function Navigation() {
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
          <Button href="/login" className="overflow-hidden">
            <span className="-ml-6"><Icons.fakeAvatar /></span>
            <span className="ml-3">Zoltan Benko</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navigation;