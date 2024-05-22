import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Toast } from '../lib/index';
import { useNavigate } from 'react-router-dom';


function useLogin() {
   const navigate = useNavigate();
   const {setUserProfile , setIsAuth } = useContext(AuthContext);

 const { mutate , isPending , error , isError }  = useMutation({
        mutationFn:async (values) => await axios({
            method:'POST',
            url:`${import.meta.env.VITE_URL_BACKEND}/users/managers/login`,
            headers:{
                "Content-Type":"application/json"
            },
            data:values,
        }),
        onError:(err) => {
            console.log(err)
            Toast(err.response.data.message,false)
        },
        onSuccess:(res) => {
            console.log(res)
            localStorage.setItem('token', res.data.token); // Store the token in localStorage
            setIsAuth(true)
            setUserProfile(res.data.manager)
            navigate('/products')
            Toast(res.data.message,true)
        }
    })


  return [mutate , isPending , error , isError]
}

export default useLogin
