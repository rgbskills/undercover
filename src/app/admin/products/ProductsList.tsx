import React from "react";
import Image from 'next/image';
import Table from "@/components/Table";
import productsData from "./products.json";

const ProductGrid = () => {
  return (
    <Table cols={["Id", "Title", "Price", "Actions"]}>
      {productsData.map((product) => (
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
          <div className="text-sm flex items-center">
            MORE ICON
          </div>
        </>
      ))}
    </Table>
  );
};

export default ProductGrid;