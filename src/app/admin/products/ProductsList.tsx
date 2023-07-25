import React from "react";
import Image from 'next/image';
import Table from "@/components/Table";
import productsData from "./products.json";
import Dropdown from "@/components/Dropdown";
import { Icons } from "@/components/Icons";
import Button from "@/components/Button";

const ProductList = () => {
  const DrpbtnStyle = "h-7 text-xs text-white uppercase font-semibold hover:bg-blue-800 w-full transition-all"

  const MoreBtn = () => (
    <div className="h-7 px-1 hover:bg-blue-950 flex items-center rounded-md transition-all mr-2">
      <Icons.more />
    </div>
  );

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