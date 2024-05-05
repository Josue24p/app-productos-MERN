import {useForm} from 'react-hook-form';
import { useProduct } from '../context/ProductsContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProductsFormPage() {

  const {register, handleSubmit, setValue, } = useForm()
  const { createProduct, getProduct, updateProduct }= useProduct();
  const navigate = useNavigate()
  const params = useParams()
  const [imagePreview, setImagePreview] = useState('');
  //const imageFile = watch('imgURL') //permite observar el archivo de imagen

  /* useEffect(()=>{
    if(imageFile && imageFile.length > 0){
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImagePreview(fileReader.result);
      };
      //fileReader.readAsDataURL(imageFile[0]);
    }
  },[imageFile]) */

  //usa el useEffect para poder cargar la función, cual va devolver todos los valores de cada producto según su id, para poder editar
  useEffect(()=>{
    async function loadProduct(){
      if(params.id){
        const product = await getProduct(params.id)
        console.log(product)
        //setValue es para ver los valores
        setValue('name',product.name)
        setValue('category',product.category)
        setValue('price',product.price)
        setValue('imgURL',product.imgURL)
        //si la imagen del producto está mostrará una visualización
        if (product.imgURL) {
          setImagePreview(product.imgURL); // Asumiendo que `imgURL` es la URL de la imagen
        }
      }
    }
    loadProduct()
  },[])
  //Al momento de cambiar la url y al guardar se guarda la imagen del Url ingresada
  const handleFileChange = () =>{
    setImagePreview(imagePreview)
     //Registra el cambio en el campo 'imgURL'
  }

  //realizaré nuevos cambios mediante FormData para leer los valores
  const onSubmit = handleSubmit((data)=>{
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append( "price", data.price);
    if (data.imgURL) {
      formData.append('imgURL', data.imgURL); //Agregar el archivo de imagen al FormData
    }
   //si params id existe es porque estás creando sino editanto
    if(params.id){
      updateProduct(params.id, formData)
    }else{
      createProduct(formData)
    }
    navigate('/products')
  })

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">

    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <form onSubmit={onSubmit} encType='multipart/form-data'>
        <input type="text" placeholder="name" 
          {...register('name')}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          autoFocus
        />
        <input type="text" placeholder="category" 
          {...register('category')}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        />
        <input type="number" placeholder="price" 
          {...register('price')}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        />
        <input type="text" placeholder="imgURL" 
          {...register('imgURL')}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' onChange={handleFileChange} //Llama a la función de cambio de imagen
        />
        {/* Al momento de editar un producto, mediante este código puedo ver la imagen de esa url debajo, si cambia la url se actualiza la imagen el la lista de productos */}
        {imagePreview && (
          <img src={imagePreview} alt='Preview' className='w-full my-2'/>
        )}
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Save</button>
      </form>
    </div>
    </div>
  )
}

export default ProductsFormPage
