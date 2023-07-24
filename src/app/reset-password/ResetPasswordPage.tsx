"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useFirebaseAuth } from "@/auth/firebase";
import { useLoadingCallback } from "react-loading-hook";
import { sendPasswordResetEmail } from "firebase/auth";
import Button from "@/components/Button";
import Input from "@/components/Input";

export function ResetPasswordPage() {
  const params = useSearchParams();
  const [email, setEmail] = React.useState("");
  const [isSent, setIsSent] = React.useState(false);
  const { getFirebaseAuth } = useFirebaseAuth();
  const redirect = params?.get("redirect");
  const [sendResetInstructions, loading, error] = useLoadingCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const auth = getFirebaseAuth();
      setIsSent(false);
      await sendPasswordResetEmail(auth, email);
      setEmail("");
      setIsSent(true);
    }
  );

  function getLoginUrl() {
    if (redirect) {
      return `/login?redirect=${redirect}`;
    }

    return "/login";
  }

  return (
    <div className="w-[305px] mx-auto mt-28">
      <h1 className="text-2xl text-slate-500 text-center mb-9">Reset password</h1>
      <form onSubmit={sendResetInstructions}>
        <Input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="Email address"
          label="Email address"
        />
        {isSent && (
          <p className="text-white">Instructions sent. Check your email.</p>
        )}
        {error && error?.message}
        <Button
          loading={loading}
          disabled={loading}
          type="submit"
          className="w-full justify-center mt-5 mb-10 uppercase"
        >
          Send reset instructions
        </Button>
      </form>
      <Button
        href={getLoginUrl()}
        disabled={loading}
        className="w-full justify-center uppercase"
      >Back to login</Button>
    </div>
  );
}
