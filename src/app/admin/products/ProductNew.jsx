"use client"
import React from "react";
import Button from "@/components/Button";
import { useLoadingCallback } from "react-loading-hook";
import { ProductsContext } from "./ProductProvider";

const ProductList = () => {
  const { addProduct } = React.useContext(ProductsContext);
  const [handleProductCreate, isProductCreateLoading] = useLoadingCallback(async () => {
    const response = await fetch("/api/products", {
      method: "POST",
    });

    const product = await response.json();
    addProduct(product);
  });

  return (
    <Button
      loading={isProductCreateLoading}
      disabled={isProductCreateLoading}
      onClick={handleProductCreate}
    >
      Create new product
    </Button>
  );
};

export default ProductList;