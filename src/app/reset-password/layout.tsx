import Layout from "@/components/Layout";
import { ServerAuthProvider } from "../../auth/server-auth-provider";

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout narrow>
      <ServerAuthProvider>
        {children}
      </ServerAuthProvider>
    </Layout>
    );
}
