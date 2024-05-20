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
  Box,
  Divider,
  Select,
  HStack,
  InputGroup,
  Input,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  SearchIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowUpDownIcon,
} from "@chakra-ui/icons";
import ModalOrder from "./ModalOrder";


function OrdersTable({ orders, mutate }) {

  const [filterStatus, setFilterStatus] = useState(null);

  const [dataOrders, setDataOrders] = useState([...orders]);

  const [searchTerm, setSearchTerm] = useState("");

  const [sortIndex, setSortIndex] = useState(null);

  const [sort, setSort] = useState("ASC");

  const [order, setOrder] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  function getOrderByModal(id) {
    const filterOrderById = dataOrders.find((order) => order._id === id);
    setOrder(filterOrderById);
    onOpen();
  }

  //function sort the orders
  function sortColumnInTable(col, nestedCol) {
    if (sort === "ASC") {
      //sort the array
      const sortedOrders = dataOrders.sort((a, b) => {
        if (nestedCol) return a[nestedCol][col] > b[nestedCol][col] ? 1 : -1;
        else return a[col] > b[col] ? 1 : -1;
      });
      //update the orders
      setDataOrders(sortedOrders);
      //update state sort
      setSort("DESC");
    }
    if (sort === "DESC") {
      const sortedOrders = dataOrders.sort((a, b) => {
        if (nestedCol) return a[nestedCol][col] > a[nestedCol][col] ? 1 : -1;
        else return b[col] > a[col] ? 1 : -1;
      });
      setDataOrders(sortedOrders);
      setSort("ASC");
    }
  }

  //implement search input
  useEffect(() => {
    const searchResults = orders.filter(
      (order) =>
        order.customer_details.customer_phone.includes(searchTerm) ||
        order.customer_details.customer_name.includes(searchTerm) ||
        order.order_number.toString().includes(searchTerm)
    );

    setDataOrders(searchResults);
  }, [searchTerm]);

  useEffect(() => {
    setDataOrders([...orders]);
    if(isOpen){
     const order1 = orders.find((ord) => ord._id === order._id)
     setOrder(order1)
    }
  }, [orders]);

  return (
    <Box>
      <HStack my={5} justifyContent={"space-between"}>
        {/* //filter Buttons */}
        <ButtonGroup>
          {filterButtons.map((btn) => (
            <Button
              key={btn.id}
              variant={filterStatus === btn.id ? "solid" : "outline"}
              onClick={() => setFilterStatus(btn.id)}
              colorScheme={btn.color}
            >
              {btn.name}
            </Button>
          ))}
        </ButtonGroup>
        {/* //search Orders */}
        <InputGroup maxW={480}>
          <Input
            placeholder="search by order number , customer name , customer phone"
            _placeholder={{ color: "white" }}
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <InputRightElement>
            <SearchIcon />
          </InputRightElement>
        </InputGroup>
      </HStack>
      <Divider />
      {/* //Table */}
      <TableContainer mt={10}>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th
                onClick={() => {
                  sortColumnInTable("order_number");
                  setSortIndex(1);
                }}
              >
                <HStack>
                  <span>Order Number</span>
                  {!sortIndex && <ArrowUpDownIcon />}
                  {sortIndex === 1 && sort === "ASC" && <ArrowDownIcon />}
                  {sortIndex === 1 && sort === "DESC" && <ArrowUpIcon />}
                </HStack>
              </Th>
              <Th
                onClick={() => {
                  sortColumnInTable("order_number");
                  setSortIndex(2);
                }}
              >
                <HStack>
                  <span>Date</span>
                  {sortIndex === 2 && sort === "ASC" && <ArrowDownIcon />}
                  {sortIndex === 2 && sort === "DESC" && <ArrowUpIcon />}
                </HStack>
              </Th>
              <Th
                onClick={() => {
                  sortColumnInTable("customer_name", "customer_details");
                  setSortIndex(3);
                }}
              >
                <HStack>
                  <span>Customer Name</span>
                  {sortIndex === 3 && sort === "ASC" && <ArrowDownIcon />}
                  {sortIndex === 3 && sort === "DESC" && <ArrowUpIcon />}
                </HStack>
              </Th>
              <Th
                onClick={() => {
                  sortColumnInTable("customer_phone", "customer_details");
                  setSortIndex(4);
                }}
              >
                <HStack>
                  <span>Customer Phone</span>
                  {sortIndex === 4 && sort === "ASC" && <ArrowDownIcon />}
                  {sortIndex === 4 && sort === "DESC" && <ArrowUpIcon />}
                </HStack>
              </Th>
              <Th>Customer Address</Th>
              <Th
                onClick={() => {
                  sortColumnInTable("total_price");
                  setSortIndex(5);
                }}
              >
                <HStack>
                  <span>Total</span>
                  {sortIndex === 5 && sort === "ASC" && <ArrowDownIcon />}
                  {sortIndex === 5 && sort === "DESC" && <ArrowUpIcon />}
                </HStack>
              </Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataOrders
              ?.filter((order) =>
                !filterStatus ? order : order.status === filterStatus
              )
              .map(
                (
                  {
                    _id,
                    order_number,
                    created_at,
                    customer_details: {
                      customer_name,
                      customer_phone,
                      customer_address,
                    },
                    total_price,
                    status,
                  },
                  index
                ) => (
                  <Tr key={_id}>
                    <Td>{index + 1}</Td>
                    <Td
                      onClick={() => getOrderByModal(_id)}
                      color={"blue"}
                      cursor={"pointer"}
                      textDecoration={"underline"}
                    >
                      {order_number}
                    </Td>
                    <Td>
                      {new Date(created_at).toLocaleString("en-il", {
                        weekday: "short",
                        month: "short",
                        year: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      })}
                    </Td>
                    <Td>{customer_name}</Td>
                    <Td>{customer_phone}</Td>
                    <Td>
                      {customer_address.street + " "} ,{" "}
                      {customer_address.building + " "} ,{" "}
                      {customer_address.city + " "}
                    </Td>
                    <Td>{total_price}</Td>
                    <Td>
                      <Select
                        value={status}
                        bg={
                          status === 1
                            ? "yellow.500"
                            : status === 2
                            ? "purple.500"
                            : status === 3
                            ? "green.500"
                            : "blackAlpha.500"
                        }
                        onChange={(e) =>
                          mutate({
                            id: _id,
                            status: e.target.value,
                          })
                        }
                      >
                        <option value="1">New</option>
                        <option value="2">Processing</option>
                        <option value="3">Done</option>
                        <option value="4">Canceled</option>
                      </Select>
                    </Td>
                  </Tr>
                )
              )}
          </Tbody>
        </Table>
      </TableContainer>
      <ModalOrder
        isOpen={isOpen}
        onClose={onClose}
        order={order}
        mutate={mutate}
      />
    </Box>
  );
}

export default OrdersTable;

const filterButtons = [
  {
    id: 0,
    name: "All",
    color: "teal",
  },
  {
    id: 1,
    name: "New",
    color: "yellow",
  },
  {
    id: 2,
    name: "Process",
    color: "purple",
  },
  {
    id: 3,
    name: "Done",
    color: "green",
  },
  {
    id: 4,
    name: "Canceled",
    color: "red",
  },
];
