import {
    Flex,
    Box,
    VStack,
    Text,
    Button,
    PinInput,
    PinInputField,
    HStack,
  } from "@chakra-ui/react";
  import { useContext } from "react";
  import { useState } from "react";
  import { AuthContext } from "../../context/AuthContext";
  import { useEffect } from "react";
  
  function OtpIntput() {
    const { otp , setPage , nagigateToOtp} = useContext(AuthContext);
    const [OTPinput,setOTPinput] = useState([0,0,0,0])
    const [timerCount,setTimeCount] = useState(60);
    const [disable,setDisable] = useState(true);
  
    function verifyOTP(){
      if(parseInt(OTPinput.join("")) === otp) return setPage('reset');
     return alert("the code you have entered is not correct, try again or re-send the link");
    }
  
   async function resendOTP(){
      if(disable) return;
      nagigateToOtp();
      setTimeCount(60);
      setDisable(true);
    }
  
    useEffect(() => {
     let interval = setInterval(() => {
      setTimeCount((timer) => {
        timer <= 1 && clearInterval(interval);
        if(timer <= 1 ) return setDisable(false)
        return timer - 1
      })
     },1000);
  
     return () => clearInterval(interval);
    },[disable])
    
    return (
      <Flex h={"100vh"} justify={"center"} align={"center"}>
        <Box
          px={6}
          pt={10}
          pb={9}
          shadow={"xl"}
          mx={"auto"}
          w={"full"}
          maxW={"lg"}
          rounded={"2xl"}
        >
          <VStack mx={"auto"} w={"full"} maxW={"md"} my={5}>
            <VStack
              align={"center"}
              justify={"center"}
              textAlign={"center"}
              my={2}
            >
              <Box>
                <Text fontWeight={"semibold"} fontSize={"3xl"}>
                  Email Verification
                </Text>
              </Box>
              <Flex fontSize={"medium"}>
                <Text fontSize={"small"} color={"gray.400"}>
                  We have sent a code to your email{" "}
                </Text>
              </Flex>
            </VStack>
  
            <Box>
              <Box as="form">
                <VStack my={5}>
                  <Flex className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    <HStack>
                      <PinInput>
                        <PinInputField
                          onChange={(e) =>
                            setOTPinput([
                              e.target.value,
                              OTPinput[1],
                              OTPinput[2],
                              OTPinput[3],
                            ])
                          }
                        />
                        <PinInputField
                          onChange={(e) =>
                            setOTPinput([
                              OTPinput[0],
                              e.target.value,
                              OTPinput[2],
                              OTPinput[3],
                            ])
                          }
                        />
                        <PinInputField
                          onChange={(e) =>
                            setOTPinput([
                              OTPinput[0],
                              OTPinput[1],
                              e.target.value,
                              OTPinput[3],
                            ])
                          }
                        />
                        <PinInputField
                          onChange={(e) =>
                            setOTPinput([
                              OTPinput[0],
                              OTPinput[1],
                              OTPinput[2],
                              e.target.value,
                            ])
                          }
                        />
                      </PinInput>
                    </HStack>
                  </Flex>
  
                  <VStack my={5}>
                    <Flex>
                      <Button
                        onClick={() => verifyOTP()}
                        cursor={"pointer"}
                        justify={"center"}
                        align={"center"}
                        textAlign={"center"}
                        w={"full"}
                        border={"none"}
                        rounded={"xl"}
                        outline={"none"}
                        py={5}
                        bg={"green.700"}
                        color={"white"}
                        fontSize={"sm"}
                        shadow={"sm"}
                      >
                        Verify Account
                      </Button>
                    </Flex>
  
                    <Flex
                      mx={"1"}
                      color={"gray.500"}
                      fontSize={"medium"}
                      justify={"center"}
                      align={"center"}
                    >
                      <Text>Didn't recieve code?</Text>{" "}
                      <a
                        style={{
                          paddingLeft: "5px",
                          color: disable ? "gray" : "blue",
                          cursor: disable ? "none" : "pointer",
                          textDecorationLine: disable ? "none" : "underline",
                        }}
                        onClick={() => resendOTP()}
                      >
                       {disable ? `Resend OTP in ${timerCount}s`: 'Resend OTP'}
                      </a>
                    </Flex>
                  </VStack>
                </VStack>
              </Box>
            </Box>
          </VStack>
        </Box>
      </Flex>
    );
  }
  
  export default OtpIntput;
  