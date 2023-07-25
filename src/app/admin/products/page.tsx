import ProductsList from "./ProductsList";
import ProductNew from "./ProductNew";

export default async function Products() {
  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl text-white">Products</h1>
        <ProductNew />
      </div>
      <ProductsList />
    </>
  );
}