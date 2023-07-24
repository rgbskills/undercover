import * as React from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { FirebaseError } from "@firebase/util";

export interface RegisterFormValue {
  email: string;
  name: string;
  password: string;
}

interface RegisterFormProps
  extends Omit<JSX.IntrinsicElements["form"], "onSubmit"> {
  loading: boolean;
  onSubmit: (value: RegisterFormValue) => void;
  error?: FirebaseError;
}
export function RegisterForm({
  loading,
  error,
  onSubmit,
  ...props
}: RegisterFormProps) {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    event.stopPropagation();

    onSubmit({
      email,
      name,
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
        <Input
          required
          value={name}
          label="Name"
          onChange={(e) => setName(e.target.value)}
          name="name"
          type="text"
          placeholder="Enter your name"
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
          Crate account
        </Button>
      </form>
    </div>
  );
}
