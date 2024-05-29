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


  async function getUsers(){
    try {
      const users = [];
      const referece = ref(rtdb,"users");
      const response = await get(referece);
      const data = response.exists() && await response.val();
     
     if (!data) return [];

     for(const id in data){
      data[id]._id = id;
      users.push(data[id])
     }
     setLoadingUser(false)
     return users
    } catch (error) {
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


