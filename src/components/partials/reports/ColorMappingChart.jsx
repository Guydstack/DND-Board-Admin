import ColorMapping from '../../charts/ColorMapping'
import { Box } from '@chakra-ui/react';
import Icon from './Icon';
import { BsBoxSeam } from 'react-icons/bs';

function ColorMappingChart() {
  return (
    <Box bg={"#1e1e1f"} w={['90%','90%','50%']}>
    <Icon title={'Orders'} icon={<BsBoxSeam size={40} color='green'/> } />
    <ColorMapping />
    </Box>
  )
}

export default ColorMappingChart