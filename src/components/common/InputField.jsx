import {
    FormControl,
    FormLabel,
    Input,
  } from "@chakra-ui/react";

function InputField({name, type, label, isRequired, value}) {
  return (
  <FormControl mt={4} isRequired={isRequired}>
    <FormLabel>{label}</FormLabel>
    <Input
      name={name}
      type={type}
      defaultValue={value ?? ''}
    />
  </FormControl>
  )
}

export default InputField