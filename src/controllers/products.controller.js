import Product from "../models/Product";

export const createProduct = async (req, res) => {
try {
    
    const {name, category, price} = req.body;
    const imgURL = req.file ? req.file.path : '';// Obtiene la ruta del archivo subido, si existe
    //console.log('ruta del archivo', imgURL) //ruta del archivo
    console.log(req.user.id)

    const newProduct = new Product({
    name,
    category,
    price,
    imgURL,
    user: req.user.id,
});

    const productSaved = await newProduct.save()

    res.status(201).json(productSaved)
} catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error al crear el producto" });
}
}

export const getProducts = async (req, res) => {
 try {
    const products = await Product.find({
        user: req.user.id
    }).populate('user')
    res.json(products)
 } catch (error) {
    console.log(error)
 }
}

export const getProductById = async (req, res) => {
   try {
    const product = await Product.findById(req.params.productId).populate('user');
    res.status(200).json(product)
   } catch (error) {
    console.log(error)
   }
}

export const updateProductById = async (req, res) => {
    try {
        const { name, category, price } = req.body;
        const updateData = {
            name,
            category,
            price
        };

        // Si hay un archivo nuevo, actualiza la ruta de la imagen
        if (req.file) {
            updateData.imgURL = req.file.path;
        }

        const updateProduct = await Product.findByIdAndUpdate(req.params.productId, updateData,{
            new : true
        })
        res.status(200).json(updateProduct)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error al actualizar el producto" });
    }
}

export const deleteProductById = async (req, res) => {
    try {
        const {productId} = req.params;
        const product = await Product.findByIdAndDelete(productId);
        if (!product) return res.status(404).json({message: 'Product not found'})
        res.status(204).json();
    } catch (error) {
        console.log(error)
    }
}