import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import "./FineCard.scss"
//import CustomButton from "../CustomButton/CustomButton";

import {useDraftRequest} from "../../hooks/useRequest";
//import {Fine} from "../Interfaces";
import {useAuth} from "../../hooks/useAuth";
import { Button,} from 'react-bootstrap';
//import "./RequestOperationCard.css"
import OperationButton from '../Buttons/OperationButton';
//import Card from 'react-bootstrap/Card';
//import "./RequestOperation.css"

const RequestOperationCard = ({data, request}:{data: DraftItem, request: Request}) => {

  const {is_authenticated, is_moderator} = useAuth()
 
  const {addOperationToRequest, deleteOperationFromRequest, fetchRequest,updateRequestItem} = useDraftRequest()
  const [op1, setOp1] = useState(data.operand1);
  const [op2, setOp2] = useState(data.operand2);
  const handleSubmit = (event:any)=> {
    event.preventDefault();
    console.log(event.target)
    //const formData = new FormData(event.target as HTMLFormElement)
    const formData = {data:{operand1:op1, operand2:op2}}
    updateRequestItem(data.id, formData)
    console.log("operand1", op1)
    console.log("operand2", op2)
  }

  const handleAdd = async () => {
    await addOperationToRequest(data.id)
  }

  const handleDelete = async () => {
    await deleteOperationFromRequest(data.id)

  }
  /*useEffect(() => {
    
        fetchRequest(request.id);
        console.log("fetched requesr from card")
      
}, []);*/



  return (
    <>
  
 
      <div className='card'>
      <div className="card__body">
          <div className="half">
          <div className="featured_text">
               <h1>{data.operation.name}</h1>
               </div>

          <div className="image">
          <img src={"data:image/png;base64,"+data.operation.image} style={{maxWidth:"50%"}} />  
          </div>
       </div>
       <div className="half" style = {{}}>
          <div className="description">
                <form className='container' style = {{display:"flex-box",marginTop :'10px', gap :'20px',position:'relative', right: '20px'}}>
               {is_authenticated&&request.status=="введён"&&<div className="inputBox"> <input type="number" value={op1} onChange = {(e)=>{setOp1(Number(e.target.value))}}name="operand1" min = "0" style = {{height:'30px'}}/></div>}
               {is_authenticated&&request.status=="введён"&&<div className="inputBox" > <input type="number" value = {op2} onChange = {(e)=>{setOp2(Number(e.target.value))}} name="operand2"  min = "0" style = {{height:'30px', marginTop:'10px', marginBottom:"10px"}}/></div>}
               {is_authenticated && request.status=="введён"&& <OperationButton text= "Ок" onClick={handleSubmit} /> }
               </form>
               <div className='container' style = {{display:"block",marginTop :'10px',width:'50px',position:'relative', right: '20px'}}>
                {is_authenticated&&request.status!="введён"&&
                <div>
                <h3>операнды: {data.operand1}, {data.operand2}</h3>
                <h3>результат:{data.result?data.result:"нет"}</h3>
                </div>
                }
               {is_authenticated && request.status!="введён"&& <OperationButton text = "Добавить"onClick={handleAdd} /> }
    
               {is_authenticated && request.status=="введён"&& <OperationButton text= "Удалить" onClick={handleDelete} /> }
               </div>
          </div>
      </div>
       </div>
     
        
      
   
      </div>
  

</>
  )
}

export default RequestOperationCard