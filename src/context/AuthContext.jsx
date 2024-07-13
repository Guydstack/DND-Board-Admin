import { createContext, useState } from "react";
import { Toast } from "../lib";
import axios from 'axios';
import Spinner from "../hooks/Spinner";



export const AuthContext = createContext();

const urlRecoverPass = `${import.meta.env.VITE_URL_BACKEND}/users/send_recovery_email`


function AuthProvider({ children }) {
  const [sendNewRequest, setSendNewRequest] = useState(false);
  const [product, setProduct] = useState(null);

    //שמשתמש מתחבר אני שומר את הפרטים עליו בסטייט הנ"ל
  const [userProfile,setUserProfile] = useState(null)

    //אחראי להכניס אותנו לאפליקציה
    const [isAuth, setIsAuth] = useState(false)
    const [onLoad,setOnLoad] = useState(false)



  //Real time Users
  const [loadingUser, setLoadingUser] = useState(false);


    //Recover password
    const [page, setPage] = useState("login");
    const [email, setEmail] = useState(null);
    const [otp, setOtp] = useState(null);
    const [loadingRecover,setLoadingRecover] = useState(false)

    async function navigateToOtp(){
      try {
       if(!email) return Toast('Please Enter your email',false);
       const OTP = Math.floor(Math.random() * 9000 + 1000)
       setOtp(OTP)
       setLoadingRecover(true); // Set loading state to true when sending request
       const { data } = await axios.post(urlRecoverPass,{
         OTP,
         recipient_email:email
       })
        if(!data.success) return;
        Toast('sent OTP successfully',true)
        page !== 'otp' && setPage("otp")
        setLoadingRecover(false);
      } catch (error) {
       console.log(error)
      }
    };

    if (loadingRecover === true) {
      return <Spinner />
    };



  const value = { sendNewRequest, setSendNewRequest, 
                  setProduct, product, setUserProfile, userProfile,
                  setIsAuth, isAuth, onLoad, setOnLoad, page,setPage,
                  navigateToOtp, email, setEmail, otp, setOtp, loadingUser, setLoadingUser,
                 loadingRecover,setLoadingRecover,
                 };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
