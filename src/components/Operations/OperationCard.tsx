import React from 'react';
import { Link } from 'react-router-dom';
import AddButton from './addButton.tsx';
import "./styles/OperationsPage.css";



const OperationCard: React.FC<{operationData: any}> = ({operationData}) => {
  console.log("operation card", operationData)
  return (<>
    <div className="my-card">
  <div className="face face1">
  
    <div className="content">
      
      <img src={"data:image/png;base64,"+operationData.image} />
      <h3>{operationData.data.name}</h3>
    </div>
  </div>
  <div className="face face2">
    <div className="content">
      <div>
      <Link to={`/operation/${operationData.data.pk}`}>
                <AddButton/>
              </Link>
      </div>
    </div>
  </div>
</div>
</>
  )
}

export default OperationCard