import type { Metadata } from 'next';
import AccountMenu from './Menu';
import AuthWrapper from "./AuthWrapper";
import Layout from '@/components/Layout';

export const metadata: Metadata = {
  title: "Account",
  description: "This is where you manage your account, orders, and more.",
}

interface AccountLayoutProps {
  children: React.ReactNode
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <>
      <Layout wide sidebar={<AccountMenu />}>
        <AuthWrapper>
          {children}
        </AuthWrapper>
      </Layout>
    </>
  )
}
