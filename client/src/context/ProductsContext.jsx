import { createContext, useContext, useState } from "react";
import { createProductRequest, deleteProductsRequest, getProductRequest, getProductsRequest, updateProductsRequest } from '../api/product';
import React from 'react'
const ProductContext = createContext();

export const useProduct = () => {
    const context = useContext(ProductContext)

    if (!context) {
        throw new Error("useProduct must be used within a ProductProvider");
    }
    return context;
}

export function ProductProvider({ children }) {

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const res = await getProductsRequest()
            setProducts(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    const createProduct = async (product) => {
        const res = await createProductRequest(product)
        console.log(res.data)
    }

    const deleteProduct = async (id) => {
        try {
            const res = await deleteProductsRequest(id)
            if (res.status === 204) setProducts(products.filter(product => product._id != id))
        } catch (error) {
            console.log(error)
        }
    }

    const getProduct = async (id)  => {
        try {
            const res = await getProductRequest(id)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const updateProduct = async (id, product) =>{
        try {
            const res = await updateProductsRequest(id, product)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <ProductContext.Provider
            value={{
                products,
                createProduct,
                getProducts,
                deleteProduct,
                getProduct,
                updateProduct
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}