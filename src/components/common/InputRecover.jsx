import {
    FormControl,
    FormLabel,
    Input,
    InputRightElement,
    InputGroup,
    FormErrorMessage 
  } from "@chakra-ui/react";
import { Field, useField } from "formik";
import { CheckIcon } from '@chakra-ui/icons';
function InputRecover({ ...props}) {
    const [field, meta] = useField(props);
    const {label} = props;
  
    return (
    <FormControl mt={4} isRequired={true} isInvalid={meta.touched && meta.error}>
    <FormLabel>{label}</FormLabel>
    <InputGroup>
    <Input
    as={Field} {...props} {...field}
    />
         {meta.value && !meta.error && (
          <InputRightElement>
            <CheckIcon color="green.500" />
          </InputRightElement>
        )}
        </InputGroup>
         <FormErrorMessage>{meta.error}</FormErrorMessage>
  </FormControl>
  )
}

export default InputRecover