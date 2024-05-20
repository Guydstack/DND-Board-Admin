import { Box, Flex, VStack, Heading, Checkbox, Button } from "@chakra-ui/react";
import { Formik , Form} from "formik";
import InputRecover from "../../components/common/inputRecover";
import * as Yup from 'yup';
import axios from 'axios';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";



function Reset() {

  const { email , setPage } = useContext(AuthContext);
  const url = `${import.meta.env.VITE_URL_BACKEND}/users/update-password-managers/${email}`

 async function changePassword(values) {
    try {
     const { data } = await axios.put(url,{manager_password:values.manager_password});
     if(!data.success) return;
     setPage('recovered')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box>
      <Box as="section" bg={"gray.900"}>
        <Formik
        initialValues={{manager_password:'',confirm_password:''}}
        validationSchema={Yup.object({
          manager_password:Yup.string()
          .required("Password is Required")
          .min(6,"Password too Short!")
          .max(28,"Password too Long!"),
          confirm_password:Yup.string()
          .required("Password is Required")
          .min(6,"Password too Short!")
          .max(28,"Password too Long!")
        })}
        onSubmit={(values,actions) => {
          const {manager_password , confirm_password} = values;
          if(manager_password !== confirm_password) return alert('passwords must be same')
          changePassword(values)
          actions.resetForm();
         }}
        >
        <VStack
          as={Form}
          px={6}
          py={8}
          mx={"auto"}
          h={"100vh"}
          w={"30%"}
          justify={"center"}
          align={"center"}
        >
          <Box
            w={"full"}
            p={6}
            bg={"gray.800"}
            borderColor={"gray.700"}
            border={"solid"}
            borderWidth={"1px"}
            rounded={"lg"}
            shadow={"xl"}
          >
            <Heading
              mb={1}
              fontSize={"2xl"}
              fontWeight={"bold"}
              color={"white"}
            >
              Change Password
            </Heading>
            <Box as="form" mt={5} my={5}>
              <InputRecover
                name="manager_password"
                type="password"
                label="New Password"
              />
              <InputRecover
                name="confirm_password"
                type="password"
                label="Confirm password"
              />
              <Flex align={"start"}>
                <Flex align={"center"} h={"10"}>
                  <Checkbox
                    required={true}
                    type="checkbox"
                    aria-describedby="newsletter"
                    id="newsletter"
                    bg={"gray.700"}
                  />
                  <Box ml={3} fontSize={"small"}>
                    <label
                      htmlFor="newsletter"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </Box>
                </Flex>
              </Flex>
            </Box>
            <Button
              onClick={() => changePassword()}
              type="submit"
              w={"full"}
              color={"white"}
              bg={"green.600"}
              _hover={{ bg: "green.700" }}
              _focus={{ ring: 4, outline: "none" }}
              fontSize={"medium"}
              rounded={"lg"}
              px={5}
              py={2.5}
              textAlign={"center"}
            >
              Reset passwod
            </Button>
          </Box>
        </VStack>
        </Formik>
      </Box>
    </Box>
  );
}

export default Reset;
