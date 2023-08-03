"use client"
import React, {useState, useEffect} from "react";
import Image from 'next/image';
import Table from "@/components/Table";
import Dropdown from "@/components/Dropdown";
import { Icons } from "@/components/Icons";
import Button from "@/components/Button";
import { useLoadingCallback } from "react-loading-hook";
import { ProductsContext } from "./ProductProvider";

const ProductList = () => {
  const { setProducts, products, updateProduct, deleteProduct } = React.useContext(ProductsContext);
  const [isLoading, setLoading] = useState(false)
  const [handleProductUpdate, isProductUpdateLoading] = useLoadingCallback(async (productId) => {
    const response = await fetch("/api/products", {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: productId }),
    });
    const product = await response.json();
    updateProduct(product);
  });

  const [handleProductDelete, isProductDeleteLoading] = useLoadingCallback(async (productId) => {
    const response = await fetch("/api/products", {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: productId }),
    });
    const deletedProductId = await response.json();
    deleteProduct(deletedProductId);
  });

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
  if (!products || !products.length) return <p>No products data</p>

  const DrpbtnStyle = "h-7 text-xs text-white uppercase font-semibold hover:bg-blue-800 w-full transition-all"

  const MoreBtn = () => (
    <div className="h-7 px-1 hover:bg-blue-950 flex items-center rounded-md transition-all mr-2">
      <Icons.more />
    </div>
  );

  return (
    <Table cols={["Id", "Title", "Price", "Actions"]} tableHeadClassName="grid grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="grid grid-cols-4 gap-6 px-6 my-5">
          <div className="text-xs flex items-center">
            {product.id}
          </div>
          <div className="text-sm flex gap-4 items-center">
            <Image
              src={product.imageUrl}
              alt={product.name}
              className="
                rounded-md
                w-9
                h-9
              "
              quality={100}
              width="36"
              height="36"
            />
            {product.name}
          </div>
          <div className="text-sm flex items-center">
            ${product.price}
          </div>
          <div className="text-sm flex items-center justify-end">
            <Dropdown button={<MoreBtn />} className="min-w-[100px] rounded-sm">
              <Button
                unstyled
                className={DrpbtnStyle}
                loading={isProductUpdateLoading}
                disabled={isProductUpdateLoading}
                onClick={() => handleProductUpdate(product.id)}
              >
                Edit
              </Button>
              <Button
                unstyled
                className={DrpbtnStyle}
                loading={isProductDeleteLoading}
                disabled={isProductDeleteLoading}
                onClick={() => handleProductDelete(product.id)}
              >
                Delete
              </Button>
            </Dropdown>
          </div>
        </div>
      ))}
    </Table>
  );
};

export default ProductList;