import type { Metadata } from 'next';
import AccountMenu from './Menu';
import AuthWrapper from "./AuthWrapper";

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
      <div className="container grid items-center gap-6 pb-8">
        <div className="flex flex-col lg:flex-row lg:space-x-12">
          <aside className="lg:w-1/5">
            <AccountMenu />
          </aside>
          <div className="flex-1">
            <AuthWrapper>
              {children}
            </AuthWrapper>
          </div>
        </div>
      </div>
    </>
  )
}
