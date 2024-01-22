import React from 'react'
import { Button } from 'react-bootstrap'
import "./Buttons.css"
import { useNavigate } from 'react-router-dom';
type props = {
 text: string;
 onClick: () => void;
};

const OperationButton = ({text, onClick}) => {
  return (
    <Button variant="primary" className="op_button"  onClick={onClick}>{text}</Button>
  )
}


export const SubmitButton = ({text})=>{
  return (
    <Button variant = "primary"  type ="submit" className="op_button" style = {{backgroundColor:"#ff0057",borderRadius: "200px"}} >{text}</Button>
  )
}

export default OperationButton