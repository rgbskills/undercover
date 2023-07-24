import * as React from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { FirebaseError } from "@firebase/util";

export interface LoginFormValue {
  email: string;
  password: string;
}

interface LoginFormProps
  extends Omit<JSX.IntrinsicElements["form"], "onSubmit"> {
  loading: boolean;
  onSubmit: (value: LoginFormValue) => void;
  error?: FirebaseError;
}
export function LoginForm({
  loading,
  error,
  onSubmit,
  ...props
}: LoginFormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    event.stopPropagation();

    onSubmit({
      email,
      password,
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} {...props}>
        <Input
          required
          value={email}
          label="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="Enter your e-mail"
        />
        <div>
          <Input
            required
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            minLength={8}
          />
        </div>
        {error && <span>{error.message}</span>}
        <Button
          className="w-full justify-center mt-5 mb-10 uppercase"
          loading={loading}
          disabled={loading}
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
