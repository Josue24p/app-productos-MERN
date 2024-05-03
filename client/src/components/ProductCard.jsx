import { Link } from "react-router-dom"
import { useProduct } from "../context/ProductsContext"


function ProductCard({ product }) {
  console.log(product.imgURL)
  const {deleteProduct}= useProduct()

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      {/* Para poder poner los botones al costado del titulo */}
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="flex gap-x-2 items-center">
          <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          onClick={()=>{
            deleteProduct(product._id)
          }}>delete</button>
          <Link to={`/products/${product._id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >edit</Link>
        </div>
      </header>
      <h1 className="text-xl">{product.category}</h1>
      <h1 >{product.price}</h1>
      {product.imgURL && (
        <img src={`http://localhost:4000/api/uploads/${product.imgURL.split('\\').pop()}`} alt={product.name} className="w-full my-2"/>
      )}
      <p>Created at: {new Date(product.createdAt).toLocaleDateString()}</p>
    </div>
  )
}

export default ProductCard
