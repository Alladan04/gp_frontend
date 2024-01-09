import React from 'react';
import { Link } from 'react-router-dom';
//import "./FineCard.scss"
//import CustomButton from "../CustomButton/CustomButton";

import {useDraftRequest} from "../../hooks/useRequest";
//import {Fine} from "../Interfaces";
import {useAuth} from "../../hooks/useAuth";
import { Button, Card} from 'react-bootstrap';
//import "./RequestOperationCard.css"
import OperationButton from '../Buttons/OperationButton';
//import Card from 'react-bootstrap/Card';

const RequestOperationCard = ({data, request}:{data: DraftItem, request: Request}) => {

  const {is_authenticated, is_moderator} = useAuth()

  const {addOperationToRequest, deleteOperationFromRequest} = useDraftRequest()

  const handleAdd = async () => {
    await addOperationToRequest(data.id)
  }

  const handleDelete = async () => {
    await deleteOperationFromRequest(data.id)
  }
  

  return (
    <>
  
 
      <Card>
      <img src={"data:image/png;base64,"+data.operation.image} />
      <h3>{data.operation.name}</h3>
    
      <div className='my_card'>
     
              {is_authenticated && request.status!="введён"&& <OperationButton text = "Добавить"onClick={handleAdd} /> }
              {is_authenticated && request.status=="введён"&& <OperationButton text= "Удалить" onClick={handleDelete} /> }
              {is_authenticated&&request.status=="введён"&&<div className="inputBox"> <input type="text" name="operand1"/></div>}
              {is_authenticated&&request.status=="введён"&&<div className="inputBox"> <input type="text" name="operand2"/></div>}
      </div>
      </Card>


</>
  )
}

export default RequestOperationCard