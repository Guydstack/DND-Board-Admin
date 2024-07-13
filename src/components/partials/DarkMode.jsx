import { useColorMode , Button} from '@chakra-ui/react';
import { MoonIcon , SunIcon } from '@chakra-ui/icons';


function DarkMode() {
    const { colorMode, toggleColorMode } = useColorMode()
    
    return (
        <Button type='button' onClick={toggleColorMode}>
     {colorMode === 'light' ?
      <MoonIcon bgSize={30} color={'green.500'}/>
       : <SunIcon bgSize={30} color={{base:'white' , lg:'green.500'}} />}
        </Button>
    )
}

export default DarkMode
