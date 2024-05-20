import {
    Container,
    Box,
    Button,
    Text,
  } from "@chakra-ui/react";
import InputField from "../../common/InputField";
import { useMutation , useQueryClient} from '@tanstack/react-query';
import axios from "axios";
import { Toast } from "../../../lib";

function CategoriesForm({ url , onClose , category}) {

    const queryClient = useQueryClient()

    const { mutate , isLoading , error , isError} = useMutation({
      mutationFn: async(e) => {
        e.preventDefault();
       return await axios({
        method:category ? 'PUT' : 'POST',
        url:url,
        data:{category_name:e.target.category_name.value}
      })},
      onSuccess:(res) => {
        Toast(res.data.message, true);
        onClose();
        queryClient.invalidateQueries('get_categories')
      },
      onError:(err) => {
        const message = err?.response?.data?.message;
        Toast(message, false);
        console.log(err)
     }})

  return (
    <Container>
      <Box as="form" onSubmit={(e) => mutate(e)}>
        <InputField
          name={"category_name"}
          type="text"
          isRequired={true}
          label={"Category Name"}
          value={category && category.category_name}
        />

        <Button mt={4} type="submit">
        {isLoading ? "In Proccesse..." : category ? "EDIT" : 'ADD'}
        </Button>
        <Text color={"red.500"} fontSize={"xl"}>
        {isError && error}
        </Text>
      </Box>
    </Container>
  )
}

export default CategoriesForm