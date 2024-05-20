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
  Container,
  Heading
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Toast } from "../../lib";
import Spinner from "../../hooks/Spinner";

const url = import.meta.env.VITE_CONTACT_FORMS;


function getContacts() {
  const { isError, isLoading, data, error } = useQuery({
    queryKey: ["get_contacts"],
    queryFn: async () => {
      try {
        const response = await axios.get(url);
        return response.data.contacts;
      } catch (error) {
        throw new Error(`Error fetching contacts: ${error.message}`);
      }
    },
    staleTime: 1000 * 60,
  });

  return { isError, isLoading, data, error };
}


function Contact() {
    const queryClient = useQueryClient();
      
    const { mutate } = useMutation({
      mutationFn: async (id) => await axios.delete(
        `${import.meta.env.VITE_URL_BACKEND}/contact/delete-user-form/${id}`
      ),
      onSuccess:(res) => {
        console.log(res)
        Toast(res.data.message, true);
        queryClient.invalidateQueries('get_contacts')
      },
      onError: (err) => {
          Toast(err.response.data.message, false);
          console.log(err)
      }
    })

  const { isError, isLoading, data, error } = getContacts();

  if (isLoading) return <Spinner />;

  if (isError) {
    return <div>Error: {error.message}</div>;
  }


  return (
    <Container maxW={"container.xl"}>
      <Heading>Contacts:</Heading>
      <TableContainer mt={10}>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Message</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((contact) => (
              <Tr key={contact._id}>
                <Td>{contact.name}</Td>
                <Td>{contact.email}</Td>
                <Td>{contact.message}</Td>
                <Td>
                  <ButtonGroup gap="4">
                    <Button
                      colorScheme="whiteAlpha"
                      type="button"
                      title="Delete"
                      onClick={() => mutate(contact._id)}
                    >
                      <DeleteIcon bgSize={25} color={"red.300"} />
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Contact;
