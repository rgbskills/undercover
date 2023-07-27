"use client"
import React from 'react'
import Image from 'next/image'
import Button from '@/components/Button';
import {Icons} from '@/components/Icons';
import { CartContext } from '@/app/shop/CartProvider';
import Dropdown from "./Dropdown";

export default function Shop() {
  const { items, count, total, incrementCartItem, decrementCartItem, clearCart, removeCartItem } = React.useContext(CartContext);
  return (
    <Dropdown
      closeOnClickInside
      text={
        <Button>
          <Icons.cart />
          <span>{count}</span>
        </Button>
      }
      className="w-64 rounded-md px-3 pt-2 pb-3"
    >
      {!count ? (
        <p className="text-center uppercase text-white text-sm my-3 font-bold">Cart is empty</p>
      ) : (
        <>
          <div className="flex justify-between mb-3 items-center">
            <h1 className="text-xs font-semibold text-white uppercase">My cart ({count})</h1>
            <Button
              unstyled
              className="text-[10px] uppercase text-red-200 font-bold hover:text-white transition-all"
              onClick={clearCart}
            >
              Clear cart
            </Button>
          </div>
          {
            items.map((item) => (
              <div key={item.id} className="flex justify-between mb-3">
                <div className='flex'>
                  <Image src={item.imageUrl} width={56} height={56} alt={item.title} className="rounded-md" />
                  <div className='flex flex-col justify-between ml-1'>
                    <h1 className="text-xs text-white">{item.title}</h1>
                    <div className='flex gap-3 items-center'>
                      <Button
                        unstyled
                        className='text-blue-900 hover:text-blue-700 transition-all'
                        onClick={() => decrementCartItem(item.id)}
                      >
                        <Icons.decrement />
                      </Button>
                      <p className='text-xs font-bold'>{item.qty}</p>
                      <Button
                        unstyled
                        className='text-blue-900 hover:text-blue-700 transition-all'
                        onClick={() => incrementCartItem(item.id)}
                      >
                        <Icons.increment />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col justify-between'>
                  <div className='text-right'>
                    <Button
                      unstyled
                      className="text-[10px] uppercase text-red-200 font-bold hover:text-white transition-all"
                      onClick={() => removeCartItem(item.id)}
                    >
                      <Icons.delete />
                    </Button>
                  </div>
                  <span className="text-xs text-green-100 font-semibold">${item.price}</span>
                </div>
              </div>
            ))
          }
          <div className='flex justify-between items-center mt-3 mb-4'>
            <span className='uppercase text-xs font-semibold'>
              Total
            </span>
            <span className='text-base text-green-100 font-semibold'>
              ${total}
            </span>
          </div>
          <Button
            unstyled
            className="flex justify-center items-center gap-3 h-12 px-6 rounded-md bg-blue-900 text-sm font-semibold hover:bg-blue-800 transition-all w-full"
          >
            Go to checkout
          </Button>
        </>
      )}

    </Dropdown>
  )
}