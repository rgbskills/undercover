"use client";

import * as React from "react";
import { useAuth } from "@/auth/context";


interface AuthWrapperProps {
  children: React.ReactNode
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { user } = useAuth();
  if (!user) {
    return (
      <></>
    )
  }
  return children
}