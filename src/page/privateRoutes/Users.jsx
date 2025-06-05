import UsersTable from '../../components/partials/users/UsersTable';
import {Container , Heading} from '@chakra-ui/react';
import { get , ref } from 'firebase/database';
import { rtdb } from '../../../firebase_config';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";


function Users() {

  // Check if user is deleted from RTDB or DB 
  const { loadingUser, setLoadingUser } = useContext(AuthContext);

  const url = `${import.meta.env.VITE_URL_BACKEND}/users/managers/get-users`;

  async function getUsers(){
    try {
      setLoadingUser(true); // Start loading

      const res = await fetch(url);
      const data = await res.json();

      if (!Array.isArray(data)) throw new Error("Unexpected data format");

      const users = data.map((user) => ({
        ...user,
        _id: user._id || "", 
      }));

      setLoadingUser(false); // Done loading
      return users;

    } catch (error) {
      setLoadingUser(false); // Done loading
      throw new Error('Error fetching users: ' + error.message);
    }
  }


const { isLoading , isError , error , data, refetch } = useQuery({
  queryKey:['get_users'],
  queryFn:() => getUsers() ,
  });


  useEffect(() => {
    if (loadingUser) {
      refetch(); // Refetch data when loadingUser is true
  }}, [loadingUser]);


  return (
    <Container maxW={'container.xl'}>
    <Heading>Users:</Heading>
    {isLoading && <span>Loading...</span>}
    {isError && <span>{error.message}</span>}
    {data && data.length === 0 && <span>No Users</span>}
    {data && data.length > 0 && <UsersTable users={data} />}
  </Container>
  )
}

export default Users


