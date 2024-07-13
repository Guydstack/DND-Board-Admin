import React, { useEffect, useState } from 'react';
import { get, ref } from 'firebase/database';
import { rtdb } from '../../../../firebase_config';
import Spinner from '../../../hooks/Spinner';
import SparkLine from "../../charts/SparkLine";
import { Box , Button , VStack , Text} from "@chakra-ui/react";
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import Icon from "./Icon";
import { exportToExel } from "../../../lib";

async function getUsers() {
  try {
    const users = [];
    const reference = ref(rtdb, "users");
    const response = await get(reference);
    const data = response.exists() && await response.val();

    if (!data) return [];

    for (const id in data) {
      data[id]._id = id;
      users.push(data[id]);
    }
    return users;
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
}

function SparkLineChart() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
      setLoading(false);
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <VStack bg={"#1e1e1f"} w={'400px'} wrap={'wrap'} padding={5}>
      <Icon title={'Customers'} icon={<MdOutlineSupervisorAccount size={40} color="white" />} />
      <Box w={'full'}>
        <SparkLine users={users} />
      </Box>
      <Button
        type="button"
        title="Export Products"
        style={{ color: 'white', borderRadius: '10px' }}
        fontSize={'large'}
        w={'full'}
        p={3}
        _hover={{ dropShadow: 'xl' }}
        bg={'green.400'}
        onClick={() => exportToExel(users, "Users-Sheet")}
      >
        Download Report
      </Button>
    </VStack>
  );
}

export default SparkLineChart;
