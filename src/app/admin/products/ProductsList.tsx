"use client"
import React, {useState, useEffect} from "react";
import Image from 'next/image';
import Table from "@/components/Table";
import Dropdown from "@/components/Dropdown";
import { Icons } from "@/components/Icons";
import Button from "@/components/Button";
import { ProductsContext } from "./ProductProvider";

const ProductList = () => {
  const { setProducts, products } = React.useContext(ProductsContext);
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

  const DrpbtnStyle = "h-7 text-xs text-white uppercase font-semibold hover:bg-blue-800 w-full transition-all"
  const MoreBtn = () => (
    <div className="h-7 px-1 hover:bg-blue-950 flex items-center rounded-md transition-all mr-2">
      <Icons.more />
    </div>
  );

  return (
    <Table cols={["Id", "Title", "Price", "Actions"]}>
      {products.map((product) => (
        <>
          <div className="text-xs flex items-center">
            {product.id}
          </div>
          <div className="text-sm flex gap-4 items-center">
            <Image src={product.imageUrl} alt={product.title} width={36} height={36} className="rounded-md" />
            {product.title}
          </div>
          <div className="text-sm flex items-center">
            ${product.price}
          </div>
          <div className="text-sm flex items-center justify-end">
            <Dropdown text={<MoreBtn />} className="min-w-[100px]">
              <Button
                unstyled
                className={DrpbtnStyle}
              >Edit</Button>
              <Button
                unstyled
                className={DrpbtnStyle}
              >Delete</Button>
            </Dropdown>
          </div>
        </>
      ))}
    </Table>
  );
};

export default ProductList;