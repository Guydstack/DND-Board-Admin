import { useQuery, useMutation ,useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import { Container, Heading, Text } from "@chakra-ui/react";
import OrdersTable from "../../components/partials/orders/OrdersTable";
import { Toast } from "../../lib";
import Spinner from "../../hooks/Spinner"

const url = `${import.meta.env.VITE_URL_BACKEND}/orders/managers/all`;
const editStatusUrl = `${import.meta.env.VITE_URL_BACKEND}/orders/managers/update-status`

function Orders() {

  const queryClient = useQueryClient()

  //request for get all Orders
  const { isError, isLoading, data, error } = useQuery({
    queryKey: ["get_orders"],
    queryFn: async () => await axios.get(url),
    select: (res) => res.data.orders,
    staleTime: 1000 * 60,
  });

  const { mutate } = useMutation({
    mutationFn: async (obj) =>
      await axios.put(
        `${editStatusUrl}/${obj.id}`,
        { status: obj.status }
      ),
      onError:(err) => {
        console.log(err)
        Toast(err.response.data.message, false)
      },
      onSuccess:(res) => {
        Toast(res.data.message, true);
        queryClient.invalidateQueries('get_orders')
      },
  });

  return (
    <Container maxW={"container.xl"}>
      <Heading>Orders:</Heading>
      <Text>total orders: {data?.length}</Text>
      {isLoading && <Spinner/>}
      {isError && <span>{error.message}</span>}
      {!data && <span>No Orders</span>}
      {data && <OrdersTable orders={data} mutate={mutate} />}
    </Container>
  );
}

export default Orders;
