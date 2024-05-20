import { useContext, useEffect } from "react";
import FormProduct from "../components/forms/FormProduct"
import { AuthContext } from "../context/AuthContext";

const url = `${import.meta.env.VITE_URL_BACKEND}/products/managers/add`;
const method = 'POST'


function AddProduct() {

  // const { setProduct ,product} = useContext(AuthContext);
 
  // useEffect(() => {
  //   setProduct(null)
  //   },[product])
    
  return (
    <FormProduct url={url} method={method}/>  
)}

export default AddProduct