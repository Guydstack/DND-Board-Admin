import {
    Container,
    Divider,
    HStack,
    Heading,
    Table,
    Text,
    Tbody,
    Td,
    Tr,
    Th,
    Thead,
    Image,
    Box,
    Select,
    Button
  } from "@chakra-ui/react";
  import { DeleteIcon } from "@chakra-ui/icons";
  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import axios from "axios";
  import { Toast } from "../../../lib";
  
  
  function OrderDetails({ onClose, order , mutate }) {
  
    const total = order?.products.reduce((total,product) => {
         return total + (product.quantity * product.RTP)
    },0);
  
    const queryClient = useQueryClient();
    //delete products
    const { mutate: mutateDelete } = useMutation({
      mutationFn: async (id) =>
        await axios.delete(
          `${import.meta.env.VITE_URL_BACKEND}/orders/managers/delete-order/${id}`
        ),
      onSuccess: (res) => {
        Toast(res.data.message, true);
        queryClient.invalidateQueries("get_orders");
        onClose();
      },
      onError: (err) => {
        Toast(err.response.data.message, false);
        console.log(err);
      },
    });
  
    return (
      <Container maxW={"container.xl"}>
        <Divider />
        <HStack my={5}>
          <Heading>Customer Details :</Heading>
          <Text>Name: {order?.customer_details?.customer_name}</Text>
          <Text>Phone: {order?.customer_details?.customer_phone}</Text>
          <Text>
            Address : {order?.customer_details?.customer_address.street}{" "}
            {order?.customer_details?.customer_address.building}{" "}
            {order?.customer_details?.customer_address.city}
          </Text>
        </HStack>
        <Divider />
        <Heading my={5}>Products:</Heading>
        <Divider />
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>name</Th>
              <Th>quantity</Th>
              <Th>unit price</Th>
              <Th>total price</Th>
              <Th>Image</Th>
            </Tr>
          </Thead>
          <Tbody>
            {order?.products?.map((product) => (
              <Tr key={product?.product?._id}>
                <Td>{product.product.product_name}</Td>
                <Td>{product.quantity}</Td>
                <Td>{product.RTP}$</Td>
                <Td>{product.quantity * product.RTP}</Td>
                <Td>
                  <Image
                    boxSize="50"
                    objectFit="cover"
                    src={product?.product?.product_image}
                    alt={product?.product?.product_name}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Heading my={15} size={"sm"}>
          Total: {total}
        </Heading>
        <Divider />
        <Heading my={15} size={"sm"}>
          Payment Details:{" "}
        </Heading>
        <Divider />
        <Box my={5}>
          <Text>terminal number - {order?.payment_details?.terminal_number}</Text>
          <Text>
            transaction number - {order?.payment_details?.transaction_number}
          </Text>
          <Text>
            transaction date - {order?.payment_details?.transaction_date}
          </Text>
          <Text>
            last digits - XXXX-XXXX-XXXX-{order?.payment_details?.last_digits}
          </Text>
        </Box>
        <HStack spacing={10} justifyContent={'center'} padding={15} my={25}>
          <Select
            value={order.status}
            bg={
              order.status === 1
                ? "yellow.500"
                : order.status === 2
                ? "purple.500"
                : order.status === 3
                ? "green.500"
                : "blackAlpha.500"
            }
            onChange={(e) =>
              mutate({
                id: order._id,
                status: e.target.value,
              })
            }
          >
            <option value="1">New</option>
            <option value="2">Processing</option>
            <option value="3">Done</option>
            <option value="4">Canceled</option>
          </Select>
          <Button colorScheme="red" onClick={() => mutateDelete(order._id)} title="DELETE ORDER">
       <DeleteIcon />
          </Button>
        </HStack>
      </Container>
    );
  }
  
  export default OrderDetails;
  