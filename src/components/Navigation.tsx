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
                    className="uppercase text-white font-semibold text-sm"
                  >
                    {item.title}
                  </Link>
                )
            )}
          </nav>
        ) : null}
          <Button onClick={() => console.log("Add to cart")}><Icons.cart /> <span>5</span></Button>
        <div className="flex gap-6">
          <Button href="/login"><Icons.fakeAvatar /> <span>Zoltan Benko</span></Button>
        </div>
      </div>
    </div>
  );
}

export default Navigation;