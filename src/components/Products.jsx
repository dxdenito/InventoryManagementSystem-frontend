import { useEffect, useState } from "react";
import api from "../api.js";
import AddProductForm from "./AddProductForm";

const Products = () =>{
    const [products, setProducts]= useState([]);
    const fetchProducts = async () =>{
        try{
            const res = await api.get("/products");
            setProducts(res.data.products);
        } catch(error){
            console.error("Error fetching Products", error)
        }
    }
    const addProduct = async ({productName,productPrice, productSku, productQty}) => {
        try{
            const product ={name:productName, price:productPrice, sku:productSku, qty: productQty}
            console.log(product)
            await api.post('/products', product )
            fetchProducts();
        } catch(error){
            console.error("Error Adding Products", error)
        }
    }
    useEffect(()=>{
        fetchProducts();
    },[])

    return(
        <div>
            <AddProductForm addProduct={addProduct}/>
            <h2>Product List</h2>
            <ul>
                {products.map((product)=>{
                    <li key={product.sku}>{product.name}</li>
                })}
            </ul>
            
        </div>
    )
}
export default Products