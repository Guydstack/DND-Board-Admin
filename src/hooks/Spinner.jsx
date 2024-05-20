import { ColorRing } from 'react-loader-spinner';
import {Flex} from '@chakra-ui/react'

function Spinner() {
  return (
    <Flex
        justifyContent="center"
        alignItems="center"
        height="150px"
      >
    <ColorRing
      visible={true}
      height="150"
      width="150"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
  </Flex>
)
}

export default Spinner