import { MdShoppingCart } from "react-icons/md";
import Image from 'next/image';

export const Icons = {
  cart: () => <MdShoppingCart size={24} />,
  fakeAvatar: () => (
    <Image
      priority
      width={32}
      height={32}
      src="/fakeAvatar.png"
      alt="Avatar Placeholder"
      className="rounded-md"
    />
  ),
  logo: () => (
    <Image
      priority
      width={246}
      height={43}
      src="/logo.svg"
      alt="UnderCover logo"
    />
  ),
}
