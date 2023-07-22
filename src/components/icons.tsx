import { MdShoppingCart } from "react-icons/md";
import Image from 'next/image';

export const Icons = {
  cart: () => <MdShoppingCart size={24} />,
  fakeAvatar: () => (
    <Image
      priority
      width={48}
      height={48}
      src="/fakeAvatar.png"
      alt="Avatar Placeholder"
    />
  ),
  logo: () => (
    <Image
      priority
      width={131}
      height={51}
      src="/logo.svg"
      alt="UnderCover logo"
    />
  ),
}
