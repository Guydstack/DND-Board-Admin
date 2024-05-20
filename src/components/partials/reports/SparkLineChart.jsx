import SparkLine from "../../charts/SparkLine";
import { Box , Button , VStack , Text} from "@chakra-ui/react";
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import Icon from "./Icon";

function SparkLineChart() {
  return (
    <VStack bg={"#1e1e1f"} w={'400px'} wrap={'wrap'} padding={5}>
     <Icon title={'Customers'} icon={<MdOutlineSupervisorAccount size={40} color="white" /> } />
      <Box w={'full'}>
      <SparkLine />
      </Box>
      <Button
        type="button"
        style={{ color:'white', borderRadius :'10px'}}
        fontSize={'large'}
        w={'full'}
        p={3}
        _hover={{dropShadow:'xl'}}
        bg={'green.400'}
      >
        Download Report
      </Button>
    </VStack>
  )
}

export default SparkLineChart