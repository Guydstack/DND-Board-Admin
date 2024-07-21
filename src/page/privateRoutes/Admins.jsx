import { useQuery, useMutation ,useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import { Container, Heading, Spinner, Text } from "@chakra-ui/react";
import { Toast } from "../../lib";
import AdminsTable from "../../components/partials/admins/AdminsTable";

const url = `${import.meta.env.VITE_URL_BACKEND}/users/managers/getall`;


function Admins() {
  //request for get all Mangers
  const { isError, isLoading, data, error } = useQuery({
    queryKey: ["get_admins"],
    queryFn: async () => {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        const response = await axios.get(url, {headers: { Authorization: `Bearer ${token}` },withCredentials: true});
        return response.data; 
      },
    staleTime: 1000 * 60,
  });

  const managers = data?.managers ?? [];


  return (
    <Container maxW={"container.xl"}>
      <Heading>Admins:</Heading>
      {isLoading && <Spinner size={40} color="blue.500" />}
      {isError && <span>{error.message}</span>}
      {!isLoading && !isError && managers.length === 0 && <span>No Admins</span>}
      {managers.length > 0 && (
        <>
          <Text>Total admins: {managers.length}</Text>
          <AdminsTable admins={managers} />
        </>
      )}
    </Container>
  );
}

export default Admins;
