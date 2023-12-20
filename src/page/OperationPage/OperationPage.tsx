import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./OperationPage.css"
import {useOperation} from "../../hooks/useOperation";

const OperationPage = () => {
     console.log("in operation page")
    const { id } = useParams(); // Получаем значение параметра :id из URL
    const Id = id ? parseInt(id, 10) : null; // Преобразование в число или null

    const {operation, fetchOperation} = useOperation()

    useEffect(() => {
        if (Id !== null) {
            fetchOperation(Id)
        }
    }, [Id]);

    if (!operation) {
        return <div>Loading...</div>;
    }

    return (
     <>
     <div className="card__body">
     <div className="half">
       <div className="featured_text">
         <h1>{operation.data.name}</h1>
         <p className="sub">Бинарная операция:</p>
       </div>
       <div className="image">
         <img src={"data:image/jpeg;base64,"+operation.image} alt=""/>
       </div>
     </div>
     <div className="half">
       <div className="description">
         <p>{operation.data.description}</p>
       </div>
       <span className="stock"><i className="fa fa-pen"></i></span>
       <div className="reviews">
         <ul className="stars">
           <li><i className="fa fa-star"></i></li> 
           <li><i className="fa fa-star-o"></i></li>
         </ul>
         <span></span>
       </div>
     </div>
   </div>
   <div className="card__footer">
     <div className="recommend">
       <p>Recommended by</p>
       <h3>Allochka Danielyan</h3>
     </div>
     <div className="action">
       <button type="button">Добавить в заявку</button>
     </div>
   </div>
  </>


    );
};

export default OperationPage;