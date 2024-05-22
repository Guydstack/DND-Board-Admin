import { createContext, useState } from "react";
import { Toast } from "../lib";
import axios from 'axios';


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

    useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuth(true);
    }
    setOnLoad(true);
  }, []);

  //Real time Users
  const [loadingUser, setLoadingUser] = useState(false);


    //Recover password
    const [page, setPage] = useState("login");
    const [email, setEmail] = useState(null);
    const [otp, setOtp] = useState(null);

    async function navigateToOtp(){
      try {
       if(!email) return Toast('Please Enter your email',false);
       const OTP = Math.floor(Math.random() * 9000 + 1000)
       setOtp(OTP)
       const { data } = await axios.post(urlRecoverPass,{
         OTP,
         recipient_email:email
       })
        if(!data.success) return;
        Toast('sent OTP successfully',true)
        page !== 'otp' && setPage("otp")
      } catch (error) {
       console.log(error)
      }
    }



  const value = { sendNewRequest, setSendNewRequest, 
                  setProduct, product, setUserProfile, userProfile,
                  setIsAuth, isAuth, onLoad, setOnLoad, page,setPage,
                  navigateToOtp, email, setEmail, otp, setOtp, loadingUser, setLoadingUser
                 };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
