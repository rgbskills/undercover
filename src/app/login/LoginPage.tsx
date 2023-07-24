"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFirebaseAuth } from "@/auth/firebase";
import { useLoadingCallback } from "react-loading-hook";
import { getGoogleProvider, loginWithProvider } from "./firebase";
import Button from "@/components/Button";
import { LoginForm } from "./LoginForm";
import { LoginFormValue } from "./LoginForm";
import { signInWithEmailAndPassword } from "firebase/auth";

export function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [hasLogged, setHasLogged] = React.useState(false);
  const { getFirebaseAuth } = useFirebaseAuth();
  const redirect = params?.get("redirect");

  const [handleLoginWithEmailAndPassword, isEmailLoading, error] =
    useLoadingCallback(async ({ email, password }: LoginFormValue) => {
      setHasLogged(false);
      const auth = getFirebaseAuth();
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idTokenResult = await credential.user.getIdTokenResult();
      await fetch("/api/login", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idTokenResult.token}`,
        },
      });
      setHasLogged(true);
      router.push(redirect ?? "/");
    });

  const [handleLoginWithGoogle, isGoogleLoading] = useLoadingCallback(
    async () => {
      setHasLogged(false);
      const auth = getFirebaseAuth();
      const user = await loginWithProvider(auth, getGoogleProvider(auth));
      const idTokenResult = await user.getIdTokenResult();
      await fetch("/api/login", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idTokenResult.token}`,
        },
      });
      setHasLogged(true);
      router.push(redirect ?? "/");
    }
  );

  function passRedirectParam(url: string) {
    if (redirect) {
      return `${url}?redirect=${redirect}`;
    }

    return url;
  }

  return (
    <div className="w-[305px] mx-auto mt-28">
      <h1 className="text-2xl text-slate-500 text-center mb-9">Welcome back!</h1>
      {hasLogged && (
        <div>
          <span>
            Redirecting to <strong>{redirect || "/"}</strong>
          </span>
          Loading...
        </div>
      )}
      {!hasLogged && (
        <>
          <LoginForm
            loading={isEmailLoading}
            onSubmit={handleLoginWithEmailAndPassword}
            error={error}
          />
          <Button className="w-full justify-center mb-5 uppercase" href={passRedirectParam("/reset-password")}>Reset password</Button>
          <Button className="w-full justify-center mb-5 uppercase" href={passRedirectParam("/register")}>Register</Button>
          <Button
            className="w-full justify-center uppercase"
            loading={isGoogleLoading}
            disabled={isGoogleLoading}
            onClick={handleLoginWithGoogle}
          >
            Log in with Google
          </Button>
        </>
      )}
    </div>
  );
}
