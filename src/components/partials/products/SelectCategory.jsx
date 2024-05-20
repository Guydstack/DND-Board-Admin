import { Select, FormControl, FormLabel , Spinner , Text , Divider , UnorderedList , ListItem , Button} from "@chakra-ui/react";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const url_category = `${import.meta.env.VITE_URL_BACKEND}/categories/managers/all`;

function SelectCategory({setChosenCategories , chosenCategories}) {


    const { data , isLoading , isError , error} = useQuery({
        queryKey:['get_categories'],
        queryFn:async() => await axios.get(url_category),
        select:(res) => res.data.categories,
        staleTime:1000 * 60
        })


  return (
    <>
    {isLoading && <Spinner color="blue" size={20} />}
    {isError && <Text color={'red'}>{error}</Text>}
      <FormControl mt={4}>
        <FormLabel>Categories</FormLabel>
        <Select 
        onChange={(e) => {
            const obj = JSON.parse(e.target.value)
            const exists = chosenCategories.some((cc) => {
                  return cc._id === obj._id
            })

            if(!exists) setChosenCategories(() => [...chosenCategories,obj])
            
        }}
        placeholder="בחר קטגוריה">
          {data?.map((category) => (
            <option key={category._id} value={JSON.stringify(category)}>
              {category.category_name}
            </option>
          ))}
        </Select>
      </FormControl>


      <Divider />

      <UnorderedList>
        {chosenCategories.map((category) => (
              <ListItem key={category._id}>
              {category.category_name}
              <Button
              onClick={() => {
                const filteredChosen = chosenCategories.filter((cc) => {
                    return category._id !== cc._id
                })
                setChosenCategories(filteredChosen)
              }}
              
              >
                  X
              </Button>
          </ListItem>
        ))}
      </UnorderedList>
    </>
  );
}

export default SelectCategory;
