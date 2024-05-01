import {useForm} from 'react-hook-form';
import { useProduct } from '../context/ProductsContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function ProductsFormPage() {

  const {register, handleSubmit, setValue} = useForm()
  const { createProduct, getProduct, updateProduct }= useProduct();
  const navigate = useNavigate()
  const params = useParams()
  
  useEffect(()=>{
    async function loadProduct(){
      if(params.id){
        const product = await getProduct(params.id)
        console.log(product)
        setValue('name',product.name)
        setValue('category',product.category)
        setValue('price',product.price)
        setValue('imgURL',product.imgURL)
      }
    }
    loadProduct()
  },[])

  const onSubmit = handleSubmit((data)=>{
    
   //si params id existe es porque estás creando sino editanto
    if(params.id){
      updateProduct(params.id, data)
    }else{
      createProduct(data)
    }
    navigate('/products')
  })

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">

    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="name" 
          {...register('name')}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          autoFocus
        />
        <input type="text" placeholder="category" 
          {...register('category')}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          autoFocus
        />
        <input type="number" placeholder="price" 
          {...register('price')}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          autoFocus
        />
        <input type="text" placeholder="imgURL" 
          {...register('imgURL')}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          autoFocus
        />
        <button>Save</button>
      </form>
    </div>
    </div>
  )
}

export default ProductsFormPage
