import React from 'react'
import useLogout from '../../hooks/useLogout'
import { Button } from '@chakra-ui/react';
import {IoIosLogOut} from 'react-icons/io'

function Logout() {
  
  const [ mutate ] = useLogout();

    return (
        <Button type='button' title='Log Out' onClick={() => mutate()}>
            <IoIosLogOut size={25}/> 
        </Button>
    )
}

export default Logout