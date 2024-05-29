import {useEffect, useState} from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


function useFetch(url){
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { sendNewRequest } = useContext(AuthContext);


    const fetchFromDB = async () => {
        try {
        setIsLoading(true)
        const response = await axios.get(url);
        setData(response.data)
        } catch (error) {
            setError(error)
        }
        finally{
            setIsLoading(false)
        }
       }

    useEffect(() => {
        fetchFromDB()
    },[sendNewRequest])

   return [data,isLoading,error]
}


export default useFetch;
