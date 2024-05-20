import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Toast } from "../lib";

//useQuery - עושה שימוש בuseEffect;

//useMutation - מספק לנו פונקציה בשם 
//mutate שאנחנו יכולים להגדיר לבקשה מתי אנחנו רוצים שהיא תשלח


function useLogout() {


const {setIsAuth , setUserProfile} = useContext(AuthContext)

const {mutate} = useMutation({

    mutationFn:async () => await axios.get(`${import.meta.env.VITE_URL_BACKEND}/users/managers/logout`,{withCredentials:true}),
    onSuccess:(res) => {
        setIsAuth(false)
        setUserProfile(null)
        Toast(res.data.message,true)
    },
    onError: (err) => {
        console.log(err)
        Toast(err.response.data.message,false)
    }
})    

return [ mutate ]
}

export default useLogout