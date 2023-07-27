"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Button from '@/components/Button';
import {Icons} from '@/components/Icons';
import { CartContext } from '@/app/shop/CartProvider';

export default function Shop() {
  const { addCartItem } = React.useContext(CartContext);
  const [products, setProducts] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!products) return <p>No products data</p>
  return (
    <div className='grid grid-cols-3 gap-12'>
      {products.map((product) => (
        <div key={product.id}>
          <div className='relative'>
            <Image
              src={product.imageUrl}
              width={400}
              height={400}
              layout="responsive"
              alt={product.title}
              className='rounded-lg'
            />
            <div className='absolute bottom-4 right-4 flex'>
              <Button
                unstyled
                className='rounded-full bg-white w-12 h-12 flex items-center justify-center text-blue-900 hover:text-blue-700 transition-all'
                onClick={() => addCartItem(product)}
              >
                <Icons.addtocart />
              </Button>
            </div>
          </div>
          <div className='flex justify-between items-center text-white mt-2'>
            <h2 className='text-base font-semibold'>{product.title}</h2>
            <h3 className='text-2xl text-green-100'>${product.price}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}