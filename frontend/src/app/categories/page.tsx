import { getProducts } from "@/helpers/products.helper";
import ProductList from "../../components/ProductList/ProductList";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <ProductList
      selectedCategory={null}
      category={null}
      productsList={products}
    />
  );
}
