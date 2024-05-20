import { useContext, useEffect, lazy } from "react";
import {
  Flex,
  Heading,
  Button,
  Stack,
  Box,
  Avatar,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import { Formik, Form, Field, useField } from "formik"
import InputLogin from "../../components/common/InputLogin";
import * as Yup from "yup"
import useLogin from "../../hooks/useLogin";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../../hooks/Spinner";
const OtpInput = lazy(() => import("./OtpInput"));
const Reset = lazy(() => import("./Reset"));
const Recovered = lazy(() => import("./Recovered"));

function Login(){

  const { page } = useContext(AuthContext);

  return(
    <>
    { page === "login" && <LoginForm />}
    { page === "otp" && <OtpInput /> }
    { page === "reset" && <Reset /> }
    { page === "recovered" && <Recovered /> }
    </>
  )
}

export default Login;


function LoginForm () {
  const {colorMode} = useColorMode()
  const [mutate , isPending , error , isError ] = useLogin();
  const navigate = useNavigate();
  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    if(isAuth) navigate(-1)
  },[])


  const placeHolderColorInDarkMode = {
    _placeholder:{color:colorMode === 'dark' && 'gray.500'},
    color:colorMode === 'dark' && 'white'
  }

  return (
    <LoginHeader>
          <Formik
          initialValues={{manager_email:'',manager_password:''}}
          validationSchema={Yup.object({
            manager_email:Yup.string()
            .required('Manager Email is Required')
            .min(12,"Manager Email too short!!")
            .email(),
            manager_password:Yup.string()
            .required("Password is Required")
            .min(6,"Password too short!")
            .max(28,"Password too Long!")
          })}
          onSubmit={(values,actions) => {
            console.log(values.manager_password);
            mutate(values)
            actions.resetForm();
          }}
          >
            <Stack
              spacing={4}
              p="1rem"
              boxShadow="md"
              as={Form}
              >
                
              {isPending && 
                <Spinner />
              }

              <InputLogin
                    name={"manager_email"} 
                    as={Field} 
                    sx={placeHolderColorInDarkMode} 
                    type="email" 
                    placeholder="email address"
                    autoComplete="off" 
              />
              <InputLogin
                    name={"manager_password"} 
                    as={Field} 
                    sx={placeHolderColorInDarkMode} 
                    type="password"
                    placeholder="Password"
                    autoComplete="off" 
              />
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                color="white"
              >
                {isPending ? "Processing..." : 'Login'}
              </Button>
                {isError && <Text color={"red.500"}>{error}</Text>}
            </Stack>
          </Formik>
    </LoginHeader>
  );
};


function LoginHeader({children}){
  return <Flex
  flexDirection="column"
  width="80wh"
  height="80vh"
  justifyContent="center"
  alignItems="center"
  >
  <Stack
    flexDir="column"
    mb="2"
    justifyContent="center"
    alignItems="center"
  >
      <Avatar bg="teal.500" />
      <Heading color="teal.400">Welcome</Heading>
      <Box minW={{ base: "90%", md: "468px" }}>
        {children}
    </Box>
   </Stack>
  </Flex>
}
