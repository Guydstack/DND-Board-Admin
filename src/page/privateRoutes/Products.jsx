import ProductsTable from "../../components/partials/ProductsTable";
import { Container, Heading, Flex } from "@chakra-ui/react";
import Spinner from "../../hooks/Spinner";
import {useQuery} from "@tanstack/react-query"
import axios from "axios";
import Pagination from "../../components/partials/products/Pagination";
import { useState } from "react";


function Products() {
  
  const [page,setPage] = useState(1);
  const [limit] = useState(5);
  
  const url = `${import.meta.env.VITE_URL_BACKEND}/products/managers/all?page=${page}&limit=${limit}`;
    //Only fro get Req
    const { data, isLoading, error, isError } = useQuery({
      queryKey:['get_products', page],
      queryFn:async() => await axios.get(url),
      select:(res) => res.data,
      staleTime:1000 * 60,
    });


  return (
    <Container maxW={'container.xl'}>
      <Heading>Products:</Heading>
      {isLoading && <Spinner /> }
      {isError && <span>{error.message}</span>}
      {!data && <span>No products</span>}
      {data && <ProductsTable products={data.products} />}
      {data && <Pagination setPage={setPage} pages={data.pages} currentPage={page} />}
 
    </Container>
  );
}

export default Products;
