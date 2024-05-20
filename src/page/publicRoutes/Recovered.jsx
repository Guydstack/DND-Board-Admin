import { Box, Flex, Heading , Button} from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Recovered() {

  const { setPage } = useContext(AuthContext);

  return (
    <Box>
      <Box as="section" h={"100vh"}>
        <Box px={6} h={"full"} color={"gray.800"}>
          <Flex
            justify={"center"}
            align={"center"}
            h={"full"}
            gap={6}
            wrap={"wrap"}
          >
            <div class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                class="w-full"
                alt="Sample image"
              />
            </div>
            <Box class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <Box as="form">
                <Flex justify={"center"} align={"center"}>
                  <Heading color={'green.500'} fontSize={"2xl"} fontWeight={"bold"} mr={4}>
                    Password succesfully set{" "}
                  </Heading>
                </Flex>

                <Flex
                  align={"center"}
                  justify={'center'}
                  color={'white'}
                  my={4}
                  _before={{
                    flex: 1,
                    borderTop: "solid",
                    borderColor: "gray.300",
                    mt:1
                  }}
                  _after={{
                    flex: 1,
                    borderTop: "solid",
                    borderColor: "gray.300",
                    mt:1
                  }}
                >
                  <Button onClick={() => setPage('login')}>Go to Login Page</Button>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export default Recovered;
