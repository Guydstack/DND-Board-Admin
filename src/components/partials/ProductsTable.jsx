import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  ButtonGroup,
  Button,
  useDisclosure,
  Box
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, AddIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ModalProduct from "../common/ModalProduct";
import { exportToExel, Toast } from "../../lib";
import {useMutation, useQueryClient} from "@tanstack/react-query"



function ProductsTable({ products }) {
  const { setProduct } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const queryClient = useQueryClient();

  // FOR REQUEST LIKE POST / DELETE / PUT

  const { mutate } = useMutation({
    mutationFn: async (id) => await axios.delete(
      `${import.meta.env.VITE_URL_BACKEND}/products/managers/delete/${id}`
    ),
    onSuccess:(res) => {
      Toast(res.data.message, true);
      queryClient.invalidateQueries('get_products')
    },
    onError: (err) => {
      Toast(err.response.data.message, false)
      console.log(err);
    }
  })

  // async function deleteProduct(id) {
  //   try {
  //     const response = await axios.delete(
  //       `http://localhost:4000/products/managers/delete/${id}`
  //     );
  //     setSendNewRequest((prev) => !prev);
  //     if (response.data.success) Toast(response.data.message, true);
  //   } catch (error) {
  //     console.log(error);
  //     Toast(error.response.data.message, false);
  //   }
  // }

  function openModalProduct(product) {
    onOpen();
    setSelectedProductId(product?._id);
    setProduct(product);
  }


  return (
  <Box>
    <Box textAlign={'right'}>
      <ButtonGroup gap={2}>
        <Button title="Export Products" type="button" onClick={() => exportToExel(products, "Products-Sheet")}>
          <ExternalLinkIcon color={"purple.500"} bgSize={30}/>
        </Button>
        <Button title="Add Product" type="button" onClick={() => openModalProduct(null)}>
          <AddIcon color={"green.500"} bgSize={30}/>
        </Button>
      </ButtonGroup>
    </Box>
    <TableContainer mt={10}>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Description</Th>
            <Th>Image</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product._id}>
              <Td>{product.product_name}</Td>
              <Td>{product.product_price}</Td>
              <Td>{product.product_description}</Td>
              <Td>
                <img
                  alt="product image"
                  src={product.product_image}
                  width="50"
                  height="50"
                />
              </Td>
              <Td>
                <ButtonGroup gap="4">
                  <Button
                    colorScheme="whiteAlpha"
                    type="button"
                    title="Delete Product"
                    onClick={() => mutate(product._id)}
                  >
                    <DeleteIcon bgSize={25} color={"red.300"} />
                  </Button>
                  <Button
                    onClick={() => openModalProduct(product)}
                    colorScheme="blackAlpha"
                    type="button"
                    title="Update Product"
                  >
                    <EditIcon bgSize={25} color={"blue.300"} />
                  </Button>
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <ModalProduct
      id={selectedProductId}
      onClose={onClose}
      isOpen={isOpen}
    />
    </TableContainer>
    </Box>
  );
}

export default ProductsTable;