"use client"
import React from "react";
import Button from "@/components/Button";

const ProductList = () => {

  return (
    <Button onClick={() =>  console.log("text")}>
      Create new product
    </Button>
  );
};

export default ProductList;