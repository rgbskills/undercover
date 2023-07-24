"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFirebaseAuth } from "@/auth/firebase";
import { useLoadingCallback } from "react-loading-hook";
import { RegisterForm } from "./RegisterForm";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile
} from "firebase/auth";
import { RegisterFormValue } from "./RegisterForm";
import Button from "@/components/Button";

export function RegisterPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [hasLogged, setHasLogged] = React.useState(false);
  const { getFirebaseAuth } = useFirebaseAuth();
  const redirect = params?.get("redirect");
  const [registerWithEmailAndPassword, isRegisterLoading, error] =
    useLoadingCallback(async ({ email, name, password }: RegisterFormValue) => {
      setHasLogged(false);
      const auth = getFirebaseAuth();
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      await updateProfile(credential.user, {
        displayName: name,
      });
      await sendEmailVerification(credential.user);
      const idTokenResult = await credential.user.getIdTokenResult();
      await fetch("/api/login", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idTokenResult.token}`,
        },
      });
      // when we create a new account, send email verification, update profile then we redirect
      setHasLogged(true);
      router.push(redirect ?? "/");
    });

  function getLoginUrl() {
    if (redirect) {
      return `/login?redirect=${redirect}`;
    }

    return "/login";
  }

  return (
    <div className="w-[305px] mx-auto mt-28">
      <h1 className="text-2xl text-slate-500 text-center mb-9">Create a new account</h1>
      {hasLogged && (
        <div>
          <span>
            Redirecting to <strong>{params?.get("redirect") || "/"}</strong>
          </span>
          Loading...
        </div>
      )}
      {!hasLogged && (
        <>
          <RegisterForm
            onSubmit={registerWithEmailAndPassword}
            loading={isRegisterLoading}
            error={error}
          />
          <Button
            href={getLoginUrl()}
            disabled={isRegisterLoading}
            className="w-full justify-center uppercase"
          >Back to login</Button>
        </>
      )}
    </div>
  );
}
