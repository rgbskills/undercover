"use client";

import * as React from "react";
import { useFirebaseAuth } from "@/auth/firebase";
import { useLoadingCallback } from "react-loading-hook";
import { signOut, reload } from "firebase/auth";
import Button from '@/components/Button';
import { siteConfig } from '@/config/site';
import { useAuth } from "@/auth/context";


export default function AdminMenu() {
  const { user } = useAuth();
  const { getFirebaseAuth } = useFirebaseAuth();
  const [hasLoggedOut, setHasLoggedOut] = React.useState(false);
  const [handleLogout, isLogoutLoading] = useLoadingCallback(async () => {
    const auth = getFirebaseAuth();
    await signOut(auth);
    setHasLoggedOut(true);
    await fetch("/api/logout", {
      method: "GET",
    });
    window.location.reload();
  });

  return (
    <div className="bg-blue-950 rounded-md flex flex-col overflow-hidden">
      {siteConfig.adminMenu.map((item) => (
        <div key={item.title}>
          <Button
            href={item.href}
            className="text-white text-sm flex items-center font-semibold h-12 hover:bg-blue-900 transition-all px-6"
            unstyled
          >
            <span className='mr-4'><item.icon /></span>
            {item.title}
          </Button>
        </div>
      ))}
    </div>
  )
}