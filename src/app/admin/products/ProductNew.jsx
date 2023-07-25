"use client"
import React from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useLoadingCallback } from "react-loading-hook";
import { ProductsContext } from "./ProductProvider";

const ProductList = () => {
  const router = useRouter();
  const { addProduct } = React.useContext(ProductsContext);
  const [handleIncrementCounterApi, isIncrementCounterApiLoading] = useLoadingCallback(async () => {
    const response = await fetch("/api/products", {
      method: "POST",
    });

    const product = await response.json();
    addProduct(product);
  });

  return (
    <Button
      loading={isIncrementCounterApiLoading}
      disabled={isIncrementCounterApiLoading}
      onClick={handleIncrementCounterApi}
    >
      Create new product
    </Button>
  );
};

export default ProductList;