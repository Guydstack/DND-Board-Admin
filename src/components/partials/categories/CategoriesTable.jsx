import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    ButtonGroup,
    Button,
    useDisclosure,
    Box,
  } from "@chakra-ui/react";
  import {
    DeleteIcon,
    EditIcon,
    AddIcon,
    ExternalLinkIcon,
  } from "@chakra-ui/icons";
  import CategoriesModal from "./CategoriesModal";
  import { useState } from "react";
  import { useMutation , useQueryClient } from '@tanstack/react-query';
  import axios from 'axios';
  import { Toast, exportToExel } from "../../../lib";
  
  function CategoriesTable({ categories }) {
  
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [category, setCategory] = useState(null)
  
    const queryClient = useQueryClient();
  
    const { mutate } = useMutation({
      mutationFn: async (id) => await axios.delete(
        `${import.meta.env.VITE_URL_BACKEND}/categories/managers/delete-category/${id}`
      ),
      onSuccess:(res) => {
        console.log(res)
        Toast(res.data.message, true);
        queryClient.invalidateQueries('get_categories')
      },
      onError: (err) => {
          Toast(err.response.data.message, false);
          console.log(err)
      }
    })
  
    function openModalCategories(cat){
      setCategory(cat)
      onOpen();
    }
  
    return (
      <Box>
          <Box textAlign={"center"}>
          <ButtonGroup gap={2}>
            <Button title="Export" type="button" onClick={() => exportToExel(categories,'CategorySheet')}>
              <ExternalLinkIcon color={"purple.500"} bgSize={30} />
            </Button>
            <Button
              title="Add"
              type="button"
              onClick={() => openModalCategories(null)}
            >
              <AddIcon color={"green.500"} bgSize={30} />
            </Button>
          </ButtonGroup>
        </Box>
      <TableContainer mt={10} >
      <Table variant="striped" maxW={'sm'} mx={'auto'}>
        <Thead>
          <Tr>
           <Th textAlign={'center'}>Name</Th>
           <Th textAlign={'center'}>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
        {categories.map((category,index) => (
          <Tr key={index}>
            <Td textAlign={'center'}>{category.category_name}</Td>
            <Td>
            <ButtonGroup gap="2">
                      <Button
                      textAlign={'center'}
                        colorScheme="whiteAlpha"
                        type="button"
                        onClick={() => mutate(category._id)}
                        title="Delete"
                      >
                        <DeleteIcon bgSize={25} color={"red.300"} />
                      </Button>
                      <Button
                        textAlign={'center'}
                        onClick={() => openModalCategories(category)}
                        colorScheme="blackAlpha"
                        type="button"
                        title="Update"
                      >
                        <EditIcon bgSize={25} color={"blue.300"} />
                      </Button>
                    </ButtonGroup>
            </Td>
          </Tr>
        ))}
        </Tbody>
      </Table>
    </TableContainer>
    <CategoriesModal onClose={onClose} isOpen={isOpen} category={category} />
    </Box>
    )
  }
  
  export default CategoriesTable