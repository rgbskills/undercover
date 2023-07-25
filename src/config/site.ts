import { Icons } from '@/components/Icons';

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "UnderCover",
  description: "We got you covered!",
  navigation: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Shop",
      href: "/shop",
    },
    {
      title: "Our Story",
      href: "/story",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
  accountMenu: [
    {
      title: "Orders",
      icon: Icons.orders,
      href: "/account/orders",
    },
    {
      title: "Returns & refunds",
      icon: Icons.returns,
      href: "/account/returns",
    },
    {
      title: "Addresses",
      icon: Icons.addresses,
      href: "/account/addresses",
    },
    {
      title: "Companies",
      icon: Icons.companies,
      href: "/account/companies",
    },
    {
      title: "Account settings",
      icon: Icons.account,
      href: "/account/settings",
    }
  ],
  adminMenu: [
    {
      title: "Orders",
      icon: Icons.orders,
      href: "/admin/orders",
    },
    {
      title: "Categories",
      icon: Icons.categories,
      href: "/admin/categories",
    },
    {
      title: "Returns & refunds",
      icon: Icons.returns,
      href: "/admin/returns",
    },
    {
      title: "Products",
      icon: Icons.products,
      href: "/admin/products",
    },
    {
      title: "Users",
      icon: Icons.users,
      href: "/admin/users",
    }
  ]
}
