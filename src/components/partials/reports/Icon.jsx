import { Box , Button , Text} from "@chakra-ui/react";

function Icon({ icon , title}) {
  return (
    <Box
    color={'gray.200'}
    w={56}
    p={4}
    pt={3}
    rounded={'2xl'}>
            <Button type='button'
            fontSize={'2xl'}
            opacity={'0.9'}
            rounded={'full'}
            h={'full'}
            p={4}
            _hover={{dropShadow:'2xl'}}
            >
             {icon}
            </Button>
            <Text mt={3}>
              <span style={{fontWeight:'600',fontSize:'lg'}}>30</span>
              <span style={{marginLeft:'2px',fontSize:'sm'}}>%</span>
            </Text>
           <Text color={'gray.400'} fontSize={'sm'} >{title}</Text>
          </Box>
  )
}

export default Icon