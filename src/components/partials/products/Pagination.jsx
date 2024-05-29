import { Box, Button, ListItem, UnorderedList } from '@chakra-ui/react';


function Pagination({ pages, currentPage, setPage }) {

    const pageNumbers= [];

    for(let i = 1 ; i <= pages ;i++) pageNumbers.push(i);


    const style_list ={
        marginTop:'10px',
        display:'flex',
        align:'center',
        listStyleType:'none',
        gap:'10px'
    };

  return (
    <Box>
        <UnorderedList sx={style_list}>
            {pageNumbers.map((number) => (
                <ListItem key={number}>
                    <Button 
                    colorScheme='teal'
                    variant={currentPage === number ? 'solid' : 'outline'}
                    onClick={() => setPage(number)}
                    >
                        {number}
                    </Button>
                </ListItem>
            ))}
        </UnorderedList>
    </Box>
  )
};

export default Pagination
