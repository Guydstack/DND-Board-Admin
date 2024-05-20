import {
  Container,
  Box,
  Button,
  Text,
  Textarea,
  FormLabel
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useRef, useContext, useEffect } from "react";
import InputField from "../common/InputField";
import { AuthContext } from "../../context/AuthContext";
import {useMutation, useQueryClient} from "@tanstack/react-query"
import { Toast } from "../../lib";
import SelectCategory from "../partials/products/SelectCategory";
//אם יש לכם טופס שמכיל קובץ - שולחים פורמט form-data
//אם אין לכם טופס שמכיל קובץ - שולחחם json



//handle forms
function FormProduct({ url, method, onClose }) {
  const { product, setProduct } = useContext(AuthContext);
  const [productImage, setProductImage] = useState(product ? product.product_image : '');
  const categories = product ? [...product.categories] : [];
  const [chosenCategories, setChosenCategories] = useState(categories);

  
  const form = useRef();

  const queryClient = useQueryClient();


  const { mutate, isLoading, error, isError } = useMutation({
    mutationFn: (e) => handleSubmit(e),
    onSuccess:(res) => {
      Toast(res.data.message,true);
      onClose();
      form.current.reset();
      queryClient.invalidateQueries('get_products')
    },
    onError:(err) => {
      const message = err?.response?.data?.message;
      Toast(message, false);
      console.log(err);
    }
  });

useEffect(() => {
  setProduct(null)
  },[product])


  //async state managment
  async function handleSubmit(e) {
    const formData = new FormData(form.current);
    formData.append("product_image", productImage);
    formData.append("categories",JSON.stringify(chosenCategories))
      e.preventDefault();
      return await axios({
        url: url,
        method: method,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  }

  // async function handleSubmit(e) {
  //   const formData = new FormData(form.current);
  //   formData.append("product_image", productImage);
   
  //   try {
  //     e.preventDefault();
  //     setIsLoading(true);
  //     const response = await axios({
  //       url: url,
  //       method: method,
  //       data: formData,
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     const data = response.data;
  //     if (data.success) {
  //       triggerTost(data.message,true)
  //       setError("");
  //       onClose();
  //       setSendNewRequest((prev) => !prev);
  //       form.current.reset();
  //     }
  //   } catch (error) {
  //     const message = error.response.data.message;
  //     setError(message);
  //     triggerTost(message,false)
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  return (
    <Container>
      <Box as="form" ref={form} onSubmit={(e) => mutate(e)}>
        
        <InputField 
        name={"product_name"}
        type="text"
        isRequired={true}
        label={"Product Name"}
        // defaultValue={values ? values[0] : ''}
        value={product && product?.product_name}
        />
        
        <>
          <FormLabel marginTop={5} htmlFor="product_description">Product Description</FormLabel>
          <Textarea 
          textAlign={"right"}
          name={"product_description"}
          type="text"
          isRequired={false}
          label={"Product Description"}
          value={product && product?.product_description}
          />
        </>


        <InputField 
        name={"product_price"}
        type="number"
        isRequired={true}
        label={"Product Price"}
        value={product && product?.product_price}
        />

        <InputField 
        name={"product_image"}
        type="file"
        isRequired={false}
        label={"Product Image"}
        />

        <SelectCategory
          setChosenCategories={setChosenCategories}
          chosenCategories={chosenCategories}
        />

        <Button mt={4} type="submit">
          {isLoading ? "In Proccesse..." : method === 'POST' ? "CREATE" : "UPDATE"}
        </Button>
        <Text color={"red.500"} fontSize={"xl"}>
          {isError && error}
        </Text>
      </Box>
    </Container>
  );
}

export default FormProduct;


