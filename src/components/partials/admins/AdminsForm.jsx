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

function AdminsForm({ url , onClose , admin}) {

    const queryClient = useQueryClient()


    const { mutate , isLoading , error , isError} = useMutation({
      mutationFn: async(e) => {
        e.preventDefault();
        const formData = {
            permission: e.target.permission.value
          };
          if (!admin) {
            formData.manager_name = e.target.manager_name.value;
            formData.manager_email = e.target.manager_email.value;
            formData.manager_password = e.target.manager_password.value;
          }
       return await axios({
        method:admin ? 'PUT' : 'POST',
        url:url,
        data:formData
      })},
      onSuccess:(res) => {
        Toast(res.data.message, true);
        onClose();
        queryClient.invalidateQueries("get_admins")
      },
      onError:(err) => {
        const message = err?.response?.data?.message;
        Toast(message, false);
        console.log(err)
     }})

  return (
    <Container>
      <Box as="form" onSubmit={(e) => mutate(e)}>
        {!admin && (
          <>
            <InputField
              name={"manager_name"}
              type="text"
              isRequired={true}
              label={"Manager Name"}
            />
            <InputField
              name={"manager_email"}
              type="email"
              isRequired={true}
              label={"Manager Email"}
            />
            <InputField
              name={"manager_password"}
              type="password"
              isRequired={true}
              label={"Manager Password"}
            />
          </>
        )}
        <InputField
          name={"permission"}
          type="text"
          isRequired={true}
          label={"Admin Permission"}
          value={admin ? admin.permission : ''}
        />
        <Button mt={4} type="submit">
          {isLoading ? "In Process..." : admin ? "EDIT" : 'ADD'}
        </Button>
        {isError && (
          <Text color={"red.500"} fontSize={"xl"}>
            {error?.response?.data?.message || error.message}
          </Text>
        )}
      </Box>
    </Container>
  );
}

export default AdminsForm;