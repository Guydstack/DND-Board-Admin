import ProductsTable from "../../components/partials/ProductsTable";
import { Container, Heading, Flex } from "@chakra-ui/react";
import Spinner from "../../hooks/Spinner";
import {useQuery} from "@tanstack/react-query"
import axios from "axios";
import Pagination from "../../components/partials/products/Pagination";
import { useState } from "react";
// const url = "http://localhost:4000/products/managers/all";


function Products() {
  
  const [page,setPage] = useState(1);
  const [limit] = useState(5);
  
  const url = `${import.meta.env.VITE_URL_BACKEND}/products/managers/all?page=${page}&limit=${limit}`;
    //Only fro get Req
    const { data, isLoading, error, isError } = useQuery({
      // queryKey:['get_products'],
      queryKey:['get_products', page],
      queryFn:async() => await axios.get(url),
      // select:(res) => res.data.products,
      select:(res) => res.data,
      staleTime:1000 * 60,
      // gcTime:1000 * 60 * 60 * 24
    });


  //Pagination client
  // const [currentPage,setCurrentPage] = useState(1);
  // const [productPerPage] = useState(3);

  // const indexOfLastProduct = currentPage * productPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  // const currentProducts = data?.slice(indexOfFirstProduct,indexOfLastProduct);

  return (
    <Container maxW={'container.xl'}>
      <Heading>Products:</Heading>
      {isLoading && <Spinner /> }
      {isError && <span>{error.message}</span>}
      {!data && <span>No products</span>}
      {/* {data && <ProductsTable products={currentProducts} />} */}
      {data && <ProductsTable products={data.products} />}
      {/* {data && <Pagination
      productPerPage={productPerPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalProducts={data.length} 
      />} */}
      {data && <Pagination setPage={setPage} pages={data.pages} currentPage={page} />}
 
    </Container>
  );
}

export default Products;
