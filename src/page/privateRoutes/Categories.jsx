import { useQuery, useMutation ,useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import { Container, Heading, Spinner, Text } from "@chakra-ui/react";
import { Toast } from "../../lib";
import CategoriesTable from '../../components/partials/categories/CategoriesTable';

const url = `${import.meta.env.VITE_URL_BACKEND}/categories/managers/all`;


function Categories() {
  //request for get all Category
  const { isError, isLoading, data, error } = useQuery({
    queryKey: ["get_categories"],
    queryFn: async () => await axios.get(url),
    select: (res) => res.data.categories,
    staleTime: 1000 * 60,
  });

  return (
    <Container maxW={"container.xl"}>
      <Heading>Categories:</Heading>
      <Text>total categories: {data?.length}</Text>
      {isLoading && <Spinner size={40} color="blue.500" />}
      {isError && <span>{error.message}</span>}
      {!data && <span>No Categories</span>}

      {data && <CategoriesTable categories={data} />}
    </Container>
  );
}

export default Categories;
