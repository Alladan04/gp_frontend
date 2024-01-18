import React from 'react'
import { Button } from 'react-bootstrap'
import "./Buttons.css"
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
    <Button  className = "op_button" type ="submit" style = {{backgroundColor:"#fc1c7f"}}>{text}</Button>
  )
}

export default OperationButton