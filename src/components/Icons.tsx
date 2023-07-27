import {
  MdShoppingCart,
  MdPerson,
  MdVisibility,
  MdVisibilityOff,
  MdFormatListBulleted,
  MdCategory,
  MdStorefront,
  MdKeyboardReturn,
  MdPlace,
  MdAccountCircle,
  MdPowerSettingsNew,
  MdGroups,
  MdShoppingBasket,
  MdMoreHoriz,
  MdAddShoppingCart,
  MdDeleteForever,
  MdAddCircle,
  MdRemoveCircle
 } from "react-icons/md";
import Image from 'next/image';

export const Icons = {
  cart: () => <MdShoppingCart size={24} />,
  show: () => <MdVisibility size={24} />,
  hide: () => <MdVisibilityOff size={24} />,
  user: () => <MdPerson size={24} />,
  orders:() => <MdFormatListBulleted size={24} />,
  categories:() => <MdCategory size={24} />,
  companies:() => <MdStorefront size={24} />,
  returns:() => <MdKeyboardReturn size={24} />,
  addresses:() => <MdPlace size={24} />,
  account:() => <MdAccountCircle size={24} />,
  logout:() => <MdPowerSettingsNew size={24} />,
  users:() => <MdGroups size={24} />,
  products:() => <MdShoppingBasket size={24} />,
  more:() => <MdMoreHoriz size={24} />,
  addtocart: () => <MdAddShoppingCart size={24} />,
  delete: () => <MdDeleteForever size={14} />,
  increment: () => <MdAddCircle size={14} />,
  decrement: () => <MdRemoveCircle size={14} />,
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
