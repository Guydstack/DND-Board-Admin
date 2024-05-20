import { useEffect, useState, useContext } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  chakra,
  Link,
  FormControl,
  FormHelperText,
  InputRightElement,
  FormErrorMessage,
  Button,
  useColorMode
} from "@chakra-ui/react";
import {CheckIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Field, useField } from "formik"
import { AuthContext } from "../../context/AuthContext";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function InputLogin({...props}) {
    const {colorMode} = useColorMode()
    const [showPassword, setShowPassword] = useState(false);
    const [marginIcon, setMarginIcon] = useState(0);
    const handleShowClick = () => setShowPassword(prev => !prev);
    const [field, meta] = useField(props);
    const {type} = props;
    const { navigateToOtp , setEmail } = useContext(AuthContext);

    useEffect(() => {
      if(field.name === 'manager_email') return setEmail(field.value)
    },[field])

    useEffect(() => {
      if (meta.value && !meta.error) {
        setMarginIcon(10);
      } else {
        setMarginIcon(0);
      }
    }, [meta.value, meta.error]);


  return (
    <FormControl isInvalid={meta.touched && meta.error}>
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={
        type === 'email' ? ( 
        <CFaUserAlt color="gray.300" /> 
        ) : (
        <CFaLock color="gray.300" /> 
        )
       }
      />

    <InputRightElement  width="4.5rem" children={ type === 'password' && 
  
      <Button color={colorMode === 'dark' && 'white'} h="1.75rem" size="sm" marginRight={marginIcon} onClick={handleShowClick}>
        {showPassword ? <ViewOffIcon/> : <ViewIcon />}
      </Button>
  }>
   </InputRightElement>

      
      <Input as={Field} {...props} {...field} type={props.name === "manager_email" ? "email" : (showPassword ? "text" : "password")}/>
      
      { meta.value && !meta.error && (
      <InputRightElement>
        <CheckIcon color={"green.500"}/>
      </InputRightElement>
      )}

          
      
    </InputGroup>
    <FormErrorMessage>{meta.error}</FormErrorMessage>
    {type !== "email" && (
    <FormHelperText textAlign="right" onClick={() => navigateToOtp()}>
     <Link color='teal.500'>forgot password?</Link>
    </FormHelperText> 
    )}
  </FormControl>
  );
}

export default InputLogin

