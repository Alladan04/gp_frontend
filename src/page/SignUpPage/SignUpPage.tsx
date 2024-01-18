import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
//import "./LoginPage.css"
import "./SignUpPage.css"

import OperationButton from "../../components/Buttons/OperationButton"

const SignUpPage = () => {


    const {is_moderator, login, auth, signup} = useAuth()
    
    const navigate = useNavigate()

   let flag = false;
    const handleSubmit = async(e: any ) => {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)
        formData.append('is_superuser', "false")
        formData.append ('is_staff', 'false')

        // const flag = await login(formData)
        flag =  await signup(formData);
       console.log(flag)
       if (flag){
       navigate("/login")}
       else{
        alert("Пользователь существует")
       }
       
    
    }

   const handleAuth  = async() => {
        console.log("handle Registration")
        
       
           
        
    }

    useEffect(() => {
        handleAuth()
    }, []);
    

    return (
          <section> 

          <div className="signin"> 
       
           <div className="content"> 
       
            <h2>Регистрация</h2> 
       
            <form className="form" onSubmit={handleSubmit}> 
       
                <div className="inputBox"> 
        
                <input type="text" name="username"/>
        
                </div> 
        
                <div className="inputBox"> 
        
                <input type="password" name="password"/>
        
                </div>
                <div className="inputBox"> 
        
                <input type="email" name="email"/>
        
                </div>
    
                <button className="button" type="submit">Регистрация</button> 
            </form> 
       
           </div> 
       
          </div> 
       
         </section> 
    )
}

export default SignUpPage;