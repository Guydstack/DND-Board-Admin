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
  } from "@chakra-ui/react";
  import { useEffect, useState, useContext } from 'react';
  import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
  import { RiRadioButtonLine } from "react-icons/ri";
  import { get , ref, update, remove } from 'firebase/database';
  import { rtdb, db, auth } from '../../../../firebase_config';
  import { AuthContext } from "../../../context/AuthContext";
  import { deleteDoc, doc, collection, updateDoc} from "firebase/firestore";



  
  function UsersTable({ users }) {

    const [rtdbUser, setRtdbUser] = useState(users);
    const { loadingUser, setLoadingUser } = useContext(AuthContext);
    const reference = collection(db, "users");


    useEffect(() => {
      setRtdbUser(users);
  }, [users]);

   
//   const handleDelete = async (userId) => {
    
//     try {
//         // // Step 1: Remove user from Realtime Database (rtdb)
//         // await remove(ref(rtdb, `users/${userId}`));
//         // console.log('User data deleted from Realtime Database successfully!');

//         // // Step 2: Delete user document from Firestore (db)
//         // await deleteDoc(doc(reference , userId));
//         // console.log('User document deleted from Firestore successfully!');

//         // Update loadingUser state if needed
//         setLoadingUser(true);
//     } catch (error) {
//         console.error('Error deleting user:', error);
//     } 
// };

    return (
      <TableContainer mt={10}>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Action</Th>
              {/* <Th>Roll</Th> */}
            </Tr>
          </Thead>
          <Tbody>
            {rtdbUser?.map((user) => (
              <Tr key={user._id}>
                <Td>{user.user_name}</Td>
                <Td>{user.user_email}</Td>
                <Td>{user.user_phone}</Td>
                <Td>
                  <ButtonGroup gap="4">
                    {/* <Button
                      colorScheme="whiteAlpha"
                      type="button"
                      title="Delete"
                      onClick={() => handleDelete(user._id)}
                      isLoading={loadingUser}
                      loadingText="Deleting"
                    >
                      <DeleteIcon bgSize={25} color={"red.300"} />
                    </Button> */}
                    {/* <Button
                      colorScheme="blackAlpha"
                      type="button"
                      title="Update"
                    >
                      <EditIcon bgSize={25} color={"blue.300"} />
                    </Button> */}
                    <Button
                      type="button"
                      title={user.active ? 'online' : 'offline'}
                    >
                      <RiRadioButtonLine color={user.active ? 'green' : 'red'} />
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    );
  }
  
  export default UsersTable;
  