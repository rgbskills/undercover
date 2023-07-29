import Layout from "@/components/Layout";
import { ServerAuthProvider } from "../../auth/server-auth-provider";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /*TODO @ts-expect-error https://github.com/vercel/next.js/issues/43537 */
  return (
    <Layout narrow>
      <ServerAuthProvider>
        {children}
      </ServerAuthProvider>
    </Layout>
  );
}
