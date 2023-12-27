import React from 'react'
import { Button } from 'react-bootstrap'
import "./Buttons.css"

const OperationButton = ({text, onClick}) => {
  return (
    <Button variant="primary" className="op_button"  onClick={onClick}>{text}</Button>
  )
}

export default OperationButton