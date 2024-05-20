import React, { useContext, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"





function useAuth() {
const { setIsAuth, setOnLoad } = useContext(AuthContext)

const { isSuccess, isError } = useQuery({
    queryKey:['auth'],
    queryFn:async () => await axios.get(`${import.meta.env.VITE_URL_BACKEND}/users/managers/auth`,{withCredentials : true}),
    refetchOnMount:false,
    refetchOnWindowFocus:false,
    refetchOnReconnect:false,
    retry:false
})

useEffect(() => {
isSuccess && setIsAuth(true)
isSuccess && setOnLoad(true)
isError && setOnLoad(true)
}, [isSuccess, isError])

return [ isSuccess ]
}


export default useAuth


