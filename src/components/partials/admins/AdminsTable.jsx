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
  import { useState, useContext } from "react";
  import { useMutation , useQueryClient } from '@tanstack/react-query';
  import axios from 'axios';
  import { Toast, exportToExel } from "../../../lib";
  import { AuthContext } from "../../../context/AuthContext";
  import AdminsModal from "../admins/AdminsModal";
  
  function AdminsTable({ admins }) {
  
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [adminToUpdate, setAdminToUpdate] = useState(null);
    const { userProfile } = useContext(AuthContext);

  
    const queryClient = useQueryClient();
  
    const { mutate } = useMutation({
      mutationFn: async (id) => await axios.delete(
        `http://localhost:4000/users/managers/delete-by-id-for-manager/${id}`
      ),
      onSuccess:(res) => {
        Toast(res.data.message, true);
        queryClient.invalidateQueries("get_admins")
      },
      onError: (err) => {
          Toast(err.response.data.message, false);
          console.log(err)
      }
    });

    const handleDeleteClick = (id) => {
      if (userProfile?.permission === 1) {
        mutate(id);
      } else {
        Toast("You are not allowed to delete an Admin.", false);
      }
    };
  
    const handleUpdateClick = (admin) => {
      if (userProfile?.permission === 1) {
        openModalAdmins(admin);
      } else {
        Toast("You are not allowed to update an Admin.", false);
      }
    };


    const handleAddClick = (admin) => {
      if (userProfile?.permission === 1) {
        openModalAdmins(admin);
      } else {
        Toast("You are not allowed to add an Admin.", false);
      }
    };
  
    function openModalAdmins(ad){
      setAdminToUpdate(ad)
      onOpen();
    };
  
    return (
      <Box>
          <Box textAlign={"center"}>
          <ButtonGroup gap={2}>
          <Button
            title="Export"
            type="button"
            onClick={() => 
                userProfile?.permission === 1 
                ? exportToExel(admins, 'AdminsSheet') 
                : Toast("You are not allowed to export Admins.", false)
            }
            >
            <ExternalLinkIcon color={"purple.500"} bgSize={30} />
            </Button>
            <Button
              title="Add"
              type="button"
              onClick={() => handleAddClick(null)}
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
           <Th textAlign={'center'}>Email</Th>
           <Th textAlign={'center'}>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
        {admins?.map((admin,index) => (
          <Tr key={index}>
            <Td textAlign={'center'}>{admin.manager_name}</Td>
            <Td textAlign={"center"}>{admin.manager_email}</Td>
            <Td>
            <ButtonGroup gap="2">
                      <Button
                      textAlign={'center'}
                        colorScheme="whiteAlpha"
                        type="button"
                        onClick={() => handleDeleteClick(admin._id)}
                        title="Delete"
                      >
                        <DeleteIcon bgSize={25} color={"red.300"} />
                      </Button>
                      <Button
                        textAlign={'center'}
                        onClick={() => handleUpdateClick(admin)}
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
    <AdminsModal onClose={onClose} isOpen={isOpen} admin={adminToUpdate} />
    </Box>
    )
  }
  
  export default AdminsTable