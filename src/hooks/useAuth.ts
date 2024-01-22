import {useDispatch, useSelector} from 'react-redux';
import {updateUser, cleanUser} from "../slices/authSlice";
import axios from "axios";
import { useSid } from './useSid';
import {User} from "../../../typescript-axios-client-generated/models/user"





export function useAuth() {
  const {is_authenticated, is_moderator, user_id, user_name} = useSelector((state: any) => state.user)
  console.log("in useAuth, current state = ",is_authenticated, user_name )
  const { session_id, setSid, resetSid } = useSid()

  const dispatch = useDispatch()
  const setUser = (value: any) => {
    // Сохраняем данные пользователя в localStorage
    console.log("in Set user")
    localStorage.setItem('user', JSON.stringify(value));
    dispatch(updateUser(value));
  };

  const resetUser = () => {
    // Удаляем данные пользователя из localStorage
    localStorage.removeItem('user');
    dispatch(cleanUser());
  };

  const initializeUserFromStorage = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(updateUser(JSON.parse(storedUser)));
    }
  };
  const logOut = async () => {
    console.log("In LOGOUT function")

    try {

      const response = await axios(`http://localhost:8000/profile/logout`, {
        method: "POST",
        headers: {
          'authorization': session_id
        },
       
        
      })

      if (response.status == 200)
      {
        resetSid()
        resetUser()
      }

    } catch (error) {
      console.log("Что-то пошло не так")
    }

  }

  const signup = async (formData: User)=>{
    try{
      const response = await axios(`http://127.0.0.1:8000/profile/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        data: formData as FormData
      })
      if (response.status==200){
        return true
      }
      }
      catch (error){
        console.log(error);
        return false;
      }
    
  }

  const login = async (formData: User) => {

      const response = await axios(`http://127.0.0.1:8000/profile/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        data: formData as FormData,
        withCredentials:true
      })

      if (response.status == 201) {

        console.log(response.data)
        console.log(response.data['session_id'])

        setSid(response.data['session_id'])
        console.log(response.data['session_id'], "|||||", session_id)
        const data = {
          is_authenticated: true,
          is_moderator: response.data["is_staff"],
          user_id: response.data["user_id"],
          user_name: response.data["username"],
        }
      
      console.log(`Login ${response.data["username"]}!`)

      setUser(data)

        return true
      }

      return false

  }


  const auth = async () => {
    console.log("in USE AUTH checking authentication")
    if (is_authenticated)
    {
      return true
    }

    if (session_id === "undefined") {
      return false
    }

    const response = await axios(`http://localhost:8000/profile/auth`, {
        method: "POST",
        
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          'authorization': session_id
        
        },
        withCredentials:true,
        

    } )
    console.log("after axios")
  if (response.status == 200 || response.status==201) {

    const data = {
        is_authenticated: true,
        is_moderator: response.data["is_staff"],
        user_id: response.data["id"],
        user_name: response.data["username"],
    }

    console.log(`Auth ${response.data["username"]}!`)

    setUser(data)

    return true
  }

  return false
}

  return {
    is_authenticated,
    is_moderator,
    user_id,
    user_name,
    setUser,
    logOut,
    login,
    auth,
    initializeUserFromStorage,
    signup
  };
}