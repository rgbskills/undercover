import ProductsList from "./OrdersList";

export default async function Orders() {
  return (
    <div>
      <h1 className="text-2xl text-white mb-5">Orders</h1>
      <ProductsList />
    </div>
  );
}