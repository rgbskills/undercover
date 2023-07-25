import ProductsList from "./ProductsList";

export default async function Products() {
  return (
    <>
      <h1 className="text-2xl text-white mb-5">Products</h1>
      <ProductsList />
    </>
  );
}