import { useEffect } from "react";
import { useProduct } from "../context/ProductsContext";
import ProductCard from '../components/ProductCard'

function ProductsPage() {
  const { getProducts, products } = useProduct();
  //ejecutar apenas cargue el componente
  //para que cargue los productos
  useEffect(() => {
    getProducts();
  }, []);
  if(products.length === 0) return <h1>No products</h1>;
  return (
    //separación de tarjetas 
    //agregar estilos
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductsPage;
