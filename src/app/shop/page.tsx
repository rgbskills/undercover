import Layout from "@/components/Layout";
import ProductList from "./ProductsList";

export default async function Shop() {

  return (
    <Layout wide>
      <ProductList />
    </Layout>
  );
}