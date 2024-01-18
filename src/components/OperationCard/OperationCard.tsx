import React from 'react';
import { Link } from 'react-router-dom';
//import "./FineCard.scss"
//import CustomButton from "../CustomButton/CustomButton";

import {useDraftRequest} from "../../hooks/useRequest";
//import {Fine} from "../Interfaces";
import {useAuth} from "../../hooks/useAuth";
import { Button } from 'react-bootstrap';
import "./OperationCard.css"
import OperationButton from '../Buttons/OperationButton';

const OperationCard = ({operation}:{operation: Operation}) => {

  const {is_authenticated, is_moderator} = useAuth()

  const {addOperationToRequest, deleteOperationFromRequest} = useDraftRequest()

  const handleAdd = async () => {
    await addOperationToRequest(operation.pk)
  }

  const handleDelete = async () => {
    await deleteOperationFromRequest(operation.pk)
  }
  

  return (
    <>
  
    <div className="my-card">
  <div className="face face1">
  
    <div className="content">
      
      <img src={"data:image/png;base64,"+operation.image} />
      <h3>{operation.name}</h3>
    </div>
  </div>
  <div className="face face2">
    <div className="content">
      <div>
      <Link to={`/operation/${operation.pk}`}>
                <OperationButton text = "Подробнее" >ADD</OperationButton>
              </Link>
              {is_authenticated && !location.pathname.includes("draft") && <OperationButton onClick={handleAdd} text={"+"}  /> }
           
      </div>
    </div>
  </div>
</div>

</>
  )
}

export default OperationCard