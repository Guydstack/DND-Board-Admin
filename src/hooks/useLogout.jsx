// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { Toast } from "../lib";


// function useLogout() {


// const {setIsAuth , setUserProfile} = useContext(AuthContext)

// const {mutate} = useMutation({
//     mutationFn:async () => await axios.get(`${import.meta.env.VITE_URL_BACKEND}/users/managers/logout`,{withCredentials:true}),
//     onSuccess:(res) => {
//         setIsAuth(false)
//         setUserProfile(null)
//         Toast(res.data.message,true)
//     },
//     onError: (err) => {
//         console.log(err)
//         Toast(err.response.data.message,false)
//     }
// })    

// return [ mutate ]
// }

// export default useLogout




import { useMutation } from 'react-query';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Toast from '../utils/Toast';

const useLogout = () => {
  const { setIsAuth, setUserProfile } = useContext(AuthContext);

  const { mutate } = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('token')
      return await axios.get('/users/managers/logout', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    },
    onSuccess: (res) => {
      localStorage.removeItem('token')
      setIsAuth(false);
      setUserProfile(null);
      Toast(res.data.message, true);
    },
    onError: (err) => {
      Toast(err.response?.data?.message || 'Logout failed', false);
    },
  });

  return [mutate];
};

export default useLogout;
