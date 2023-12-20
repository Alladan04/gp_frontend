import {useDispatch, useSelector} from 'react-redux';
import {setUser, resetUser} from "../slices/authSlice";
import axios from "axios";
import { useSid } from './useSid';






export function useAuth() {
  const {is_authenticated, is_moderator, user_id, user_name} = useSelector((state: any) => state.user)

  const { session_id, setSid, resetSid } = useSid()

  const dispatch = useDispatch()
/*
  const setUser = (value: any) => {
    dispatch(updateUser(value))
  }

  const resetUser = () => {
    dispatch(cleanUser())
  }
*/
  const logOut = async () => {

    try {

      const response = await axios(`http://localhost:8000/profile/logout/`, {
        method: "POST",
        headers: {
          'authorization': session_id
        }
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

  const login = async (formData: any) => {

      const response = await axios(`http://127.0.0.1:8000/profile/login/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        data: formData as FormData
      })

      if (response.status == 201) {

        console.log(response.data)
        console.log(response.data['session_id'])

        setSid(response.data['session_id'])

        const data = {
          is_authenticated: true,
          is_moderator: response.data["is_staff"],
          user_id: response.data["user_id"],
          user_name: response.data["username"],
        }
      
      console.log(`Добро пожаловать, ${response.data["username"]}!`)

      setUser(data)

        return true
      }

      return false

  }


  const auth = async () => {

    if (is_authenticated)
    {
      return true
    }

    if (session_id === "undefined") {
      return false
    }

    const response = await axios(`http://localhost:8000/profile/auth/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          'authorization': session_id
        },
    })

  if (response.status == 200) {

    const data = {
        is_authenticated: true,
        is_moderator: response.data["is_staff"],
        user_id: response.data["id"],
        user_name: response.data["username"],
    }

    console.log(`Добро пожаловать, ${response.data["username"]}!`)

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
  };
}